import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class TreeModel{

    constructor(type="oak"){

        this.type=type;

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        switch(this.type){

            case "pine":

                this.createPine();
                break;

            case "dead":

                this.createDead();
                break;

            case "bush":

                this.createBush();
                break;

            default:

                this.createOak();

        }

    }

    createOak(){

        const trunk=new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.35,

                0.45,

                3,

                10

            ),

            new THREE.MeshStandardMaterial({

                color:0x6d4c41

            })

        );

        trunk.position.y=1.5;

        trunk.castShadow=true;

        this.group.add(trunk);

        for(let i=0;i<5;i++){

            const leaf=new THREE.Mesh(

                new THREE.SphereGeometry(

                    1.2,

                    16,

                    16

                ),

                new THREE.MeshStandardMaterial({

                    color:0x2e8b57

                })

            );

            leaf.position.set(

                (Math.random()-0.5)*1.2,

                3.5+Math.random(),

                (Math.random()-0.5)*1.2

            );

            leaf.castShadow=true;

            this.group.add(leaf);

        }

    }

    createPine(){

        const trunk=new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.25,

                0.35,

                4,

                10

            ),

            new THREE.MeshStandardMaterial({

                color:0x6d4c41

            })

        );

        trunk.position.y=2;

        trunk.castShadow=true;

        this.group.add(trunk);

        for(let i=0;i<3;i++){

            const cone=new THREE.Mesh(

                new THREE.ConeGeometry(

                    1.8-i*0.3,

                    2.2,

                    12

                ),

                new THREE.MeshStandardMaterial({

                    color:0x1f6d2a

                })

            );

            cone.position.y=3+i*1.2;

            cone.castShadow=true;

            this.group.add(cone);

        }

    }

    createDead(){

        const trunk=new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.3,

                0.45,

                4,

                8

            ),

            new THREE.MeshStandardMaterial({

                color:0x4b3621

            })

        );

        trunk.position.y=2;

        trunk.castShadow=true;

        this.group.add(trunk);

        for(let i=0;i<4;i++){

            const branch=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.06,

                    0.08,

                    1.5,

                    6

                ),

                new THREE.MeshStandardMaterial({

                    color:0x4b3621

                })

            );

            branch.position.y=2.8+i*0.2;

            branch.rotation.z=(Math.random()-0.5)*2;

            branch.rotation.x=(Math.random()-0.5);

            this.group.add(branch);

        }

    }

    createBush(){

        for(let i=0;i<4;i++){

            const part=new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.7,

                    14,

                    14

                ),

                new THREE.MeshStandardMaterial({

                    color:0x2f8f2f

                })

            );

            part.position.set(

                (Math.random()-0.5),

                0.6,

                (Math.random()-0.5)

            );

            part.castShadow=true;

            this.group.add(part);

        }

    }

    getModel(){

        return this.group;

    }

}
