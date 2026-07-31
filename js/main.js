import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";


import { World } from "./world/World.js";

import { Player } from "./Player.js";

import { ZombieManager } from "./ZombieManager.js";

import { WaveManager } from "./WaveManager.js";

import { HUD } from "./HUD.js";



/*==================================================
    SCENE
==================================================*/


const scene = new THREE.Scene();


scene.background = new THREE.Color(
    0x87CEEB
);


scene.fog = new THREE.Fog(

    0x87CEEB,

    100,

    500

);



/*==================================================
    CAMERA
==================================================*/


const camera = new THREE.PerspectiveCamera(

    75,

    window.innerWidth /

    window.innerHeight,

    0.1,

    1000

);



/*==================================================
    RENDERER
==================================================*/


const renderer = new THREE.WebGLRenderer({

    antialias:true

});


renderer.setSize(

    window.innerWidth,

    window.innerHeight

);


renderer.shadowMap.enabled=true;



document.body.appendChild(

    renderer.domElement

);



/*==================================================
    WORLD
==================================================*/


const world = new World(

    scene

);


world.generate();



/*==================================================
    PLAYER
==================================================*/


const player = new Player(

    scene,

    camera

);



/*==================================================
    ZOMBIES
==================================================*/


const zombieManager = new ZombieManager(

    scene

);



/*==================================================
    WAVES
==================================================*/


const waveManager = new WaveManager(

    scene,

    zombieManager

);



zombieManager.connectWaveManager(

    waveManager

);



/*==================================================
    HUD
==================================================*/


const hud = new HUD();


hud.createHealthBar();


hud.createCrosshair();



/*==================================================
    CLOCK
==================================================*/


const clock = new THREE.Clock();

/*==================================================
    LIGHTS
==================================================*/


const ambientLight = new THREE.AmbientLight(

    0xffffff,

    0.6

);


scene.add(

    ambientLight

);



const sun = new THREE.DirectionalLight(

    0xffffff,

    1

);


sun.position.set(

    100,

    200,

    100

);


sun.castShadow=true;


scene.add(

    sun

);



/*==================================================
    INPUT
==================================================*/


const keys = {};



window.addEventListener(

    "keydown",

    e=>{


        keys[e.code]=true;


    }

);



window.addEventListener(

    "keyup",

    e=>{


        keys[e.code]=false;


    }

);



document.body.addEventListener(

    "click",

    ()=>{


        document.body.requestPointerLock();


    }

);



/*==================================================
    RESIZE
==================================================*/


window.addEventListener(

    "resize",

    ()=>{


        camera.aspect =

            window.innerWidth /

            window.innerHeight;



        camera.updateProjectionMatrix();



        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );


    }

);



/*==================================================
    START WAVE
==================================================*/


waveManager.start();



/*==================================================
    INPUT HANDLER
==================================================*/


function updateInput(){



    player.handleInput({



        forward:

        keys["KeyW"],



        backward:

        keys["KeyS"],



        left:

        keys["KeyA"],



        right:

        keys["KeyD"],



        sprint:

        keys["ShiftLeft"],



        jump:

        keys["Space"]



    });


}

/*==================================================
    ZOMBIE SPAWNING
==================================================*/


function updateSpawning(){



    if(

        waveManager.remainingToSpawn > 0

    ){



        const stats = {



            health:

            waveManager.zombieHealthMultiplier,



            damage:

            waveManager.zombieDamageMultiplier,



            speed:

            waveManager.zombieSpeedMultiplier



        };



        zombieManager.spawnAroundPlayer(

            player,

            1,

            stats

        );



        waveManager.remainingToSpawn--;


        waveManager.totalZombies++;



    }



}



/*==================================================
    UPDATE HUD
==================================================*/


function updateHUD(){



    const info =

        waveManager.getWaveInfo();



    hud.update({



        health:

        player.health,



        wave:

        info.wave,



        zombies:

        zombieManager.getAliveCount(),



        ammo:

        player.weapon

        ?

        player.weapon.ammo

        :

        0,



        countdown:

        info.countdown,



        coins:

        waveManager.rewardCoins



    });



    hud.updateHealthBar(



        player.health /

        player.maxHealth *

        100



    );



}



/*==================================================
    GAME UPDATE
==================================================*/


function updateGame(delta){



    updateInput();



    waveManager.update(

        delta

    );



    waveManager.updateSpawning(

        delta

    );



    updateSpawning();



    player.update(

        delta

    );



    zombieManager.update(

        delta,

        player

    );



    updateHUD();



}

/*==================================================
    COLLISION CHECK
==================================================*/


function checkCollisions(){



    const zombie =

        zombieManager.getNearestZombie(

            player.position

        );



    if(!zombie)

        return;



    const distance =

        player.position.distanceTo(

            zombie.position

        );



    if(distance < 3){



        player.takeDamage(

            5

        );



    }



}



/*==================================================
    GAME STATE
==================================================*/


let gameOver=false;



function checkGameOver(){



    if(

        player.health <= 0 &&

        !gameOver

    ){



        gameOver=true;



        hud.showGameOver();



        console.log(

            "GAME OVER"

        );


    }



}



/*==================================================
    MAIN LOOP
==================================================*/


function animate(){



    requestAnimationFrame(

        animate

    );



    const delta =

        clock.getDelta();



    if(!gameOver){



        updateGame(

            delta

        );



        checkCollisions();



        checkGameOver();



    }



    renderer.render(

        scene,

        camera

    );



}



/*==================================================
    START
==================================================*/


console.log(

    "Infection: Last Stand Started"

);



animate();
