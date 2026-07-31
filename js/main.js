import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";


import { World } from "./World.js";

import { Player } from "./Player.js";

import { ZombieManager } from "./ZombieManager.js";

import { WaveManager } from "./WaveManager.js";



/*==================================================
    SCENE SETUP
==================================================*/


const scene = new THREE.Scene();


scene.background = new THREE.Color(
    0x87CEEB
);



scene.fog = new THREE.Fog(

    0x87CEEB,

    100,

    600

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



renderer.shadowMap.enabled = true;



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



waveManager.start();



/*==================================================
    CLOCK
==================================================*/


const clock = new THREE.Clock();




/*==================================================
    INPUT
==================================================*/


const keys = {};



window.addEventListener(

    "keydown",

    (event)=>{


        keys[event.code]=true;


    }

);



window.addEventListener(

    "keyup",

    (event)=>{


        keys[event.code]=false;


    }

);



/*==================================================
    MOUSE CONTROL
==================================================*/


document.body.addEventListener(

    "click",

    ()=>{


        document.body.requestPointerLock();


    }

);



/*==================================================
    WINDOW RESIZE
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
    PLAYER INPUT UPDATE
==================================================*/


function updateInput(){



    const direction = {



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



    };



    player.handleInput(

        direction

    );


}



/*==================================================
    ZOMBIE SPAWN CONTROL
==================================================*/


function updateWaves(delta){



    waveManager.update(

        delta

    );



    waveManager.updateSpawning(

        delta

    );



}

/*==================================================
    WAVE SPAWN CONNECTION
==================================================*/


function handleZombieSpawning(){



    if(

        waveManager.remainingToSpawn <= 0

    )

        return;



    const amount = 1;



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

        amount,

        stats

    );



    waveManager.remainingToSpawn -= amount;


    waveManager.totalZombies += amount;



}



/*==================================================
    PLAYER + ZOMBIE UPDATE
==================================================*/


function updateEntities(delta){



    /*
        PLAYER UPDATE
    */


    player.update(

        delta

    );



    /*
        ZOMBIE UPDATE
    */


    zombieManager.update(

        delta,

        player

    );



}



/*==================================================
    COLLISION HOOKS
==================================================*/


function checkCollisions(){



    const nearbyZombie =

        zombieManager.getNearestZombie(

            player.position

        );



    if(!nearbyZombie)

        return;



    const distance =

        player.position.distanceTo(

            nearbyZombie.position

        );



    /*
        Future:
        - melee attacks
        - zombie attacks
        - bullet collision
        - vehicles
    */



    if(distance < 3){



        player.takeDamage(

            5

        );


    }



}



/*==================================================
    MAIN GAME LOOP
==================================================*/


function animate(){



    requestAnimationFrame(

        animate

    );



    const delta =

        clock.getDelta();



    /*
        INPUT
    */


    updateInput();



    /*
        WAVES
    */


    updateWaves(

        delta

    );



    /*
        SPAWNING
    */


    handleZombieSpawning();



    /*
        ENTITIES
    */


    updateEntities(

        delta

    );



    /*
        COLLISION
    */


    checkCollisions();



    /*
        RENDER
    */


    renderer.render(

        scene,

        camera

    );


}



animate();

/*==================================================
    LIGHTING SYSTEM
==================================================*/


function createLights(){



    const ambient = new THREE.AmbientLight(

        0xffffff,

        0.6

    );



    scene.add(

        ambient

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



    sun.castShadow = true;



    sun.shadow.mapSize.width = 2048;

    sun.shadow.mapSize.height = 2048;



    scene.add(

        sun

    );


}



/*==================================================
    GAME STATE
==================================================*/


const gameState = {


    playing:true,


    gameOver:false,


    score:0,


    kills:0



};




/*==================================================
    HUD CONNECTION
==================================================*/


function updateHUD(){



    /*
        Future UI system:

        - health bar
        - ammo
        - wave number
        - zombie counter
        - score

    */



    const info =

        waveManager.getWaveInfo();



    window.gameInfo = {


        health:

        player.health,



        wave:

        info.wave,



        zombies:

        zombieManager.getAliveCount(),



        kills:

        zombieManager.getKillCount()



    };



}



/*==================================================
    GAME OVER CHECK
==================================================*/


function checkGameState(){



    if(

        player.health <= 0

    ){



        gameState.playing=false;


        gameState.gameOver=true;



        console.log(

            "GAME OVER"

        );


    }



}



/*==================================================
    IMPROVED ENTITY LOOP
==================================================*/


function updateGame(delta){



    if(!gameState.playing)

        return;



    updateInput();



    updateWaves(

        delta

    );



    handleZombieSpawning();



    updateEntities(

        delta

    );



    checkCollisions();



    updateHUD();



    checkGameState();



}

/*==================================================
    DEBUG MODE
==================================================*/


const DEBUG = true;



function debugInfo(){



    if(!DEBUG)

        return;



    console.clear();



    console.log(

        "=== INFECTION: LAST STAND ==="

    );



    console.log(

        "Wave:",

        waveManager.currentWave

    );



    console.log(

        "Alive Zombies:",

        zombieManager.getAliveCount()

    );



    console.log(

        "Kills:",

        zombieManager.getKillCount()

    );



    console.log(

        "Player HP:",

        player.health

    );



}



/*==================================================
    RESTART GAME
==================================================*/


function restartGame(){



    console.log(

        "Restarting..."

    );



    player.reset();



    zombieManager.reset();



    waveManager.reset();



    waveManager.start();



    gameState.playing = true;


    gameState.gameOver = false;



}



/*==================================================
    LOADING HOOK
==================================================*/


function finishLoading(){



    console.log(

        "Game Loaded"

    );



    console.log(

        "Survive the infection."

    );


}



/*==================================================
    CLEANUP
==================================================*/


function disposeGame(){



    player.dispose();



    zombieManager.dispose();



    waveManager.dispose();



    renderer.dispose();



}



/*==================================================
    DEBUG TIMER
==================================================*/


setInterval(

    ()=>{


        debugInfo();


    },

    5000

);



/*==================================================
    START GAME
==================================================*/


finishLoading();
