import * as THREE from 'three'
import {RGBELoader} from "three/addons";

const canvas = document.querySelector('canvas.webgl');

// Add Scene
const scene = new THREE.Scene();

// Add Loading Manager
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const rgbeLoader = new RGBELoader();

// Textures
const woodTexture = textureLoader.load('./textures/wood.avif');
const paintTexture = textureLoader.load('./textures/paints.png');
const paperTexture = textureLoader.load('./textures/paper.jpeg');

woodTexture.colorSpace = THREE.SRGBColorSpace
paintTexture.colorSpace = THREE.SRGBColorSpace
paperTexture.colorSpace = THREE.SRGBColorSpace

// Lights
// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.AmbientLight(color, intensity);
// scene.add(light);

// Environment / Lights
rgbeLoader.load('./environment/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
})


// Geometries and Materials
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial();
material.map = woodTexture;
material.roughness = 0;
material.metalness = 1;
material.side = THREE.DoubleSide;

// Create boxMesh by creating object and material
const boxMesh = new THREE.Mesh(boxGeometry, material);
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
planeMesh.position.x -= 2;
const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4), material);
torusMesh.position.x -= 5;

// Add boxMesh to scene
scene.add(boxMesh);
scene.add(planeMesh);
scene.add(torusMesh);

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
camera.position.z = 6
camera.position.x -= 2
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
    boxMesh.rotation.x += 0.01;
    planeMesh.rotation.x += 0.01;
    torusMesh.rotation.x += 0.01;

    boxMesh.rotation.y += 0.02;
    planeMesh.rotation.y += 0.02;
    torusMesh.rotation.y += 0.02;

    // camera.position.set(cursor.x*3, cursor.y * 3);

    // camera.position.x = Math.sin(Math.PI * 2 * cursor.x) * 3;
    // camera.position.z = Math.cos(Math.PI * 2 * cursor.x) * 3;
    // camera.position.y = -Math.sin(Math.PI * 2 * cursor.y) * 3;
    // camera.lookAt(boxMesh.position);
    // This gets called in the next frame
    window.requestAnimationFrame(tick);

    // Render for changes to reflect correctly
    renderer.render(scene, camera);
}
tick();