var scene;

(function () {

// three components
var camera;
var renderer;

// stats
var stats;

// for window
var mouseX;
var mouseY;
var windowHalfY;
var windowHalfY;

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
    camera.position.y = 700;
    camera.position.z = -700;

    // add scene
    scene = new THREE.Scene();

    // add handlers
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

    mouseX = 0;
    mouseY = 0;
    setWindowSize();

    initLine(new THREE.Vector3(0, 0, -250));     // init the line

    // add grid
    var grid = new THREE.GridHelper( 300, 30 );
    grid.material.color = new THREE.Color( 0x32cd32 );
    scene.add( grid );
}

function update() {
    requestAnimationFrame(update);

    updateCamera();
    updateLine(); // update the line
    stats.update();
}

function updateCamera() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY + 200 - camera.position.y) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
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

// begin
init();
update();

})();