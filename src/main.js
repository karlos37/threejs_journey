import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');

// Add Scene
const scene = new THREE.Scene();

// Add Loading Manager
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const woodTexture = textureLoader.load('wood.avif');
const paintTexture = textureLoader.load('paints.png');
const paperTexture = textureLoader.load('paper.jpeg');

woodTexture.colorSpace = THREE.SRGBColorSpace
paintTexture.colorSpace = THREE.SRGBColorSpace
paperTexture.colorSpace = THREE.SRGBColorSpace

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    map: paperTexture
});

// Create mesh by creating object and material
const mesh = new THREE.Mesh(geometry, material);


// Add mesh to scene
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

const cursor = {x: 0, y: 0};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
})

// Add camera to scene
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3
scene.add(camera);

// Create renderer and render on a canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Setting size of renderer
renderer.setSize(sizes.width, sizes.height);

// Rendering scene and camera
renderer.render(scene, camera);

// Function that gets called once every frame
const tick = function () {
    // mesh.rotation.x += 0.01;
    // camera.position.set(cursor.x*3, cursor.y * 3);

    camera.position.x = Math.sin(Math.PI * 2 * cursor.x) * 3;
    camera.position.z = Math.cos(Math.PI * 2 * cursor.x) * 3;
    camera.position.y = -Math.sin(Math.PI * 2 * cursor.y) * 3;
    camera.lookAt(mesh.position);
    // This gets called in the next frame
    window.requestAnimationFrame(tick);

    // Render for changes to reflect correctly
    renderer.render(scene, camera);
}

tick();