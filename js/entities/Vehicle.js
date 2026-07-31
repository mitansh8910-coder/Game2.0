import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";
import { CarModel } from "../models/CarModel.js";

export class Vehicle{

    constructor(scene,x=0,z=0,type="sedan"){

        this.scene=scene;

        this.type=type;

        this.model=new CarModel(type);

        this.mesh=this.model.getModel();

        this.mesh.position.set(x,0,z);

        scene.add(this.mesh);

        this.driver=null;

        this.engineOn=false;

        this.health=300;

        this.maxHealth=300;

        this.speed=0;

        this.maxSpeed=18;

        this.acceleration=14;

        this.brakePower=20;

        this.turnSpeed=2.5;

        this.velocity=new THREE.Vector3();

    }

    update(dt,input){

        if(!this.driver)return;

        if(input.forward){

            this.speed+=this.acceleration*dt;

        }

        if(input.backward){

            this.speed-=this.brakePower*dt;

        }

        if(!input.forward&&!input.backward){

            this.speed*=0.96;

        }

        this.speed=Math.max(

            -5,

            Math.min(

                this.maxSpeed,

                this.speed

            )

        );

        if(input.left)

            this.mesh.rotation.y+=this.turnSpeed*dt;

        if(input.right)

            this.mesh.rotation.y-=this.turnSpeed*dt;

        this.velocity.set(

            Math.sin(this.mesh.rotation.y),

            0,

            Math.cos(this.mesh.rotation.y)

        );

        this.mesh.position.add(

            this.velocity.clone()

            .multiplyScalar(

                this.speed*dt

            )

        );

        if(this.driver){

            this.driver.position.copy(

                this.mesh.position

            );

        }

    }

    enter(player){

        if(this.driver)return false;

        this.driver=player;

        this.engineOn=true;

        player.inVehicle=true;

        player.vehicle=this;

        return true;

    }

    exit(){

        if(!this.driver)return;

        const player=this.driver;

        player.inVehicle=false;

        player.vehicle=null;

        player.position.set(

            this.mesh.position.x+2,

            0,

            this.mesh.position.z

        );

        this.driver=null;

        this.engineOn=false;

    }

    takeDamage(amount){

        this.health-=amount;

        if(this.health<=0){

            this.destroy();

        }

    }

    destroy(){

        this.health=0;

        this.engineOn=false;

        this.speed=0;

        this.mesh.rotation.z=0.3;

    }

    hitZombie(zombie){

        if(this.speed<5)return;

        zombie.takeDamage(

            this.speed*8

        );

    }

    repair(amount){

        this.health=Math.min(

            this.maxHealth,

            this.health+amount

        );

    }

    get position(){

        return this.mesh.position;

    }

}
