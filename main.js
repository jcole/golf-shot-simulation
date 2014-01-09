(function () {

// three components
var renderer;
var scene;
var camera;

// stats
var stats;

// for window
var mouseX;
var mouseY;
var windowHalfY;
var windowHalfY;

// attributes
var initCameraY = 300;
var initCameraZ = -700;

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

    // add camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.x = 0;
    camera.position.y = initCameraY;
    camera.position.z = initCameraZ;

    // add scene
    scene = new THREE.Scene();

    // add handlers
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

    mouseX = 0;
    mouseY = 0;
    setWindowSize();

    initRender(); // project-specific
}

function update() {
    requestAnimationFrame(update);

    updateRender();

    updateCamera();
    stats.update();
}

function updateCamera() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY + 100 + initCameraY - camera.position.y) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentMouseWheel( event ) {
    console.log('zoom');
    // zoom here
}

function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function setWindowSize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;    
}

function onWindowResize() {
    setWindowSize();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// project-specific logic
var points = [];
var line;
var particles;
var shot;

function initRender() {
    // add ground grid
    var grid = DrawLib.getGrid(300, 600, 60, new THREE.Color( 0x32cd32 ));
    grid.position.z = 300;
    scene.add(grid);

    var initPoint = new THREE.Vector3(0, 0, -200);
    shot = new Shot(initPoint);
}

function updateRender() {
    if (shot.points.length > points.length) {
        points.push(shot.points[points.length]);

        var newline = DrawLib.getLine(points);
        scene.remove(line);
        line = newline;
        scene.add(line);

        var newParticles = DrawLib.getParticles(points);
        scene.remove(particles);
        particles = newParticles;
        scene.add(particles);
    }
}

// begin
init();
update();

})();