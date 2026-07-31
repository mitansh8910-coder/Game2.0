import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

import { World } from "./world/World.js";
import { Player } from "./Player.js";
import { InputManager } from "./InputManager.js";
import { WaveManager } from "./WaveManager.js";

import { Human } from "./entities/Human.js";
import { Zombie } from "./entities/Zombie.js";
import { Vehicle } from "./entities/Vehicle.js";

import { HumanAI } from "./ai/HumanAI.js";
import { ZombieAI } from "./ai/ZombieAI.js";
import { Pathfinding } from "./ai/Pathfinding.js";

export class Game{

    constructor(){

        /* ---------- CORE ---------- */

        this.scene=null;
        this.camera=null;
        this.renderer=null;
        this.clock=new THREE.Clock();

        /* ---------- GAME ---------- */

        this.world=null;
        this.player=null;
        this.input=null;
        this.waveManager=null;
        this.pathfinding=null;

        /* ---------- ARRAYS ---------- */

        this.humans=[];
        this.zombies=[];
        this.vehicles=[];
        this.bullets=[];

        this.humanAI=[];
        this.zombieAI=[];

        /* ---------- SETTINGS ---------- */

        this.running=true;

        this.paused=false;

        this.dayTime=12;

        this.score=0;

        this.kills=0;

        /* ---------- INIT ---------- */

        this.initRenderer();

        this.initScene();

        this.initCamera();

        this.initLights();

    }

    /*==================================================*/

    initRenderer(){

        this.renderer=new THREE.WebGLRenderer({

            antialias:true

        });

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.setPixelRatio(

            window.devicePixelRatio

        );

        this.renderer.shadowMap.enabled=true;

        this.renderer.shadowMap.type=

            THREE.PCFSoftShadowMap;

        document.body.appendChild(

            this.renderer.domElement

        );

    }

    /*==================================================*/

    initScene(){

        this.scene=new THREE.Scene();

        this.scene.background=

            new THREE.Color(

                0x87CEEB

            );

        this.scene.fog=

            new THREE.Fog(

                0x87CEEB,

                180,

                900

            );

    }

    /*==================================================*/

    initCamera(){

        this.camera=

            new THREE.PerspectiveCamera(

                75,

                window.innerWidth/

                window.innerHeight,

                0.1,

                2000

            );

        this.camera.position.set(

            0,

            8,

            15

        );

    }

    /*==================================================*/

