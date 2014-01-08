(function () {

    // known position points
    var points = []; 
    
    // render line and dots based on position points    
    var line;
    var particles;

    window.initLine = function() {
        addPoint(new THREE.Vector3(0, 0, 0));
    }

    window.updateLine = function() {
        var maxPoints = 20;
        var spacing = 20;

        if (points.length == 0 || points.length > maxPoints) {
            return;
        }

        var lastPoint = points[points.length - 1];
        var newPoint = new THREE.Vector3(
          lastPoint.x + parseInt(Math.random() * spacing),
          lastPoint.y + parseInt(Math.random() * spacing),
          lastPoint.z + parseInt(Math.random() * spacing)
        );
        addPoint(newPoint);

        var newline = getLine(points);
        scene.remove(line);
        line = newline;
        scene.add(line);

        var newParticles = getParticles(points);
        scene.remove(particles);
        particles = newParticles;
        scene.add(particles);
    }

    function addPoint(point, color) {
        points.push(point);
    }

    function getLine(points) {
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

    function getParticles(points) {
        var geometry = new THREE.Geometry();
        geometry.vertices = points;
        var particleColor = new THREE.Color(0xffffff);
        particleColor.setHSL(0.8, 0.6, 0.6); 
        var particles = new THREE.ParticleSystem(geometry, new THREE.ParticleSystemMaterial( { color: particleColor, size: 6, opacity: 1.0 } ));        
        return particles;
    }

})();