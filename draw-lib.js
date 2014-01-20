(function () {

    window.DrawLib = function() {

    }

    DrawLib.getGrid = function(sizeX, sizeZ, step, color) {
        var adjSizeX = sizeX / 2.0;
        var adjSizeZ = sizeZ / 2.0;
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

        for ( var i = - adjSizeX; i <= adjSizeX; i += step ) {
            for ( var j = - adjSizeZ; j <= adjSizeZ; j += step ) {
                geometry.vertices.push(
                    new THREE.Vector3( - adjSizeX, 0, j ), new THREE.Vector3( adjSizeX, 0, j ),
                    new THREE.Vector3( i, 0, - adjSizeZ ), new THREE.Vector3( i, 0, adjSizeZ )
                );

                geometry.colors.push( color, color, color, color );
            }
        }

        var grid = new THREE.Line(geometry, material, THREE.LinePieces );
        return grid;
    }

    DrawLib.getSplinedLine = function(points, interpolationNum, color) {
        var geometry = new THREE.Geometry();  
        var spline = new THREE.Spline(points);

        for (var i = 0; i < points.length * interpolationNum; i++) {
          var index = i / (points.length * interpolationNum);
          var position = spline.getPoint(index);
          geometry.vertices[i] = new THREE.Vector3(position.x, position.y, position.z);
          geometry.colors[i] = color;
        }

        var material = new THREE.LineBasicMaterial({ color: color, opacity: 0.5, linewidth: 2 });
        var line = new THREE.Line(geometry, material);

        return line;   
    }

    DrawLib.getParticles = function(points, particleColor) {
        var geometry = new THREE.Geometry();
        geometry.vertices = points;
        var particles = new THREE.ParticleSystem(geometry, new THREE.ParticleSystemMaterial( { color: particleColor, size: 3, opacity: 1.0 } )); 

        return particles;
    }

})();