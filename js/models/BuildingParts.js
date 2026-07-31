import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class BuildingParts{

    static createWall(width,height,depth,color=0xb5b5b5){

        const mesh=new THREE.Mesh(

            new THREE.BoxGeometry(

                width,
                height,
                depth

            ),

            new THREE.MeshStandardMaterial({

                color

            })

        );

        mesh.castShadow=true;
        mesh.receiveShadow=true;

        return mesh;

    }

    static createWindow(){

        const windowMesh=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.2,
                1.5,
                0.08

            ),

            new THREE.MeshStandardMaterial({

                color:0x88cfff,

                transparent:true,

                opacity:0.75,

                metalness:0.4,

                roughness:0.1

            })

        );

        return windowMesh;

    }

    static createDoor(){

        const door=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.2,
                2.2,
                0.15

            ),

            new THREE.MeshStandardMaterial({

                color:0x5b3a1f

            })

        );

        return door;

    }

    static createRoof(width,depth){

        const roof=new THREE.Mesh(

            new THREE.BoxGeometry(

                width,
                0.4,
                depth

            ),

            new THREE.MeshStandardMaterial({

                color:0x4f4f4f

            })

        );

        roof.castShadow=true;

        return roof;

    }

    static createBalcony(){

        const balcony=new THREE.Group();

        const floor=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.8,
                0.12,
                0.9

            ),

            new THREE.MeshStandardMaterial({

                color:0x777777

            })

        );

        balcony.add(floor);

        for(let i=-1;i<=1;i++){

            const rail=new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.06,
                    0.8,
                    0.06

                ),

                new THREE.MeshStandardMaterial({

                    color:0x222222

                })

            );

            rail.position.set(

                i*0.8,
                0.4,
                0.42

            );

            balcony.add(rail);

        }

        return balcony;

    }

    static createShopSign(text="SHOP"){

        const sign=new THREE.Mesh(

            new THREE.BoxGeometry(

                2.6,
                0.7,
                0.12

            ),

            new THREE.MeshStandardMaterial({

                color:0xffd700,

                emissive:0x664400,

                emissiveIntensity:0.6

            })

        );

        sign.userData.text=text;

        return sign;

    }

    static createACUnit(){

        const ac=new THREE.Mesh(

            new THREE.BoxGeometry(

                0.8,
                0.6,
                0.5

            ),

            new THREE.MeshStandardMaterial({

                color:0xcfcfcf

            })

        );

        return ac;

    }

    static createAntenna(){

        const antenna=new THREE.Group();

        const pole=new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.04,
                0.04,
                2.5,
                8

            ),

            new THREE.MeshStandardMaterial({

                color:0x888888

            })

        );

        pole.position.y=1.25;

        antenna.add(pole);

        const bar=new THREE.Mesh(

            new THREE.BoxGeometry(

                1,
                0.04,
                0.04

            ),

            new THREE.MeshStandardMaterial({

                color:0x999999

            })

        );

        bar.position.y=2.1;

        antenna.add(bar);

        return antenna;

    }

}