    initLights(){

        this.ambient=

            new THREE.AmbientLight(

                0xffffff,

                0.65

            );

        this.scene.add(

            this.ambient

        );

        this.sun=

            new THREE.DirectionalLight(

                0xffffff,

                2.4

            );

        this.sun.position.set(

            180,

            250,

            120

        );

        this.sun.castShadow=true;

        this.sun.shadow.mapSize.width=4096;
        this.sun.shadow.mapSize.height=4096;

        this.sun.shadow.camera.left=-300;
        this.sun.shadow.camera.right=300;
        this.sun.shadow.camera.top=300;
        this.sun.shadow.camera.bottom=-300;

        this.scene.add(

            this.sun

        );

    }

}
    /*==================================================*/

    init(){

        this.initWorld();

        this.initPlayer();

        this.initManagers();

        this.initEvents();

    }

    /*==================================================*/

    initWorld(){

        this.world=new World(

            this.scene

        );

        this.pathfinding=new Pathfinding(

            this.world.collision

        );

    }

    /*==================================================*/

    initPlayer(){

        this.player=new Player(

            this.scene,

            this.camera

        );

        const spawn=

            this.world.spawnManager

            .getPlayerSpawn();

        this.player.position.set(

            spawn.x,

            0,

            spawn.z

        );

    }

    /*==================================================*/

    initManagers(){

        this.input=

            new InputManager(

                this.renderer.domElement

            );

        this.waveManager=

            new WaveManager(

                this

            );

    }

    /*==================================================*/

    initEvents(){

        window.addEventListener(

            "resize",

            ()=>this.onResize()

        );

        this.renderer.domElement

            .addEventListener(

                "click",

                ()=>{

                    this.renderer.domElement

                    .requestPointerLock();

                }

            );

    }

    /*==================================================*/

    onResize(){

        this.camera.aspect=

            window.innerWidth/

            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

    /*==================================================*/

    start(){

        this.init();

        this.spawnInitialEntities();

    }

    /*==================================================*/

    spawnInitialEntities(){

        /* Humans */

        for(let i=0;i<50;i++){

            this.spawnHuman();

        }

        /* Zombies */

        for(let i=0;i<18;i++){

            this.spawnZombie();

        }

        /* Vehicles */

        for(let i=0;i<20;i++){

            this.spawnVehicle();

        }

    }
    /*==================================================*/

    spawnHuman(){

        const pos=

            this.world.spawnManager

            .getRandomHumanSpawn();

        const human=new Human(

            this.scene,

            pos.x,

            pos.z

        );

        this.humans.push(

            human

        );

        this.humanAI.push(

            new HumanAI(human)

        );

        return human;

    }

    /*==================================================*/

    spawnZombie(type="walker"){

        const pos=

            this.world.spawnManager

            .getRandomZombieSpawn();

        const zombie=new Zombie(

            this.scene,

            pos.x,

            pos.z,

            type

        );

        this.zombies.push(

            zombie

        );

        this.zombieAI.push(

            new ZombieAI(zombie)

        );

        return zombie;

    }

    /*==================================================*/

    spawnVehicle(type="sedan"){

        const pos=

            this.world.spawnManager

            .getVehicleSpawn();

        const vehicle=new Vehicle(

            this.scene,

            pos.x,

            pos.z,

            type

        );

        vehicle.mesh.rotation.y=

            Math.random()*Math.PI*2;

        this.vehicles.push(

            vehicle

        );

        return vehicle;

    }

    /*==================================================*/

    removeDeadEntities(){

        this.humans=this.humans.filter(

            human=>human.alive

        );

        this.humanAI=this.humanAI.filter(

            ai=>ai.human.alive

        );

        this.zombies=this.zombies.filter(

            zombie=>zombie.alive

        );

        this.zombieAI=this.zombieAI.filter(

            ai=>ai.zombie.alive

        );

        this.bullets=this.bullets.filter(

            bullet=>bullet.alive

        );

    }

    /*==================================================*/

    spawnWave(count){

        for(let i=0;i<count;i++){

            let type="walker";

            const r=Math.random();

            if(r>0.92){

                type="brute";

            }else if(r>0.72){

                type="runner";

            }

            this.spawnZombie(type);

        }

    }

    /*==================================================*/

    addBullet(bullet){

        if(!bullet)return;

        if(Array.isArray(bullet)){

            this.bullets.push(

                ...bullet

            );

            return;

        }

        this.bullets.push(

            bullet

        );

    }

    /*==================================================*/

    findClosestZombie(position){

        let closest=null;

        let distance=Infinity;

        for(const zombie of this.zombies){

            if(!zombie.alive)continue;

            const d=

                position.distanceTo(

                    zombie.position

                );

            if(d<distance){

                distance=d;

                closest=zombie;

            }

        }

        return closest;

    }

    /*==================================================*/

    findClosestHuman(position){

        let closest=null;

        let distance=Infinity;

        for(const human of this.humans){

            if(!human.alive)continue;

            const d=

                position.distanceTo(

                    human.position

                );

            if(d<distance){

                distance=d;

                closest=human;

            }

        }

        return closest;

    }
    /*==================================================*/

    update(){

        if(!this.running)return;

        if(this.paused)return;

        const dt=this.clock.getDelta();

        /* ---------- PLAYER ---------- */

        if(this.player){

            this.player.update(

                dt,

                this.input

            );

        }

        /* ---------- WORLD ---------- */

        if(this.world){

            this.world.update(

                dt

            );

        }

        /* ---------- HUMANS ---------- */

        for(let i=0;i<this.humans.length;i++){

            const human=this.humans[i];

            human.update(dt);

            this.humanAI[i]?.update(

                dt,

                this.humans,

                this.zombies

            );

        }

        /* ---------- ZOMBIES ---------- */

        for(let i=0;i<this.zombies.length;i++){

            const zombie=this.zombies[i];

            zombie.update(dt);

            this.zombieAI[i]?.update(

                dt,

                this.humans,

                this.zombies

            );

        }

        /* ---------- VEHICLES ---------- */

        for(const vehicle of this.vehicles){

            vehicle.update(

                dt,

                this.input

            );

        }

        /* ---------- BULLETS ---------- */

        for(const bullet of this.bullets){

            bullet.update(

                dt,

                this.zombies

            );

        }

        /* ---------- REMOVE DEAD ---------- */

        this.removeDeadEntities();

        /* ---------- WAVES ---------- */

        if(this.waveManager){

            this.waveManager.update(

                dt

            );

        }

    }

    /*==================================================*/

    render(){

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    /*==================================================*/

    tick(){

        this.update();

        this.render();

    }

    /*==================================================*/

    gameOver(){

        this.running=false;

        document

            .getElementById(

                "gameOverScreen"

            )

            ?.classList

            .remove("hidden");

    }

    /*==================================================*/

    win(){

        this.running=false;

        alert(

            "You Survived!"

        );

    }

    /*==================================================*/

    increaseScore(value=1){

        this.score+=value;

    }

    /*==================================================*/

    addKill(){

        this.kills++;

        this.increaseScore(

            100

        );

    }

    /*==================================================*/

    isGameOver(){

        return !this.player ||

               !this.player.alive;

    }
    /*==================================================*/

    initHUD(){

        this.ui={

            health:document.getElementById("healthValue"),

            ammo:document.getElementById("ammoValue"),

            wave:document.getElementById("waveValue"),

            zombies:document.getElementById("zombieValue"),

            humans:document.getElementById("humanValue"),

            score:document.getElementById("scoreValue"),

            fps:document.getElementById("fpsValue")

        };

        this.fpsTimer=0;

        this.frames=0;

    }

    /*==================================================*/

    updateHUD(dt){

        if(!this.ui)return;

        if(this.player){

            this.ui.health&&(this.ui.health.textContent=

                Math.round(this.player.health));

            if(this.player.weapon){

                this.ui.ammo&&(this.ui.ammo.textContent=

                    this.player.weapon.ammo+

                    " / "+

                    this.player.weapon.magazineSize);

            }

        }

        this.ui.wave&&(this.ui.wave.textContent=

            this.waveManager.currentWave);

        this.ui.zombies&&(this.ui.zombies.textContent=

            this.zombies.length);

        this.ui.humans&&(this.ui.humans.textContent=

            this.humans.length);

        this.ui.score&&(this.ui.score.textContent=

            this.score);

        this.frames++;

        this.fpsTimer+=dt;

        if(this.fpsTimer>=1){

            this.ui.fps&&(this.ui.fps.textContent=

                this.frames);

            this.frames=0;

            this.fpsTimer=0;

        }

    }

    /*==================================================*/

    pause(){

        this.paused=true;

        document

            .getElementById("pauseMenu")

            ?.classList

            .remove("hidden");

    }

    /*==================================================*/

    resume(){

        this.paused=false;

        document

            .getElementById("pauseMenu")

            ?.classList

            .add("hidden");

    }

    /*==================================================*/

    togglePause(){

        if(this.paused)

            this.resume();

        else

            this.pause();

    }

    /*==================================================*/

    showGameOver(){

        document

            .getElementById(

                "gameOverScreen"

            )

            ?.classList

            .remove("hidden");

    }

    /*==================================================*/

    hideGameOver(){

        document

            .getElementById(

                "gameOverScreen"

            )

            ?.classList

            .add("hidden");

    }

    /*==================================================*/

    updateUI(dt){

        this.updateHUD(dt);

        if(this.isGameOver()){

            this.gameOver();

        }

    }
    /*==================================================*/

    restart(){

        this.dispose();

        while(this.scene.children.length){

            this.scene.remove(

                this.scene.children[0]

            );

        }

        this.humans=[];

        this.zombies=[];

        this.vehicles=[];

        this.bullets=[];

        this.humanAI=[];

        this.zombieAI=[];

        this.score=0;

        this.kills=0;

        this.running=true;

        this.paused=false;

        this.initScene();

        this.initCamera();

        this.initLights();

        this.init();

    }

    /*==================================================*/

    dispose(){

        for(const bullet of this.bullets){

            bullet.destroy();

        }

        this.bullets=[];

    }

    /*==================================================*/

    reset(){

        this.restart();

    }

    /*==================================================*/

    getLivingHumans(){

        return this.humans.filter(

            h=>h.alive

        );

    }

    /*==================================================*/

    getLivingZombies(){

        return this.zombies.filter(

            z=>z.alive

        );

    }

    /*==================================================*/

    getPlayer(){

        return this.player;

    }

    /*==================================================*/

    getScene(){

        return this.scene;

    }

    /*==================================================*/

    getCamera(){

        return this.camera;

    }

    /*==================================================*/

    getRenderer(){

        return this.renderer;

    }

    /*==================================================*/

    setDayTime(hour){

        this.dayTime=hour;

    }

    /*==================================================*/

    updateDayNight(dt){

        this.dayTime+=dt*0.02;

        if(this.dayTime>=24)

            this.dayTime=0;

        const t=this.dayTime/24;

        this.sun.position.x=

            Math.cos(t*Math.PI*2)*220;

        this.sun.position.y=

            Math.max(

                25,

                Math.sin(t*Math.PI*2)*260

            );

        const intensity=

            Math.max(

                0.15,

                Math.sin(t*Math.PI*2)

            );

        this.sun.intensity=

            intensity*2.5;

        this.ambient.intensity=

            0.2+intensity*0.6;

    }

    /*==================================================*/

    update(dt){

        if(!this.running)return;

        if(this.paused)return;

        if(this.player)

            this.player.update(dt,this.input);

        if(this.world)

            this.world.update(dt);

        for(let i=0;i<this.humans.length;i++){

            this.humans[i].update(dt);

            this.humanAI[i]?.update(

                dt,

                this.humans,

                this.zombies

            );

        }

        for(let i=0;i<this.zombies.length;i++){

            this.zombies[i].update(dt);

            this.zombieAI[i]?.update(

                dt,

                this.humans,

                this.zombies

            );

        }

        for(const vehicle of this.vehicles)

            vehicle.update(dt,this.input);

        for(const bullet of this.bullets)

            bullet.update(dt,this.zombies);

        this.removeDeadEntities();

        this.waveManager?.update(dt);

        this.updateDayNight(dt);

        this.updateUI(dt);
    }

    /*==================================================*/

    render(){

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

}
