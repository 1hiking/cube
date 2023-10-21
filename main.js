"use strict";

import * as THREE from 'three';
import { World } from 'cannon-es';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
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
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cubes.push(new THREE.Mesh(geometry, material));
    }
    return cubes;
}

const cube = createCubes(3)
cube.forEach(cube => {
    scene.add(cube);
});


camera.position.z = 2;
camera.position.y = 1;
camera.rotation.x = -.5;

const originX = 0;
const originZ = 0;
let angle = 1;
const radius = 1;
function animate() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.forEach(cube => {
        let X = originX + Math.cos(angle * time) * radius;
        let Z = originZ + Math.sin(angle * time) * radius;

        cube.position.x = X;
        cube.position.z = Z;
        cube.position.y = Math.sin(time) * 0.2;
        cube.rotateX(.01);
        cube.rotateY(.01);
        cube.rotateY(.01)

    })
    stats.update();

}

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
animate();