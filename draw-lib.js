(function () {

    window.DrawLib = function() {

    }

    DrawLib.getGrid = function(sizeX, sizeZ, step, color) {
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

        for ( var i = - sizeX; i <= sizeX; i += step ) {
            for ( var j = - sizeZ; j <= sizeZ; j += step ) {
                geometry.vertices.push(
                    new THREE.Vector3( - sizeX, 0, j ), new THREE.Vector3( sizeX, 0, j ),
                    new THREE.Vector3( i, 0, - sizeZ ), new THREE.Vector3( i, 0, sizeZ )
                );

                geometry.colors.push( color, color, color, color );
            }
        }

        var grid = new THREE.Line(geometry, material, THREE.LinePieces );
        return grid;
    }

    DrawLib.getLine = function(points) {
        var geometry = new THREE.Geometry();  
        var spline = new THREE.Spline(points);
        var n_sub = 6;
        var color = new THREE.Color(0xffffff);
        color.setHSL(0.5, 0.5, 0.5);

        for (var i = 0; i < points.length * n_sub; i++) {
          var index = i / (points.length * n_sub);
          var position = spline.getPoint(index);
          geometry.vertices[i] = new THREE.Vector3(position.x, position.y, position.z);
          geometry.colors[i] = color;
        }

        var material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          opacity: 0.5,
          linewidth: 1,
          vertexColors: THREE.VertexColors
        });

        var scale = 1.0;
        var line = new THREE.Line(geometry, material);
        line.scale.x = scale;
        line.scale.y = scale;
        line.scale.z = scale;
        line.position.x = 0;
        line.position.y = 0;
        line.position.z = 0; 

        return line;   
    }

    DrawLib.getParticles = function(points) {
        var geometry = new THREE.Geometry();
        geometry.vertices = points;
        var particleColor = new THREE.Color(0xffffff);
        particleColor.setHSL(0.8, 0.6, 0.6); 
        var particles = new THREE.ParticleSystem(geometry, new THREE.ParticleSystemMaterial( { color: particleColor, size: 6, opacity: 1.0 } )); 

        return particles;
    }

})();