(function () {

// three framework components
var renderer;
var scene;
var camera;
var controls;
var stats;
var gui;

// project-specific logic
var points;
var shot;
var line;
var particles;
var shotControl = {
    initSpeedMPH: 100,
    initVerticalAngleDegrees: 22,
    initHorizontalAngleDegrees: 9,
    initBackspinRPM: 6000,
    initSpinAngle: 45,
    shoot: beginShot
}

function renderWidth() {
    return window.innerWidth - 50;
}

function renderHeight() {
    return window.innerHeight - 50;
}

function init() {
    // add renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(renderWidth(), renderHeight());

    // add container
    var container = document.createElement('div');
    container.width = renderWidth();
    container.height = renderHeight();
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    // add stats
    stats = new Stats();
    container.appendChild( stats.domElement );

    // add scene
    scene = new THREE.Scene();

    // add camera: field of view, aspect ratio, start distance, max distance
    camera = new THREE.PerspectiveCamera(45, renderWidth() / renderHeight(), 0.1, 20000);
    camera.position.x = 0;
    camera.position.y = 16;
    camera.position.z = -185;
    camera.lookAt(scene.position);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // add ground grid
    var gridColor = new THREE.Color(0x69ba6d)
    var grid = DrawLib.getGrid(100, 300, 10, gridColor);
    // grid.position.z = 0;
    scene.add(grid);

    // add dat.gui
    gui = new dat.GUI();
    gui.add(shotControl, 'initSpeedMPH', 50, 150);
    gui.add(shotControl, 'initVerticalAngleDegrees', 0, 90);
    gui.add(shotControl, 'initHorizontalAngleDegrees', -45, 45);
    gui.add(shotControl, 'initBackspinRPM', 0, 6000);
    gui.add(shotControl, 'initSpinAngle', -45, 45);
    gui.add(shotControl, 'shoot');

    // window sizing
    onWindowResize(); // set initial size
    window.addEventListener('resize', onWindowResize, false);     // add handlers

    beginShot();
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    stats.update();
    renderer.render(scene, camera);

    if (shot) {
        updateShot();
    }
}

function onWindowResize() {
    camera.aspect = renderWidth() / renderHeight();
    camera.updateProjectionMatrix();
    renderer.setSize(renderWidth(), renderHeight());
}

function beginShot() {
    shot = new Shot(shotControl);
    points = [];
}

function updateShot() {
    var initPoint = new THREE.Vector3(0, 0, -150);
    var lineColor = new THREE.Color(0xe34f4f);
    var splineInterpolationNum = 2;
    var shotPointsSampleRate = 0.4 / shot.dt; // show ever 0.2s

    if (shot.points.length > points.length * shotPointsSampleRate) {
        var position = shot.points[points.length * shotPointsSampleRate].position;
        points.push(position);

        var newline = DrawLib.getSplinedLine(points, splineInterpolationNum, lineColor);
        scene.remove(line);
        line = newline;
        line.position = initPoint;
        scene.add(line);

        var newParticles = DrawLib.getBallParticles(points);
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