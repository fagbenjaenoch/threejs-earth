import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

console.log(`THREE REVISION: %c${THREE.REVISION}`, "color: #ffff00");

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
	color: 0xffff00,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.002;
	renderer.render(scene, camera);
}

animate();
