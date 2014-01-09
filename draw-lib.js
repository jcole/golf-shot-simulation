(function () {

    window.DrawLib = function() {

    }

    DrawLib.getGrids = function() {
        var grid = new THREE.GridHelper( 300, 30 );
        grid.material.color = new THREE.Color( 0x32cd32 );

        var grid2 = new THREE.GridHelper( 300, 30 );
        grid2.material.color = new THREE.Color( 0x32cd32 );
        grid2.position.z = 600;

        return [grid, grid2];
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