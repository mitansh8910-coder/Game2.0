import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";


export class Zombie {


    constructor(scene, position){


        this.scene = scene;


        // ==========================
        // ZOMBIE STATS
        // ==========================

        this.health = 100;

        this.maxHealth = 100;

        this.damage = 10;

        this.speed = 4;


        this.attackRange = 2.5;

        this.attackCooldown = 1;


        this.attackTimer = 0;


        this.alive = true;



        // ==========================
        // CREATE MODEL
        // ==========================

        this.createModel();



        this.object.position.copy(
            position
        );


        this.scene.add(
            this.object
        );


    }



    // ==========================
    // CREATE ZOMBIE BODY
    // ==========================

    createModel(){


        this.object =
            new THREE.Group();



        const bodyGeometry =
            new THREE.BoxGeometry(
                1,
                2,
                1
            );


        const bodyMaterial =
            new THREE.MeshStandardMaterial({
                color:0x3b7a3b
            });


        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );


        body.position.y = 1;



        this.object.add(
            body
        );



        // Head

        const headGeometry =
            new THREE.BoxGeometry(
                0.8,
                0.8,
                0.8
            );


        const headMaterial =
            new THREE.MeshStandardMaterial({
                color:0x6b9e6b
            });


        const head =
            new THREE.Mesh(
                headGeometry,
                headMaterial
            );


        head.position.y = 2.4;



        this.object.add(
            head
        );


    }
        // ==========================
    // UPDATE ZOMBIE
    // ==========================

    update(delta, player){


        if(!this.alive)
            return;



        if(!player)
            return;



        const direction =
            new THREE.Vector3();



        direction.subVectors(
            player.position,
            this.object.position
        );



        const distance =
            direction.length();



        // Face player

        if(distance > 0.1){

            direction.normalize();


            this.object.lookAt(
                player.position.x,
                this.object.position.y,
                player.position.z
            );

        }



        // Move toward player

        if(
            distance > this.attackRange
        ){

            this.object.position.add(
                direction.multiplyScalar(
                    this.speed * delta
                )
            );


        }
        else{


            this.attack(
                player,
                delta
            );


        }


    }




    // ==========================
    // ATTACK PLAYER
    // ==========================

    attack(player,delta){


        this.attackTimer -= delta;



        if(
            this.attackTimer <= 0
        ){


            this.attackTimer =
                this.attackCooldown;



            if(
                player.takeDamage
            ){

                player.takeDamage(
                    this.damage
                );

            }


        }


    }
        // ==========================
    // TAKE DAMAGE
    // ==========================

    takeDamage(amount){


        if(!this.alive)
            return;



        this.health -= amount;



        if(this.health <= 0){

            this.die();

        }


    }




    // ==========================
    // DEATH
    // ==========================

    die(){


        this.alive = false;



        // simple fall effect

        this.object.rotation.x =
            Math.PI / 2;



        setTimeout(()=>{


            if(
                this.object.parent
            ){

                this.scene.remove(
                    this.object
                );

            }


        },500);



    }




    // ==========================
    // GET POSITION
    // ==========================

    getPosition(){


        return this.object.position;


    }




    // ==========================
    // DISTANCE TO TARGET
    // ==========================

    distanceTo(target){


        return this.object.position.distanceTo(
            target.position
        );


    }
        // ==========================
    // SET POSITION
    // ==========================

    setPosition(position){

        this.object.position.copy(
            position
        );

    }




    // ==========================
    // REMOVE ZOMBIE
    // ==========================

    remove(){


        if(
            this.object.parent
        ){

            this.scene.remove(
                this.object
            );

        }


        this.alive = false;


    }




    // ==========================
    // RESET ZOMBIE
    // ==========================

    reset(position){


        this.health =
            this.maxHealth;


        this.alive = true;


        this.object.rotation.set(
            0,
            0,
            0
        );


        this.setPosition(
            position
        );


    }




    // ==========================
    // SIMPLE COLLISION CHECK
    // ==========================

    checkCollision(target){


        const distance =
            this.object.position.distanceTo(
                target.position
            );


        return (
            distance < 1.5
        );


    }



}
