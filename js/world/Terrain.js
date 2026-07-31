import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Terrain{

    constructor(scene,size){

        this.scene=scene;
        this.size=size;

        this.createGround();

        this.createSky();

    }

    createGround(){

        const geometry=new THREE.PlaneGeometry(

            this.size,

            this.size,

            100,

            100

        );

        const material=new THREE.MeshStandardMaterial({

            color:0x4d8f3f,

            roughness:1,

            metalness:0

        });

        this.ground=new THREE.Mesh(

            geometry,

            material

        );

        this.ground.rotation.x=-Math.PI/2;

        this.ground.receiveShadow=true;

        this.scene.add(this.ground);

    }

    createSky(){

        const sky=new THREE.Mesh(

            new THREE.SphereGeometry(

                1200,

                32,

                32

            ),

            new THREE.MeshBasicMaterial({

                color:0x87ceeb,

                side:THREE.BackSide

            })

        );

        this.scene.add(sky);

    }

}
