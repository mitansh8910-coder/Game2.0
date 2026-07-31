import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Collision{

    constructor(buildings){

        this.buildings=buildings;

        this.boxes=[];

        this.build();

    }

    build(){

        this.boxes=[];

        if(!this.buildings)return;

        for(const mesh of this.buildings.buildings){

            mesh.updateMatrixWorld(true);

            this.boxes.push(

                new THREE.Box3().setFromObject(mesh)

            );

        }

    }

    checkSphere(position,radius=1){

        const sphere=new THREE.Sphere(

            new THREE.Vector3(

                position.x,

                position.y||1,

                position.z

            ),

            radius

        );

        for(const box of this.boxes){

            if(box.intersectsSphere(sphere))

                return true;

        }

        return false;

    }

    resolve(position,radius=1){

        if(!this.checkSphere(position,radius))

            return position;

        const tests=[

            {x:1,z:0},
            {x:-1,z:0},
            {x:0,z:1},
            {x:0,z:-1},

            {x:1,z:1},
            {x:-1,z:1},
            {x:1,z:-1},
            {x:-1,z:-1}

        ];

        for(const t of tests){

            const p={

                x:position.x+t.x,

                y:position.y,

                z:position.z+t.z

            };

            if(!this.checkSphere(p,radius))

                return p;

        }

        return position;

    }

    playerMove(player,next){

        if(

            !this.checkSphere(

                next,

                0.8

            )

        ){

            player.position.copy(next);

        }

    }

    entityMove(entity,next){

        if(

            !this.checkSphere(

                next,

                0.8

            )

        ){

            entity.mesh.position.copy(next);

        }

    }

    bulletHit(start,end){

        const ray=new THREE.Raycaster(

            start,

            end.clone().sub(start).normalize()

        );

        const hits=ray.intersectObjects(

            this.buildings.buildings,

            false

        );

        return hits.length>0;

    }

    vehicleMove(vehicle,next){

        if(

            !this.checkSphere(

                next,

                2

            )

        ){

            vehicle.mesh.position.copy(next);

        }

    }

}
