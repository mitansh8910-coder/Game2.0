import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Decorations{

    constructor(scene,size){

        this.scene=scene;
        this.size=size;

        this.objects=[];

        this.treeMaterial=new THREE.MeshStandardMaterial({
            color:0x2f7d32
        });

        this.trunkMaterial=new THREE.MeshStandardMaterial({
            color:0x6d4c41
        });

        this.generate();

    }

    generate(){

        this.createTrees(450);

        this.createStreetLights();

        this.createBenches(60);

        this.createTrashBins(80);

    }

    createTrees(count){

        for(let i=0;i<count;i++){

            const tree=new THREE.Group();

            const trunk=new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.4,
                    0.6,
                    3,
                    8
                ),

                this.trunkMaterial

            );

            trunk.position.y=1.5;

            trunk.castShadow=true;

            tree.add(trunk);

            const leaves=new THREE.Mesh(

                new THREE.ConeGeometry(
                    2.5,
                    5,
                    10
                ),

                this.treeMaterial

            );

            leaves.position.y=5;

            leaves.castShadow=true;

            tree.add(leaves);

            tree.position.set(

                (Math.random()-0.5)*this.size,

                0,

                (Math.random()-0.5)*this.size

            );

            tree.rotation.y=Math.random()*Math.PI*2;

            const s=0.8+Math.random()*0.8;

            tree.scale.set(s,s,s);

            this.scene.add(tree);

            this.objects.push(tree);

        }

    }

    createStreetLights(){

        for(let x=-this.size/2;x<=this.size/2;x+=40){

            for(let z=-this.size/2;z<=this.size/2;z+=40){

                const pole=new THREE.Mesh(

                    new THREE.CylinderGeometry(
                        0.15,
                        0.2,
                        8,
                        8
                    ),

                    new THREE.MeshStandardMaterial({
                        color:0x555555
                    })

                );

                pole.position.set(

                    x+5,

                    4,

                    z+5

                );

                pole.castShadow=true;

                this.scene.add(pole);

                const light=new THREE.PointLight(

                    0xffeeaa,

                    0.8,

                    18

                );

                light.position.set(

                    x+5,

                    8,

                    z+5

                );

                this.scene.add(light);

            }

        }

    }

    createBenches(count){

        for(let i=0;i<count;i++){

            const bench=new THREE.Mesh(

                new THREE.BoxGeometry(
                    2,
                    0.5,
                    0.8
                ),

                new THREE.MeshStandardMaterial({

                    color:0x8b5a2b

                })

            );

            bench.position.set(

                (Math.random()-0.5)*this.size,

                0.25,

                (Math.random()-0.5)*this.size

            );

            bench.castShadow=true;

            this.scene.add(bench);

            this.objects.push(bench);

        }

    }

    createTrashBins(count){

        for(let i=0;i<count;i++){

            const bin=new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.35,

                    0.4,

                    0.9,

                    8

                ),

                new THREE.MeshStandardMaterial({

                    color:0x228833

                })

            );

            bin.position.set(

                (Math.random()-0.5)*this.size,

                0.45,

                (Math.random()-0.5)*this.size

            );

            bin.castShadow=true;

            this.scene.add(bin);

            this.objects.push(bin);

        }

    }

    update(dt){

        // Reserved for future:
        // wind animation
        // blinking street lights
        // weather effects

    }

}
