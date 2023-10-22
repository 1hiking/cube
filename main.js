"use strict";

import * as THREE from 'three';
import { World } from 'cannon-es';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const TextureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
scene.background = TextureLoader.load("/static/smurf_cat.jpg");
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom)


const clock = new THREE.Clock();

function createCubes(number) {
    const cubes = [];
    for (let i = 0; i < number; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: TextureLoader.load("/static/imagen.png") });
        cubes.push(new THREE.Mesh(geometry, material));
    }
    return cubes;
}


const cube = createCubes(2)
cube.forEach(cube => {
    scene.add(cube);
});


camera.position.z = 4;
camera.position.y = 0;
camera.rotation.x = 0;


const originX = 0;
let originZ = 0;
let angle = 1;
const radius = 1;
let r = .5;
function animate() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.forEach(cube => {
        // Must be multiplied by time
        // Credits to: https://gamedev.stackexchange.com/a/9610
        let X = Math.cos(angle * time) * radius;
        let Z = Math.sin(angle * time) * radius;


        cube.position.x = X + originX;
        cube.position.z = Z + originZ;
        cube.position.y = Math.sin(time) * 0.2;
        cube.rotateX(.01);
        cube.rotateY(.01);
        cube.rotateY(.01);
        console.log(cube.position.z)
    })
    stats.update();

}




window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

if (WebGL.isWebGLAvailable()) {
    animate();

} else {

    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);

}