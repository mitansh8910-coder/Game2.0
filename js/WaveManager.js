import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";


export class WaveManager {


    constructor(scene, zombieManager){


        this.scene = scene;

        this.zombieManager = zombieManager;


        /*==================================
            WAVE SETTINGS
        ==================================*/


        this.currentWave = 0;

        this.maxWave = 100;


        this.zombiesPerWave = 10;


        this.spawnDelay = 1.5;


        this.waveActive = false;


        this.timeBetweenWaves = 15;


        this.countdown = 0;



        /*==================================
            DIFFICULTY
        ==================================*/


        this.zombieHealthMultiplier = 1;

        this.zombieDamageMultiplier = 1;

        this.zombieSpeedMultiplier = 1;



        /*==================================
            REWARDS
        ==================================*/


        this.rewardCoins = 0;

        this.rewardAmmo = 0;



        /*==================================
            STATE
        ==================================*/


        this.spawnedZombies = 0;

        this.deadZombies = 0;


        this.timer = 0;


    }



    /*==================================
        START SYSTEM
    ==================================*/


    start(){


        this.startNextWave();


    }



    /*==================================
        UPDATE LOOP
    ==================================*/


    update(delta){


        if(!this.waveActive){


            this.countdown -= delta;


            if(this.countdown <= 0){


                this.startNextWave();


            }


        }


        else{


            this.checkWaveComplete();


        }


    }
      /*==================================================*/

    startNextWave(){


        if(this.currentWave >= this.maxWave){


            console.log(
                "All waves completed!"
            );


            return;


        }



        this.currentWave++;


        this.waveActive=true;


        this.spawnedZombies=0;

        this.deadZombies=0;



        /*==================================
            DIFFICULTY SCALING
        ==================================*/


        this.zombieHealthMultiplier =
            1 + (this.currentWave * 0.15);


        this.zombieDamageMultiplier =
            1 + (this.currentWave * 0.10);


        this.zombieSpeedMultiplier =
            1 + (this.currentWave * 0.05);



        /*==================================
            ZOMBIE COUNT
        ==================================*/


        const amount =

            this.zombiesPerWave +

            (this.currentWave * 5);



        this.remainingToSpawn = amount;



        console.log(

            "Wave " +

            this.currentWave +

            " started. Zombies: " +

            amount

        );



        this.spawnTimer=0;


    }



    /*==================================================*/

    updateSpawning(delta){


        if(!this.waveActive)

            return;



        if(this.remainingToSpawn <= 0)

            return;



        this.spawnTimer -= delta;



        if(this.spawnTimer <= 0){



            this.spawnZombie();



            this.remainingToSpawn--;


            this.spawnTimer =

                this.spawnDelay;



        }


    }



    /*==================================================*/

    spawnZombie(){



        if(!this.zombieManager)

            return;



        const angle =

            Math.random() *

            Math.PI *

            2;



        const distance =

            80 +

            Math.random()*40;



        const position = new THREE.Vector3(


            Math.cos(angle)*distance,


            2,


            Math.sin(angle)*distance


        );



        const zombie =

            this.zombieManager.createZombie(

                position,

                {

                    health:

                    this.zombieHealthMultiplier,


                    damage:

                    this.zombieDamageMultiplier,


                    speed:

                    this.zombieSpeedMultiplier

                }

            );



        return zombie;


    }



    /*==================================================*/
    /*==================================================*/

    zombieKilled(){


        this.deadZombies++;



        console.log(

            "Zombie defeated:",

            this.deadZombies,

            "/",

            this.totalZombies

        );


    }



    /*==================================================*/

    checkWaveComplete(){



        if(

            this.remainingToSpawn <= 0 &&

            this.deadZombies >= this.totalZombies

        ){


            this.completeWave();


        }


    }



    /*==================================================*/

    completeWave(){


        this.waveActive=false;



        console.log(

            "Wave " +

            this.currentWave +

            " completed!"

        );



        this.giveRewards();



        this.countdown =

            this.timeBetweenWaves;



    }



    /*==================================================*/

    giveRewards(){



        const coins =

            100 +

            (this.currentWave * 50);



        const ammo =

            30 +

            (this.currentWave * 10);



        this.rewardCoins += coins;


        this.rewardAmmo += ammo;



        console.log(

            "Rewards:",

            coins,

            "coins",

            ammo,

            "ammo"

        );



    }



    /*==================================================*/

    isBossWave(){


        return (

            this.currentWave % 5 === 0

        );


    }



    /*==================================================*/

    spawnBoss(){



        if(!this.isBossWave())

            return;



        console.log(

            "BOSS WAVE INCOMING!"

        );



        const angle =

            Math.random() *

            Math.PI *

            2;



        const distance = 100;



        const position = new THREE.Vector3(


            Math.cos(angle)*distance,


            2,


            Math.sin(angle)*distance


        );



        this.zombieManager.createBoss(

            position,

            {

                health:

                this.zombieHealthMultiplier * 10,


                damage:

                this.zombieDamageMultiplier * 5,


                speed:

                this.zombieSpeedMultiplier

            }

        );


    }



    /*==================================================*/
    /*==================================================*/

    setTotalZombies(amount){


        this.totalZombies = amount;


    }



    /*==================================================*/

    getWaveInfo(){



        return {


            wave:

            this.currentWave,


            active:

            this.waveActive,


            remaining:

            this.remainingToSpawn,


            killed:

            this.deadZombies,


            countdown:

            Math.max(

                0,

                Math.floor(this.countdown)

            ),


            boss:

            this.isBossWave()


        };


    }



    /*==================================================*/

    skipCountdown(){


        this.countdown = 0;


    }



    /*==================================================*/

    reset(){



        this.currentWave = 0;


        this.waveActive = false;


        this.remainingToSpawn = 0;


        this.totalZombies = 0;


        this.deadZombies = 0;


        this.countdown = 0;



        this.zombieHealthMultiplier = 1;


        this.zombieDamageMultiplier = 1;


        this.zombieSpeedMultiplier = 1;



        this.rewardCoins = 0;


        this.rewardAmmo = 0;



    }



    /*==================================================*/

    dispose(){



        this.scene = null;


        this.zombieManager = null;



    }



}
