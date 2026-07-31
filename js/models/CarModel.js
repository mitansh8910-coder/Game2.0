import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class CarModel{

    constructor(type="sedan"){

        this.type=type;

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        let bodyColor=0x3366ff;

        switch(this.type){

            case "police":
                bodyColor=0xffffff;
                break;

            case "taxi":
                bodyColor=0xffcc00;
                break;

            case "suv":
                bodyColor=0x444444;
                break;

        }

        /* BODY */

        const body=new THREE.Mesh(

            new THREE.BoxGeometry(

                4.6,

                1,

                2.2

            ),

            new THREE.MeshStandardMaterial({

                color:bodyColor

            })

        );

        body.position.y=1.1;

        body.castShadow=true;

        this.group.add(body);

        /* CABIN */

        const cabin=new THREE.Mesh(

            new THREE.BoxGeometry(

                2.2,

                0.9,

                1.8

            ),

            new THREE.MeshStandardMaterial({

                color:0x99bbff,

                transparent:true,

                opacity:0.85

            })

        );

        cabin.position.set(

            0,

            1.9,

            0

        );

        cabin.castShadow=true;

        this.group.add(cabin);

        /* HOOD */

        const hood=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.2,

                0.3,

                2

            ),

            new THREE.MeshStandardMaterial({

                color:bodyColor

            })

        );

        hood.position.set(

            1.7,

            1.45,

            0

        );

        this.group.add(hood);

        /* TRUNK */

        const trunk=new THREE.Mesh(

            new THREE.BoxGeometry(

                1,

                0.35,

                2

            ),

            new THREE.MeshStandardMaterial({

                color:bodyColor

            })

        );

        trunk.position.set(

            -1.8,

            1.45,

            0

        );

        this.group.add(trunk);

        /* WHEELS */

        const wheelMat=new THREE.MeshStandardMaterial({

            color:0x111111

        });

        const wheelPos=[

            [-1.5,0.45,-1.15],

            [1.5,0.45,-1.15],

            [-1.5,0.45,1.15],

            [1.5,0.45,1.15]

        ];

        wheelPos.forEach(p=>{

            const wheel=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.45,

                    0.45,

                    0.35,

                    20

                ),

                wheelMat

            );

            wheel.rotation.z=Math.PI/2;

            wheel.position.set(

                p[0],

                p[1],

                p[2]

            );

            wheel.castShadow=true;

            this.group.add(wheel);

        });

        /* HEADLIGHTS */

        [-0.45,0.45].forEach(z=>{

            const light=new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.08,

                    0.18,

                    0.25

                ),

                new THREE.MeshStandardMaterial({

                    color:0xffffcc,

                    emissive:0xffff99,

                    emissiveIntensity:2

                })

            );

            light.position.set(

                2.33,

                1.2,

                z

            );

            this.group.add(light);

        });

        /* TAIL LIGHTS */

        [-0.45,0.45].forEach(z=>{

            const light=new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.08,

                    0.18,

                    0.25

                ),

                new THREE.MeshStandardMaterial({

                    color:0xff0000,

                    emissive:0xaa0000,

                    emissiveIntensity:2

                })

            );

            light.position.set(

                -2.33,

                1.2,

                z

            );

            this.group.add(light);

        });

        /* POLICE LIGHT BAR */

        if(this.type==="police"){

            const bar=new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.9,

                    0.18,

                    0.35

                ),

                new THREE.MeshStandardMaterial({

                    color:0x222222

                })

            );

            bar.position.y=2.45;

            this.group.add(bar);

            const red=new THREE.PointLight(

                0xff0000,

                2,

                8

            );

            red.position.set(

                -0.25,

                2.45,

                0

            );

            this.group.add(red);

            const blue=new THREE.PointLight(

                0x0066ff,

                2,

                8

            );

            blue.position.set(

                0.25,

                2.45,

                0

            );

            this.group.add(blue);

        }

    }

    getModel(){

        return this.group;

    }

}
