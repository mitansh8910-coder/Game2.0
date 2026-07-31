import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Pathfinding{

    constructor(collision){

        this.collision=collision;

    }

    move(entity,target,dt){

        const dir=new THREE.Vector3()

            .subVectors(

                target,

                entity.position

            );

        dir.y=0;

        if(dir.lengthSq()<0.01)return;

        dir.normalize();

        const next=entity.position.clone().add(

            dir.clone().multiplyScalar(

                entity.speed*dt

            )

        );

        if(

            !this.collision ||

            !this.collision.checkSphere(

                next,

                0.8

            )

        ){

            entity.position.copy(next);

            return;

        }

        const angles=[

            25,-25,

            50,-50,

            75,-75,

            90,-90

        ];

        for(const a of angles){

            const d=dir.clone();

            d.applyAxisAngle(

                new THREE.Vector3(0,1,0),

                THREE.MathUtils.degToRad(a)

            );

            const test=entity.position.clone().add(

                d.multiplyScalar(

                    entity.speed*dt

                )

            );

            if(

                !this.collision.checkSphere(

                    test,

                    0.8

                )

            ){

                entity.position.copy(test);

                return;

            }

        }

    }

    hasLineOfSight(start,end){

        if(!this.collision)return true;

        return !this.collision.bulletHit(

            start,

            end

        );

    }

    randomPoint(radius=20){

        const angle=Math.random()*Math.PI*2;

        const dist=Math.random()*radius;

        return new THREE.Vector3(

            Math.cos(angle)*dist,

            0,

            Math.sin(angle)*dist

        );

    }

}
