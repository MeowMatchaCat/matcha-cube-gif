import * as THREE from 'three';
import CCapture from 'ccapture.js-npmfixed';
import { render } from 'vue';



var renderSpeed = 0.01;

const recorder = new CCapture({
  verbose: true,
  framerate: 30,
  quality: 90,
  format: 'gif',
  timeLimit: 4,
  frameLimit: 30,
  autoSaveTime: 0,
})

var rendering = false;

//create scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(512, 512);
document.body.appendChild(renderer.domElement);




//create camera
const camera = new THREE.PerspectiveCamera(75, 512 / 512, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 15;

camera.lookAt(0, 0, 0)


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  wireframe: false,
  map: new THREE.TextureLoader().load('./src/assets/logo.png'),


});

//have the image scale to fit
material.map.minFilter = THREE.LinearFilter;
material.map.magFilter = THREE.LinearFilter;

const mesh = new THREE.Mesh(geometry, material);


//create a softer light to add to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
ambientLight.position.set(100, 100, 100);

const globalLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(globalLight);


scene.add(camera, mesh);




main();

var timeRef = Date.now();
var timeFactor = (Date.now() - timeRef) / 1000 * 60 //spd * timefactor
function main() {
  timeFactor = (Date.now() - timeRef) / 1000 * 60 //spd * timefactor
  timeRef = Date.now()

  if (!rendering && !isNaN(timeFactor)) {
    mesh.rotation.y += renderSpeed;


  }
  renderer.render(scene, camera);
  requestAnimationFrame(main);
}




export async function startRecording() {
  rendering = true;
  recorder.start();

  for (let i = 0; i < 360; i += 5) {
    mesh.rotation.y = i * Math.PI / 180;
    renderer.render(scene, camera);
    await recorder.capture(renderer.domElement);
  }

  rendering = false;
  recorder.stop();
  recorder.save();
}

export function setCubeTexture(file) {
  //load texture
  const texture = new THREE.TextureLoader().load(file);
  //set texture to the cube
  material.map = texture;
  material.needsUpdate = true;


}