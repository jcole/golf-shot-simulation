(function () {

    window.Shot = function(initPoint) {
        this.points = [initPoint];
 
        var spacing = 20;
        var numPoints = 50;

        for (var i = 0; i < numPoints; i++) {
            var deltaY = parseInt(Math.random() * spacing);
            if (this.points.length > numPoints / 2.0) {
                deltaY = -1 * deltaY;
             }

            var lastPoint = this.points[this.points.length - 1];
            var newPoint = new THREE.Vector3(
                lastPoint.x + parseInt((0.5 - Math.random()) * spacing),
                lastPoint.y + deltaY,
                lastPoint.z + parseInt(Math.random() * spacing)
            );
            this.points.push(newPoint);
        };

    }

})();