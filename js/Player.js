import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

import { Weapon } from "./entities/Weapon.js";

export class Player{

    constructor(scene,camera){

        this.scene=scene;

        this.camera=camera;

        /* ---------- PLAYER ---------- */

        this.position=new THREE.Vector3(
            0,
            2,
            0
        );

        this.velocity=new THREE.Vector3();

        this.direction=new THREE.Vector3();

        /* ---------- STATS ---------- */

        this.health=100;

        this.maxHealth=100;

        this.alive=true;

        /* ---------- MOVEMENT ---------- */

        this.walkSpeed=6;

        this.sprintSpeed=10;

        this.jumpForce=8;

        this.gravity=22;

        this.currentSpeed=this.walkSpeed;

        this.onGround=true;

        /* ---------- LOOK ---------- */

        this.yaw=0;

        this.pitch=0;

        this.mouseSensitivity=0.0025;

        /* ---------- VEHICLE ---------- */

        this.inVehicle=false;

        this.vehicle=null;

        /* ---------- WEAPON ---------- */

        this.weapon=new Weapon(
            "pistol",
            this
        );

        /* ---------- CAMERA ---------- */

        this.camera.position.copy(
            this.position
        );

    }

    /*==================================================*/

    update(dt,input){

        if(!this.alive)return;

        this.updateLook(input);

        this.updateMovement(dt,input);

        this.updateGravity(dt);

        this.updateWeapon(dt,input);

        this.updateCamera();

    }

}
    /*==================================================*/

    updateLook(input){

        this.yaw-=input.mouse.dx*this.mouseSensitivity;

        this.pitch-=input.mouse.dy*this.mouseSensitivity;

        const limit=Math.PI/2-0.05;

        this.pitch=Math.max(

            -limit,

            Math.min(

                limit,

                this.pitch

            )

        );

        input.resetMouse();

    }

    /*==================================================*/

    updateMovement(dt,input){

        this.currentSpeed=

            input.sprint ?

            this.sprintSpeed :

            this.walkSpeed;

        this.direction.set(

            0,

            0,

            0

        );

        if(input.forward)

            this.direction.z-=1;

        if(input.backward)

            this.direction.z+=1;

        if(input.left)

            this.direction.x-=1;

        if(input.right)

            this.direction.x+=1;

        if(this.direction.lengthSq()>0){

            this.direction.normalize();

            const forward=new THREE.Vector3(

                Math.sin(this.yaw),

                0,

                Math.cos(this.yaw)

            );

            const right=new THREE.Vector3(

                forward.z,

                0,

                -forward.x

            );

            const move=new THREE.Vector3();

            move.addScaledVector(

                forward,

                -this.direction.z

            );

            move.addScaledVector(

                right,

                this.direction.x

            );

            move.normalize();

            this.position.add(

                move.multiplyScalar(

                    this.currentSpeed*dt

                )

            );

        }

        if(

            input.jump &&

            this.onGround

        ){

            this.velocity.y=

                this.jumpForce;

            this.onGround=false;

        }

    }

    /*==================================================*/

    updateGravity(dt){

        this.velocity.y-=

            this.gravity*dt;

        this.position.y+=

            this.velocity.y*dt;

        if(this.position.y<=2){

            this.position.y=2;

            this.velocity.y=0;

            this.onGround=true;

        }

    }

    /*==================================================*/

    updateCamera(){

        this.camera.position.copy(

            this.position

        );

        this.camera.rotation.order="YXZ";

        this.camera.rotation.y=

            this.yaw;

        this.camera.rotation.x=

            this.pitch;

    }
    /*==================================================*/

    updateWeapon(dt,input){

        this.weapon.update(dt);

        if(input.reload){

            this.weapon.reload();

        }

        if(input.mouse.left){

            const bullet=this.weapon.fire();

            if(bullet){

                return bullet;
            }

        }

        return null;

    }

    /*==================================================*/

    takeDamage(amount){

        if(!this.alive)return;

        this.health-=amount;

        if(this.health<=0){

            this.health=0;

            this.die();

        }

    }

    /*==================================================*/

    heal(amount){

        this.health=Math.min(

            this.maxHealth,

            this.health+amount

        );

    }

    /*==================================================*/

    die(){

        this.alive=false;

        console.log("Player Died");

    }

    /*==================================================*/

    interact(vehicles=[]){

        if(this.inVehicle){

            this.exitVehicle();

            return;

        }

        let nearest=null;

        let distance=3;

        for(const vehicle of vehicles){

            const d=this.position.distanceTo(

                vehicle.position

            );

            if(d<distance){

                distance=d;

                nearest=vehicle;

            }

        }

        if(nearest){

            this.enterVehicle(nearest);

        }

    }

    /*==================================================*/

    enterVehicle(vehicle){

        if(this.inVehicle)return;

        this.inVehicle=true;

        this.vehicle=vehicle;

        vehicle.enter(this);

    }

    /*==================================================*/

    exitVehicle(){

        if(!this.inVehicle)return;

        this.vehicle.exit();

        this.vehicle=null;

        this.inVehicle=false;

    }

    /*==================================================*/

    isAlive(){

        return this.alive;

    }

    /*==================================================*/

    respawn(position){

        this.health=this.maxHealth;

        this.alive=true;

        this.position.copy(position);

        this.velocity.set(

            0,

            0,

            0

        );

    }
    /*==================================================*/

    getForwardVector(){

        return new THREE.Vector3(

            Math.sin(this.yaw),

            0,

            Math.cos(this.yaw)

        ).normalize();

    }

    /*==================================================*/

    getRightVector(){

        const forward=this.getForwardVector();

        return new THREE.Vector3(

            forward.z,

            0,

            -forward.x

        ).normalize();

    }

    /*==================================================*/

    lookAt(target){

        const dx=

            target.x-this.position.x;

        const dz=

            target.z-this.position.z;

        this.yaw=Math.atan2(

            dx,

            dz

        );

    }

    /*==================================================*/

    setWeapon(type){

        this.weapon.changeWeapon(

            type

        );

    }

    /*==================================================*/

    addHealth(amount){

        this.heal(amount);

    }

    /*==================================================*/

    addAmmo(){

        this.weapon.ammo=

            this.weapon.magazineSize;

    }

    /*==================================================*/

    reset(){

        this.position.set(

            0,

            2,

            0

        );

        this.velocity.set(

            0,

            0,

            0

        );

        this.health=this.maxHealth;

        this.alive=true;

        this.inVehicle=false;

        this.vehicle=null;

        this.yaw=0;

        this.pitch=0;

    }

    /*==================================================*/

    dispose(){

        this.weapon=null;

    }

}
