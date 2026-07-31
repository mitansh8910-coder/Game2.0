import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";
import { HumanModel } from "../models/HumanModel.js";
import { Weapon } from "./Weapon.js";

export class Human{

    constructor(scene,x=0,z=0){

        this.scene=scene;

        this.health=100;
        this.maxHealth=100;

        this.speed=4;

        this.alive=true;
        this.infected=false;

        this.direction=new THREE.Vector3();

        this.model=new HumanModel();

        this.mesh=this.model.getModel();

        this.mesh.position.set(

            x,

            0,

            z

        );

        this.scene.add(this.mesh);

        this.weapon=new Weapon(

            "pistol",

            this

        );

        this.walkTime=0;

    }

    update(dt){

        if(!this.alive)return;

        this.walkAnimation(dt);

    }

    walkAnimation(dt){

        this.walkTime+=dt*6;

        this.mesh.position.y=

            Math.sin(

                this.walkTime

            )*0.05;

    }

    move(direction,dt){

        if(!this.alive)return;

        this.direction.copy(direction);

        this.mesh.position.add(

            direction.clone()

            .multiplyScalar(

                this.speed*dt

            )

        );

    }

    lookAt(target){

        this.mesh.lookAt(

            target.x,

            this.mesh.position.y,

            target.z

        );

    }

    takeDamage(amount){

        if(!this.alive)return;

        this.health-=amount;

        if(this.health<=0){

            this.health=0;

            this.die();

        }

    }

    heal(amount){

        this.health=Math.min(

            this.maxHealth,

            this.health+amount

        );

    }

    infect(){

        this.infected=true;

    }

    die(){

        this.alive=false;

        this.mesh.rotation.z=

            Math.PI/2;

    }

    shoot(target){

        if(this.weapon){

            this.weapon.fire(target);

        }

    }

    get position(){

        return this.mesh.position;

    }

}
