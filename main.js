(function () {

// three framework components
var renderer;
var scene;
var camera;
var controls;
var stats;

// project-specific logic
var points = [];
var line;
var particles;
var shot;

function init() {
    // add renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // add container
    var container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    // add stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    // add scene
    scene = new THREE.Scene();

    // add camera: field of view, aspect ratio, start distance, max distance
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.x = 0;
    camera.position.y = 300;
    camera.position.z = -700;
    camera.lookAt(scene.position);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // window sizing
    onWindowResize(); // set initial size
    window.addEventListener('resize', onWindowResize, false);     // add handlers

    // project-specific setup
    initShot();
}

function animate() {
    requestAnimationFrame(animate);

    updateShot(); // project-specific update
    controls.update();
    stats.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// project-specific logic

function initShot() {
    // add ground grid
    var grid = DrawLib.getGrid(300, 600, 60, new THREE.Color( 0x32cd32 ));
    grid.position.z = 300;
    scene.add(grid);

    shot = new Shot();
}

function updateShot() {
    var initPoint = new THREE.Vector3(0, 0, -200);
    var lineColor = new THREE.Color(0x99ffff);
    var particleColor = new THREE.Color(0xff0000); //(0xff007f);
    var interpolationNum = 2;

    if (shot.points.length > points.length) {
        var position = shot.points[points.length].position;
        points.push(position);

        var newline = DrawLib.getSplinedLine(points, interpolationNum, lineColor);
        scene.remove(line);
        line = newline;
        line.position = initPoint;
        scene.add(line);

        var newParticles = DrawLib.getParticles(points, particleColor);
        scene.remove(particles);
        particles = newParticles;
        particles.position = initPoint;
        scene.add(particles);
    }
}

// begin
init();
animate();

})();