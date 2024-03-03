import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');

// Step 1 Add Scene
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

// Create mesh by creating object and material
const mesh = new THREE.Mesh(geometry, material);

// Add mesh to scene
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

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
    mesh.rotation.y += 0.01;
    // This gets called in the next frame
    window.requestAnimationFrame(tick);

    // Render for changes to reflect correctly
    renderer.render(scene, camera);
}

tick();