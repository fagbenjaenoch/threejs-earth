import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

console.log(`THREE REVISION: %c${THREE.REVISION}`, "color: #ffff00");

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 13);
const material = new THREE.MeshStandardMaterial({
	color: 0xffff00,
	flatShading: true,
});

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x666666);
scene.add(hemiLight);

function animate() {
	requestAnimationFrame(animate);

	earthMesh.rotation.x += 0.01;
	earthMesh.rotation.y += 0.02;
	renderer.render(scene, camera);
}

animate();

window.addEventListener(
	"resize",
	() => {
		w = window.innerWidth;
		h = window.innerHeight;

		renderer.setSize(w, h);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();

		renderer.render(scene, camera);
	},
	false,
);
