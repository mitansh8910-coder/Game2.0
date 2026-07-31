import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class ZombieModel{

    constructor(type="walker"){

        this.type=type;

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        let bodyColor=0x4b6f44;
        let clothColor=0x555555;
        let scale=1;
        let armLength=1.9;

        switch(this.type){

            case "runner":

                scale=0.9;
                bodyColor=0x5a8a55;
                clothColor=0x333333;
                armLength=2.1;
                break;

            case "brute":

                scale=1.45;
                bodyColor=0x3f5d38;
                clothColor=0x663333;
                armLength=2.4;
                break;

        }

        /* BODY */

        const body=new THREE.Mesh(

            new THREE.BoxGeometry(
                1.35,
                2.2,
                0.85
            ),

            new THREE.MeshStandardMaterial({

                color:clothColor

            })

        );

        body.position.y=3;

        body.castShadow=true;

        this.group.add(body);

        /* HEAD */

        const head=new THREE.Mesh(

            new THREE.SphereGeometry(
                0.48,
                20,
                20
            ),

            new THREE.MeshStandardMaterial({

                color:bodyColor

            })

        );

        head.position.set(
            0,
            4.45,
            0.12
        );

        head.rotation.x=0.25;

        head.castShadow=true;

        this.group.add(head);

        /* GLOWING EYES */

        const eyeMat=new THREE.MeshStandardMaterial({

            color:0xff0000,

            emissive:0xaa0000,

            emissiveIntensity:2

        });

        [-0.16,0.16].forEach(x=>{

            const eye=new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.06,
                    10,
                    10
                ),

                eyeMat

            );

            eye.position.set(
                x,
                4.5,
                0.42
            );

            this.group.add(eye);

        });

        /* MOUTH */

        const mouth=new THREE.Mesh(

            new THREE.BoxGeometry(
                0.3,
                0.05,
                0.05
            ),

            new THREE.MeshBasicMaterial({

                color:0x220000

            })

        );

        mouth.position.set(
            0,
            4.2,
            0.43
        );

        this.group.add(mouth);

        /* ARMS */

        const armMat=new THREE.MeshStandardMaterial({

            color:bodyColor

        });

        [-0.95,0.95].forEach(side=>{

            const arm=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.12,

                    0.14,

                    armLength,

                    10

                ),

                armMat

            );

            arm.position.set(

                side,

                2.9,

                0.18

            );

            arm.rotation.z=side>0?-0.45:0.45;
            arm.rotation.x=0.5;

            arm.castShadow=true;

            this.group.add(arm);

            /* CLAW */

            const claw=new THREE.Mesh(

                new THREE.ConeGeometry(

                    0.08,

                    0.35,

                    6

                ),

                new THREE.MeshStandardMaterial({

                    color:0xffffff

                })

            );

            claw.rotation.z=Math.PI;

            claw.position.set(

                side,

                1.8,

                0.55

            );

            this.group.add(claw);

        });

        /* LEGS */

        [-0.25,0.25].forEach(x=>{

            const leg=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.17,

                    0.18,

                    2,

                    10

                ),

                new THREE.MeshStandardMaterial({

                    color:0x222222

                })

            );

            leg.position.set(

                x,

                1,

                0

            );

            leg.castShadow=true;

            this.group.add(leg);

        });

        /* BLOOD STAINS */

        for(let i=0;i<6;i++){

            const blood=new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.07,

                    8,

                    8

                ),

                new THREE.MeshStandardMaterial({

                    color:0x660000

                })

            );

            blood.position.set(

                (Math.random()-0.5),

                2+Math.random()*2,

                0.35+Math.random()*0.1

            );

            this.group.add(blood);

        }

        /* HUNCHED POSTURE */

        this.group.rotation.x=0.08;

        this.group.scale.set(
            scale,
            scale,
            scale
        );

    }

    getModel(){

        return this.group;

    }

}
