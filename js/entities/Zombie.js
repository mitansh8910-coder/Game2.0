import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";
import { ZombieModel } from "../models/ZombieModel.js";

export class Zombie{

    constructor(scene,x=0,z=0,type="walker"){

        this.scene=scene;

        this.type=type;

        this.model=new ZombieModel(type);

        this.mesh=this.model.getModel();

        this.mesh.position.set(x,0,z);

        scene.add(this.mesh);

        this.alive=true;

        this.health=100;

        this.infected=false;

        this.attackCooldown=0;

        switch(type){

            case "runner":

                this.speed=7;

                this.damage=12;

                this.health=70;

                this.range=1.3;

                break;

            case "brute":

                this.speed=2.4;

                this.damage=35;

                this.health=250;

                this.range=2;

                break;

            default:

                this.speed=4;

                this.damage=18;

                this.range=1.5;

        }

        this.walkTime=0;

    }

    update(dt){

        if(!this.alive)return;

        this.walkAnimation(dt);

        if(this.attackCooldown>0)

            this.attackCooldown-=dt;

    }

    walkAnimation(dt){

        this.walkTime+=dt*8;

        this.mesh.position.y=Math.sin(

            this.walkTime

        )*0.06;

    }

    moveTowards(target,dt){

        if(!target)return;

        const dir=new THREE.Vector3()

            .subVectors(

                target.position,

                this.mesh.position

            )

            .setY(0);

        if(dir.lengthSq()>0){

            dir.normalize();

            this.mesh.position.add(

                dir.multiplyScalar(

                    this.speed*dt

                )

            );

            this.mesh.lookAt(

                target.position.x,

                this.mesh.position.y,

                target.position.z

            );

        }

    }

    attack(target){

        if(!target||!target.alive)return;

        if(this.attackCooldown>0)return;

        const d=this.mesh.position.distanceTo(

            target.position

        );

        if(d>this.range)return;

        target.takeDamage(this.damage);

        if(Math.random()<0.35){

            target.infect();

        }

        this.attackCooldown=1;

    }

    takeDamage(amount){

        if(!this.alive)return;

        this.health-=amount;

        if(this.health<=0){

            this.die();

        }

    }

    die(){

        this.alive=false;

        this.mesh.rotation.z=Math.PI/2;

    }

    knockback(direction,power){

        this.mesh.position.add(

            direction.clone()

            .multiplyScalar(power)

        );

    }

    get position(){

        return this.mesh.position;

    }

}
