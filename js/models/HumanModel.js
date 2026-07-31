import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class HumanModel{

    constructor(){

        this.group=new THREE.Group();

        this.createBody();

    }

    createBody(){

        /* BODY */

        const body=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.2,
                2,
                0.7

            ),

            new THREE.MeshStandardMaterial({

                color:0x3366ff

            })

        );

        body.position.y=3;

        body.castShadow=true;

        this.group.add(body);

        /* HEAD */

        const head=new THREE.Mesh(

            new THREE.SphereGeometry(

                0.45,
                20,
                20

            ),

            new THREE.MeshStandardMaterial({

                color:0xffd4aa

            })

        );

        head.position.y=4.5;

        head.castShadow=true;

        this.group.add(head);

        /* EYES */

        const eyeMat=new THREE.MeshStandardMaterial({

            color:0x111111

        });

        [-0.15,0.15].forEach(x=>{

            const eye=new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.05,

                    10,

                    10

                ),

                eyeMat

            );

            eye.position.set(

                x,

                4.55,

                0.38

            );

            this.group.add(eye);

        });

        /* ARMS */

        const armMat=new THREE.MeshStandardMaterial({

            color:0xffd4aa

        });

        [-0.8,0.8].forEach(x=>{

            const arm=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.12,

                    0.12,

                    1.7,

                    10

                ),

                armMat

            );

            arm.position.set(

                x,

                3,

                0

            );

            arm.rotation.z=Math.PI/14*x;

            arm.castShadow=true;

            this.group.add(arm);

        });

        /* LEGS */

        const legMat=new THREE.MeshStandardMaterial({

            color:0x222222

        });

        [-0.25,0.25].forEach(x=>{

            const leg=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.15,

                    0.15,

                    2,

                    10

                ),

                legMat

            );

            leg.position.set(

                x,

                1,

                0

            );

            leg.castShadow=true;

            this.group.add(leg);

        });

    }

    getModel(){

        return this.group;

    }

}
