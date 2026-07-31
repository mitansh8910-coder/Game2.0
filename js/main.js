import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 200, 900);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
);

camera.position.set(0, 8, 18);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

/* ---------- LIGHTS ---------- */

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.6
);

scene.add(ambient);

const sun = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

sun.position.set(150,250,100);

sun.castShadow = true;

sun.shadow.mapSize.width = 4096;
sun.shadow.mapSize.height = 4096;

sun.shadow.camera.left = -250;
sun.shadow.camera.right = 250;
sun.shadow.camera.top = 250;
sun.shadow.camera.bottom = -250;

scene.add(sun);

/* ---------- GRID ---------- */

const grid = new THREE.GridHelper(
    500,
    100,
    0x444444,
    0x222222
);

scene.add(grid);

/* ---------- LOADING ---------- */

const loading = document.getElementById("loadingScreen");
const progress = document.getElementById("loadingProgress");

let percent = 0;

const timer = setInterval(()=>{

    percent += 5;

    progress.style.width = percent + "%";

    if(percent >= 100){

        clearInterval(timer);

        loading.style.display = "none";

    }

},40);

/* ---------- RESIZE ---------- */

window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});

/* ---------- CLOCK ---------- */

const clock = new THREE.Clock();

/* ---------- LOOP ---------- */

function animate(){

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    renderer.render(
        scene,
        camera
    );

}

animate();

export {

    scene,

    camera,

    renderer,

    clock

};
