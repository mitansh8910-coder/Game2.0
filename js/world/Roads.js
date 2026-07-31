import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Roads{

    constructor(scene,size){

        this.scene=scene;
        this.size=size;

        this.roads=[];
        this.intersections=[];

        this.roadWidth=12;
        this.blockSize=40;

        this.material=new THREE.MeshStandardMaterial({

            color:0x2e2e2e,
            roughness:1

        });

        this.lineMaterial=new THREE.MeshStandardMaterial({

            color:0xffd700

        });

        this.generate();

    }

    generate(){

        this.createHorizontalRoads();

        this.createVerticalRoads();

        this.createRoadLines();

    }

    createHorizontalRoads(){

        for(

            let z=-this.size/2;

            z<=this.size/2;

            z+=this.blockSize

        ){

            const mesh=new THREE.Mesh(

                new THREE.BoxGeometry(

                    this.size,

                    0.1,

                    this.roadWidth

                ),

                this.material

            );

            mesh.receiveShadow=true;

            mesh.position.set(

                0,

                0.02,

                z

            );

            this.scene.add(mesh);

            this.roads.push(mesh);

        }

    }

    createVerticalRoads(){

        for(

            let x=-this.size/2;

            x<=this.size/2;

            x+=this.blockSize

        ){

            const mesh=new THREE.Mesh(

                new THREE.BoxGeometry(

                    this.roadWidth,

                    0.1,

                    this.size

                ),

                this.material

            );

            mesh.receiveShadow=true;

            mesh.position.set(

                x,

                0.03,

                0

            );

            this.scene.add(mesh);

            this.roads.push(mesh);

        }

    }

    createRoadLines(){

        for(

            let z=-this.size/2;

            z<=this.size/2;

            z+=this.blockSize

        ){

            for(

                let x=-this.size/2;

                x<=this.size/2;

                x+=10

            ){

                const line=new THREE.Mesh(

                    new THREE.BoxGeometry(

                        5,

                        0.05,

                        0.35

                    ),

                    this.lineMaterial

                );

                line.position.set(

                    x,

                    0.08,

                    z

                );

                this.scene.add(line);

            }

        }

        for(

            let x=-this.size/2;

            x<=this.size/2;

            x+=this.blockSize

        ){

            for(

                let z=-this.size/2;

                z<=this.size/2;

                z+=10

            ){

                const line=new THREE.Mesh(

                    new THREE.BoxGeometry(

                        0.35,

                        0.05,

                        5

                    ),

                    this.lineMaterial

                );

                line.position.set(

                    x,

                    0.08,

                    z

                );

                this.scene.add(line);

            }

        }

    }

    getRandomRoadPosition(){

        if(Math.random()<0.5){

            return{

                x:Math.round(

                    (Math.random()*this.size-this.size/2)

                    /10

                )*10,

                z:Math.round(

                    (Math.random()*this.size-this.size/2)

                    /this.blockSize

                )*this.blockSize

            };

        }

        return{

            x:Math.round(

                (Math.random()*this.size-this.size/2)

                /this.blockSize

            )*this.blockSize,

            z:Math.round(

                (Math.random()*this.size-this.size/2)

                /10

            )*10

        };

    }

}
