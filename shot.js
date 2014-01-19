(function () {

    window.Shot = function() {
        this.points = [];
        
        initPosition = new THREE.Vector3(0,0,0);
        initVelocity = new THREE.Vector3(4.0, 70.0, 50.0);
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
            var accel = this.getAcceleration(lastPoint);

            var newPoint = lastPoint.clone();
            newPoint.velocity.add(accel.clone().multiplyScalar(dt));
            newPoint.position.add(newPoint.velocity.clone().multiplyScalar(dt));

            this.points.push(newPoint);    

            if (newPoint.position.y <= 0) {
                break;
            }

            lastPoint = newPoint;
        }
    }

    Shot.prototype.getAcceleration = function(currentPoint) {
        var mass = 0.0459; // 1.62 ounces
        var gravityAccel = g = new THREE.Vector3(0,-9.8,0); // 9.8 m/s^2

        var Cd = 0.008; // coefficient of drag
        var dragAccel = currentPoint.velocity.clone().multiplyScalar(-1 * Cd / mass);

        var totalAccel = (new THREE.Vector3(0,0,0)).add(gravityAccel).add(dragAccel);

        return totalAccel;
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
