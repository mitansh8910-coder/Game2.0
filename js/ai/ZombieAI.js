import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class ZombieAI{

    constructor(zombie){

        this.zombie=zombie;

        this.target=null;

        this.state="wander";

        this.detectRange=45;

        this.wanderTimer=0;

        this.wanderDirection=new THREE.Vector3();

    }

    update(dt,humans,zombies){

        if(!this.zombie.alive)return;

        this.target=this.findNearestHuman(humans);

        if(this.target){

            this.state="chase";

            this.chase(dt);

            this.zombie.attack(this.target);

        }

        else{

            this.state="wander";

            this.wander(dt);

        }

    }

    findNearestHuman(humans){

        let nearest=null;

        let best=this.detectRange;

        for(const human of humans){

            if(!human.alive)continue;

            const d=this.zombie.position.distanceTo(

                human.position

            );

            if(d<best){

                best=d;

                nearest=human;

            }

        }

        return nearest;

    }

    chase(dt){

        this.zombie.moveTowards(

            this.target,

            dt

        );

    }

    wander(dt){

        this.wanderTimer-=dt;

        if(this.wanderTimer<=0){

            this.wanderTimer=

                1.5+Math.random()*3;

            this.wanderDirection.set(

                Math.random()-0.5,

                0,

                Math.random()-0.5

            ).normalize();

        }

        this.zombie.mesh.position.add(

            this.wanderDirection.clone()

            .multiplyScalar(

                this.zombie.speed*0.35*dt

            )

        );

        if(this.wanderDirection.lengthSq()>0){

            const look=this.zombie.mesh.position.clone().add(

                this.wanderDirection

            );

            this.zombie.mesh.lookAt(

                look.x,

                this.zombie.mesh.position.y,

                look.z

            );

        }

    }

}
