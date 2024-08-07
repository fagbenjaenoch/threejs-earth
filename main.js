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

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 13);
const material = new THREE.MeshStandardMaterial({
	map: loader.load("/textures/earthmap1k.jpg"),
});

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -(23.4 * Math.PI) / 180;
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
	map: loader.load("/textures/earthlights1k.jpg"),
	blending: THREE.AdditiveBlending,
});
const lightMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightMesh);

const cloudMat = new THREE.MeshBasicMaterial({
	map: loader.load("/textures/earthcloudmaptrans.jpg"),
	transparent: true,
	alphaTest: 0.9,
});
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
// earthGroup.add(cloudMesh);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

scene.add(earthGroup);

const formEl = document.querySelector(".controls");
const speedEl = document.querySelector("#speed-value");
const speedInputEl = document.querySelector("#speed");
const cameraResetEl = document.querySelector("#reset-camera");

speedEl.textContent = `${speedInputEl.value}x`;
speedInputEl.addEventListener("input", () => {
	speedEl.textContent = `${speedInputEl.value}x`;
});

formEl.addEventListener("reset", () => {
	speedInputEl.value = "1";
	speedEl.textContent = `${speedInputEl.value}x`;
});

cameraResetEl.addEventListener("onClick", () => {
	camera.position.set(0, 0, 5);
});

function animate() {
	requestAnimationFrame(animate);

	earthMesh.rotation.y += 0.002 * speedInputEl.value;
	lightMesh.rotation.y += 0.002 * speedInputEl.value;
	// cloudMesh.rotation.y += 0.002;
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
