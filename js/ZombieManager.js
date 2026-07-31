import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";


import { Zombie } from "./entities/Zombie.js";



export class ZombieManager {


    constructor(scene){


        this.scene = scene;


        this.zombies = [];


        this.bosses = [];


        this.killCount = 0;



        this.spawnDistance = 80;


    }



    /*==================================================*/

    createZombie(position, stats={}){


        const zombie = new Zombie(

            this.scene,

            position,

            stats

        );


        this.zombies.push(

            zombie

        );



        return zombie;


    }



    /*==================================================*/

    createBoss(position, stats={}){


        const boss = new Zombie(

            this.scene,

            position,

            {


                health:

                (stats.health || 10),



                damage:

                (stats.damage || 5),



                speed:

                (stats.speed || 1)


            }


        );



        boss.isBoss = true;



        this.bosses.push(

            boss

        );



        this.zombies.push(

            boss

        );



        return boss;


    }



    /*==================================================*/

    update(delta, player){



        for(

            let i=this.zombies.length-1;

            i>=0;

            i--

        ){


            const zombie =

                this.zombies[i];



            zombie.update(

                delta,

                player

            );



            if(!zombie.alive){



                this.removeZombie(

                    i

                );



            }


        }



    }



    /*==================================================*/
    /*==================================================*/

    removeZombie(index){


        const zombie =

            this.zombies[index];



        if(!zombie)

            return;



        if(zombie.mesh){


            this.scene.remove(

                zombie.mesh

            );


        }



        this.zombies.splice(

            index,

            1

        );



        this.killCount++;



    }



    /*==================================================*/

    getAliveCount(){


        return this.zombies.length;


    }



    /*==================================================*/

    getKillCount(){


        return this.killCount;


    }



    /*==================================================*/

    getNearestZombie(position){



        let nearest = null;


        let shortest = Infinity;



        for(const zombie of this.zombies){



            if(!zombie.alive)

                continue;



            const distance =

                position.distanceTo(

                    zombie.position

                );



            if(distance < shortest){



                shortest = distance;


                nearest = zombie;


            }


        }



        return nearest;


    }



    /*==================================================*/

    clearAll(){



        for(const zombie of this.zombies){



            if(zombie.mesh){



                this.scene.remove(

                    zombie.mesh

                );


            }


        }



        this.zombies=[];


        this.bosses=[];



    }



    /*==================================================*/
    /*==================================================*/

    spawnAroundPlayer(player, amount, stats={}){


        const created=[];



        for(

            let i=0;

            i<amount;

            i++

        ){



            const angle =

                Math.random() *

                Math.PI *

                2;



            const distance =

                this.spawnDistance +

                Math.random()*40;



            const position = new THREE.Vector3(



                player.position.x +

                Math.cos(angle)*distance,



                2,



                player.position.z +

                Math.sin(angle)*distance



            );



            const zombie =

                this.createZombie(

                    position,

                    stats

                );



            created.push(

                zombie

            );


        }



        return created;


    }



    /*==================================================*/

    spawnBossAroundPlayer(player, stats={}){


        const angle =

            Math.random() *

            Math.PI *

            2;



        const distance =

            this.spawnDistance * 1.5;



        const position = new THREE.Vector3(


            player.position.x +

            Math.cos(angle)*distance,


            2,


            player.position.z +

            Math.sin(angle)*distance


        );



        return this.createBoss(

            position,

            stats

        );


    }



    /*==================================================*/

    getBossCount(){



        let count = 0;



        for(const zombie of this.zombies){



            if(zombie.isBoss)

                count++;


        }



        return count;


    }



    /*==================================================*/

    removeDead(){



        for(

            let i=this.zombies.length-1;

            i>=0;

            i--

        ){



            if(

                !this.zombies[i].alive

            ){



                this.removeZombie(

                    i

                );


            }


        }


    }



    /*==================================================*/

    getStatus(){



        return {



            alive:

            this.getAliveCount(),



            kills:

            this.killCount,



            bosses:

            this.getBossCount()



        };


    }



    /*==================================================*/
    /*==================================================*/

    connectWaveManager(waveManager){


        this.waveManager = waveManager;


    }



    /*==================================================*/

    onZombieDeath(){



        this.killCount++;



        if(this.waveManager){


            this.waveManager.zombieKilled();


        }



    }



    /*==================================================*/

    reset(){



        this.clearAll();



        this.killCount = 0;



    }



    /*==================================================*/

    dispose(){



        this.clearAll();



        this.scene = null;


        this.waveManager = null;



    }



}
