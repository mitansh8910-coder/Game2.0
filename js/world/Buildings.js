import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Buildings{

    constructor(scene,size){

        this.scene=scene;
        this.size=size;

        this.buildings=[];

        this.blockSize=40;
        this.roadWidth=12;

        this.generate();

    }

    generate(){

        for(

            let x=-this.size/2+20;

            x<this.size/2-20;

            x+=this.blockSize

        ){

            for(

                let z=-this.size/2+20;

                z<this.size/2-20;

                z+=this.blockSize

            ){

                if(Math.random()<0.15){

                    this.createPark(x,z);

                    continue;

                }

                this.createBlock(x,z);

            }

        }

    }

    createBlock(cx,cz){

        const count=2+Math.floor(Math.random()*3);

        for(let i=0;i<count;i++){

            const x=cx-8+Math.random()*16;
            const z=cz-8+Math.random()*16;

            const type=Math.floor(Math.random()*6);

            switch(type){

                case 0:
                    this.createHouse(x,z);
                    break;

                case 1:
                    this.createShop(x,z);
                    break;

                case 2:
                    this.createApartment(x,z);
                    break;

                case 3:
                    this.createWarehouse(x,z);
                    break;

                case 4:
                    this.createOffice(x,z);
                    break;

                default:
                    this.createBuilding(x,z);

            }

        }

    }

    createBuilding(x,z){

        const w=8+Math.random()*6;
        const d=8+Math.random()*6;
        const h=15+Math.random()*40;

        this.makeBox(

            x,z,w,h,d,

            0x999999

        );

    }

    createApartment(x,z){

        this.makeBox(

            x,z,

            12,

            32+Math.random()*25,

            12,

            0xbcbcbc

        );

    }

    createOffice(x,z){

        this.makeBox(

            x,z,

            14,

            45+Math.random()*35,

            14,

            0x77aaff

        );

    }

    createWarehouse(x,z){

        this.makeBox(

            x,z,

            18,

            10,

            18,

            0x777777

        );

    }

    createHouse(x,z){

        this.makeBox(

            x,z,

            8,

            8,

            8,

            0xd2b48c

        );

    }

    createShop(x,z){

        this.makeBox(

            x,z,

            10,

            12,

            10,

            0xffcc66

        );

    }

    createPark(x,z){

        const park=new THREE.Mesh(

            new THREE.BoxGeometry(

                26,

                0.2,

                26

            ),

            new THREE.MeshStandardMaterial({

                color:0x3e8f3e

            })

        );

        park.receiveShadow=true;

        park.position.set(

            x,

            0.11,

            z

        );

        this.scene.add(park);

    }

    makeBox(x,z,w,h,d,color){

        const mesh=new THREE.Mesh(

            new THREE.BoxGeometry(

                w,

                h,

                d

            ),

            new THREE.MeshStandardMaterial({

                color:color

            })

        );

        mesh.castShadow=true;
        mesh.receiveShadow=true;

        mesh.position.set(

            x,

            h/2,

            z

        );

        this.scene.add(mesh);

        this.buildings.push(mesh);

    }

}
