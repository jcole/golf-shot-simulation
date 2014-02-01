(function () {

    window.Shot = function(options) {
        this.points = [];
        var initPoint = new ShotPoint();
        initPoint.position = new THREE.Vector3(0,0,0);

        options = options || {};

        // golf ball properties
        this.mass = 0.0459; // kg; from 1.62 ounces
        this.crossSectionalArea = 0.04267 * Math.PI / 4; //m^2
        this.smashFactor = (options.smashFactor == null) ? 1.49 : options.smashFactor; // clubhead-to-ball-initial speed ratio

        // nature
        this.gravityMagnitude = -9.8; // 9.8 m/s^2
        this.airDensity = 1.2041; // kg/m^3

        // golf ball aerodynamics properties        
        this.dragCoefficient = (options.dragCoefficient == null) ? 0.4 : options.dragCoefficient;
        this.liftCoefficient = (options.liftCoefficient == null) ? 0.00001 : options.liftCoefficient; // made this up?
        this.spinDecayRateConstant = 23; // made this up?

        // initial shot attributes
        this.initSpeedMPH = options.initSpeedMPH || 0.0;
        this.initVerticalAngleDegrees = options.initVerticalAngleDegrees || 0.0;
        this.initHorizontalAngleDegrees = options.initHorizontalAngleDegrees || 0.0;
        this.initBackspinRPM = options.initBackspinRPM || 0.0;
        this.initSpinAngle = options.initSpinAngle || 0.0;

        // simulation properties
        this.dt = options.dt || 0.001; //seconds

        // initial velocity        
        initPoint.velocity = this.getInitialVelocity(this.initSpeedMPH, this.smashFactor, this.initVerticalAngleDegrees, this.initHorizontalAngleDegrees);

        // initial angular velocity (spin rate)
        initPoint.angularVelocity = this.getInitialSpin(this.initBackspinRPM, this.initSpinAngle);

        this.projectShot(initPoint);
    }

    Shot.prototype.getInitialSpin = function(spinRPM, spinAngle) {
        var spin = new THREE.Vector3(0, 0, 0);
        spin.x = -1; // full backspin
        spin.y = Math.sin(spinAngle * Math.PI / 180);

        spin.normalize().multiplyScalar(spinRPM * 2 * Math.PI /60);

        return spin;
    }

    Shot.prototype.getInitialVelocity = function(speedMPH, smashFactor, verticalDegrees, horizontalDegrees) {    
        var velocity = new THREE.Vector3(0, 0, 0);
        velocity.x = Math.sin(-1 * horizontalDegrees * Math.PI / 180);
        velocity.y = Math.sin(verticalDegrees * Math.PI / 180);
        velocity.z = Math.cos(verticalDegrees * Math.PI / 180);

        var ballSpeed = toMPS(speedMPH * smashFactor);        

        return velocity.normalize().multiplyScalar(ballSpeed);
    }

    Shot.prototype.projectShot = function(initPoint) {    
        // initial point
        var lastPoint = initPoint.clone();
        this.points.push(lastPoint); 

        while(true) {
            var newPoint = lastPoint.clone();

            // calculate velcoity change            
            var accel = this.getAcceleration(lastPoint);
            newPoint.velocity.add(accel.clone().multiplyScalar(this.dt));
            newPoint.position.add(newPoint.velocity.clone().multiplyScalar(this.dt));

            // calculate spin rate decay
            var decayRate = this.angularDecayVector(newPoint);
            newPoint.angularVelocity.add(decayRate);

            this.points.push(newPoint); 

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
        var adjustedDragCoefficient = this.dragCoefficient * Math.min(1.0, 14 / currentPoint.velocity.length());
        var dragForceAcceleration = currentPoint.velocity.clone().multiplyScalar(-1 * adjustedDragCoefficient * this.airDensity * this.crossSectionalArea / this.mass);

        // magnus acceleration (from ball spin) = magnus force / mass
        var magnusForceAcceleration = currentPoint.angularVelocity.clone().cross(currentPoint.velocity).multiplyScalar(this.liftCoefficient / this.mass);

        // combined acceleration = gravity + drag + magnus
        var totalAccel = (new THREE.Vector3(0,0,0)).add(gravityAcceleration).add(dragForceAcceleration).add(magnusForceAcceleration);

        return totalAccel;
    }

    Shot.prototype.angularDecayVector = function(currentPoint) {
        var decay = currentPoint.angularVelocity.clone();
        decay.normalize().negate().multiplyScalar(this.spinDecayRateConstant * this.dt);
        return decay;
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
