import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class HumanAI{

    constructor(human){

        this.human=human;

        this.target=null;

        this.state="idle";

        this.detectRange=35;

        this.attackRange=20;

        this.fleeRange=8;

        this.wanderTimer=0;

        this.wanderDirection=new THREE.Vector3();

    }

    update(dt,humans,zombies){

        if(!this.human.alive)return;

        this.target=this.findNearestZombie(zombies);

        if(this.target){

            const d=this.human.position.distanceTo(

                this.target.position

            );

            if(d<this.fleeRange){

                this.state="flee";

                this.flee(dt);

            }

            else if(d<this.attackRange){

                this.state="attack";

                this.attack(dt);

            }

            else{

                this.state="chase";

                this.chase(dt);

            }

        }

        else{

            this.state="wander";

            this.wander(dt);

        }

    }

    findNearestZombie(zombies){

        let nearest=null;

        let best=this.detectRange;

        for(const zombie of zombies){

            if(!zombie.alive)continue;

            const d=this.human.position.distanceTo(

                zombie.position

            );

            if(d<best){

                best=d;

                nearest=zombie;

            }

        }

        return nearest;

    }

    chase(dt){

        const dir=new THREE.Vector3()

            .subVectors(

                this.target.position,

                this.human.position

            )

            .normalize();

        this.human.move(dir,dt);

        this.human.lookAt(

            this.target.position

        );

    }

    flee(dt){

        const dir=new THREE.Vector3()

            .subVectors(

                this.human.position,

                this.target.position

            )

            .normalize();

        this.human.move(dir,dt);

        this.human.lookAt(

            this.target.position

        );

    }

    attack(dt){

        this.human.lookAt(

            this.target.position

        );

        this.human.shoot(

            this.target

        );

    }

    wander(dt){

        this.wanderTimer-=dt;

        if(this.wanderTimer<=0){

            this.wanderTimer=

                2+Math.random()*4;

            this.wanderDirection.set(

                Math.random()-0.5,

                0,

                Math.random()-0.5

            ).normalize();

        }

        this.human.move(

            this.wanderDirection,

            dt*0.5

        );

    }

}
