(function () {

    window.Shot = function(options) {
        this.points = [];
        var initPoint = new ShotPoint();
        initPoint.position = new THREE.Vector3(0,0,0);

        // parameters
        this.mass = 0.0459; // 1.62 ounces -- pretty standard
        this.gravityMagnitude = -9.8; // 9.8 m/s^2
        this.dragCoefficient = 0; //options.dragCoefficient;
        this.liftCoefficient = 1.1 * 0.0001;
        this.initSpeedMPH = 90 ; // mph
        this.initVerticalAngleDegrees = 40;
        this.initHorizontalAngleDegrees = 4;

        // initial velocity        
        initPoint.velocity = this.getInitialVelocity(this.initSpeedMPH, this.initVerticalAngleDegrees, this.initHorizontalAngleDegrees);

        // initial angular velocity (spin rate)
        var spinY = 0;
        var spinX = 0;
        var spinZ = 0;
        initPoint.angularVelocity = new THREE.Vector3(spinX * 2 * Math.PI / 60, spinY * 2 * Math.PI / 60, spinZ * Math.PI / 60);

        // for simulation
        this.dt = 0.001; // seconds

        this.projectShot(initPoint);
    }

    Shot.prototype.getInitialVelocity = function(speedMPH, verticalDegrees, horizontalDegrees) {    
        var velocity = new THREE.Vector3(0, 0, 0);
        velocity.x = Math.sin(horizontalDegrees * Math.PI / 180);
        velocity.y = Math.sin(verticalDegrees * Math.PI / 180);
        velocity.z = Math.cos(verticalDegrees * Math.PI / 180);

        velocity.normalize().multiplyScalar(speedMPH * 0.44704); // MPH to mps
    }

    Shot.prototype.projectShot = function(initPoint) {    
        // initial point
        var lastPoint = initPoint.clone();
        this.points.push(lastPoint); 

        var pointIndex = 0;
        var interpolationSize = 0.25 / this.dt; // record every half-second

        while(true) {
            var newPoint = lastPoint.clone();
            // record every 10th point
            if ((pointIndex+=1) % interpolationSize == 0) {
                this.points.push(newPoint);    
            }

            // calculate velcoity change            
            var accel = this.getAcceleration(lastPoint);
            newPoint.velocity.add(accel.clone().multiplyScalar(this.dt));
            newPoint.position.add(newPoint.velocity.clone().multiplyScalar(this.dt));

            // calculate spin rate decay
            var decayRate = this.angularDecay(newPoint);
            newPoint.angularVelocity.multiplyScalar(decayRate);

            if (newPoint.position.y <= 0) {
                break;
            }

            lastPoint = newPoint;
        }
    }

    Shot.prototype.getAcceleration = function(currentPoint) {
        // gravity: -9.8 m/s^2
        var gravityAcceleration = new THREE.Vector3(0, this.gravityMagnitude, 0);

        // drag acceleration = drag force / mass
        var dragForceAcceleration = currentPoint.velocity.clone().multiplyScalar(-1 * this.dragCoefficient / this.mass);

        // magnus acceleration (from ball spin) = magnus force / mass
        var magnusForceAcceleration = currentPoint.angularVelocity.clone().cross(currentPoint.velocity).multiplyScalar(this.liftCoefficient / this.mass);

        // combined acceleration = gravity + drag + magnus
        var totalAccel = (new THREE.Vector3(0,0,0)).add(gravityAcceleration).add(dragForceAcceleration).add(magnusForceAcceleration);

        return totalAccel;
    }

    Shot.prototype.angularDecay = function(currentPoint) {
        return 0.94;
    }

    window.ShotPoint = function() {
        this.position = new THREE.Vector3(0,0,0);
        this.velocity = new THREE.Vector3(0,0,0);
        this.angularVelocity = new THREE.Vector3(0,0,0);
        this.acceleration = new THREE.Vector3(0,0,0);        
    }

    ShotPoint.prototype.clone = function() {
        var point = new ShotPoint();
        point.position = this.position.clone();
        point.velocity = this.velocity.clone();
        point.acceleration = this.acceleration.clone();
        point.angularVelocity = this.angularVelocity.clone();
        return point;
    }

})();
