(function () {

    var gravity = g = new THREE.Vector3(0,-9.8,0);

    window.Shot = function() {
        this.points = [];
        
        initPosition = new THREE.Vector3(0,0,0);
        initVelocity = new THREE.Vector3(4.0, 70.0, 60.0);
        this.projectShot(initPosition, initVelocity);
    }

    Shot.prototype.projectShot = function(initPosition, initVelocity) {    
        // initial point
        var lastPoint = new ShotPoint();
        lastPoint.position = initPosition;
        lastPoint.velocity = initVelocity;
        this.points.push(lastPoint); 

        var dt = 0.3;

        while(true) {
            var newPoint = lastPoint.clone();

            var accel = gravity;

            newPoint.velocity.add(accel.clone().multiplyScalar(dt));
            newPoint.position.add(newPoint.velocity.clone().multiplyScalar(dt));

            this.points.push(newPoint);    

            if (newPoint.position.y <= 0) {
                break;
            }

            lastPoint = newPoint;
        }
    }

    window.ShotPoint = function() {
        this.position = new THREE.Vector3(0,0,0);
        this.velocity = new THREE.Vector3(0,0,0);
        this.acceleration = new THREE.Vector3(0,0,0);        
    }

    ShotPoint.prototype.clone = function() {
        var point = new ShotPoint();
        point.position = this.position.clone();
        point.velocity = this.velocity.clone();
        point.acceleration = this.acceleration.clone();
        return point;
    }

})();

