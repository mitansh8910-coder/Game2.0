import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class World {

    constructor(scene){

        this.scene = scene;

        // ==========================
        // WORLD SETTINGS
        // ==========================

        this.tileSize = 20;
        this.gridSize = 25;

        this.tiles = [];

        // ==========================
        // MATERIALS
        // ==========================

        this.grassMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d8b37
        });

        this.roadMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333
        });

        this.sidewalkMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888
        });

        this.buildingMaterial = new THREE.MeshStandardMaterial({
            color: 0x777777
        });

        this.windowMaterial = new THREE.MeshStandardMaterial({
            color: 0x99ddff,
            emissive: 0x224466
        });


        // ==========================
        // BUILD WORLD
        // ==========================

        this.createSky();
        this.createLights();
        this.createGround();
        this.generateGrid();

    }


    // ==========================
    // SKY
    // ==========================

    createSky(){

        this.scene.background = new THREE.Color(0x87CEEB);

        this.scene.fog = new THREE.Fog(
            0x87CEEB,
            200,
            900
        );

    }


    // ==========================
    // LIGHTS
    // ==========================

    createLights(){

        const sun = new THREE.DirectionalLight(
            0xffffff,
            1.2
        );

        sun.position.set(
            200,
            300,
            100
        );

        sun.castShadow = true;

        this.scene.add(sun);


        const ambient = new THREE.AmbientLight(
            0xffffff,
            0.4
        );

        this.scene.add(ambient);

    }


    // ==========================
    // GROUND
    // ==========================

    createGround(){

        const size =
            this.tileSize * this.gridSize;


        const geometry =
            new THREE.PlaneGeometry(
                size,
                size
            );


        const ground =
            new THREE.Mesh(
                geometry,
                this.grassMaterial
            );


        ground.rotation.x =
            -Math.PI / 2;


        ground.position.y = -0.05;


        ground.receiveShadow = true;


        this.scene.add(ground);

    }
        // ==========================
    // CITY GRID GENERATION
    // ==========================

    generateGrid(){

        const half =
            this.gridSize / 2;


        for(let x = -half; x < half; x++){

            for(let z = -half; z < half; z++){


                const worldX =
                    x * this.tileSize;

                const worldZ =
                    z * this.tileSize;



                // Every 5 tiles create roads

                if(
                    x % 5 === 0 ||
                    z % 5 === 0
                ){

                    this.createRoad(
                        worldX,
                        worldZ
                    );

                }
                else{

                    this.createBuildingBlock(
                        worldX,
                        worldZ
                    );

                }

            }

        }

    }



    // ==========================
    // ROAD CREATION
    // ==========================

    createRoad(x,z){

        const geometry =
            new THREE.BoxGeometry(
                this.tileSize,
                0.1,
                this.tileSize
            );


        const road =
            new THREE.Mesh(
                geometry,
                this.roadMaterial
            );


        road.position.set(
            x,
            0,
            z
        );


        road.receiveShadow = true;


        this.scene.add(road);


        this.tiles.push({
            type:"road",
            x:x,
            z:z
        });

    }



    // ==========================
    // BUILDING AREA
    // ==========================

    createBuildingBlock(x,z){


        const sidewalkGeometry =
            new THREE.BoxGeometry(
                this.tileSize,
                0.12,
                this.tileSize
            );


        const sidewalk =
            new THREE.Mesh(
                sidewalkGeometry,
                this.sidewalkMaterial
            );


        sidewalk.position.set(
            x,
            0.05,
            z
        );


        this.scene.add(sidewalk);



        // Random chance for buildings

        if(Math.random() > 0.25){

            this.createBuilding(
                x,
                z
            );

        }


        this.tiles.push({
            type:"building",
            x:x,
            z:z
        });


    }
        // ==========================
    // BUILDING CREATION
    // ==========================

    createBuilding(x,z){


        const height =
            10 + Math.random() * 35;


        const width =
            12 + Math.random() * 5;


        const depth =
            12 + Math.random() * 5;



        const geometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );


        const building =
            new THREE.Mesh(
                geometry,
                this.buildingMaterial
            );


        building.position.set(
            x,
            height / 2,
            z
        );


        building.castShadow = true;

        building.receiveShadow = true;


        this.scene.add(building);



        this.addWindows(
            x,
            z,
            height,
            width,
            depth
        );

    }



    // ==========================
    // WINDOWS
    // ==========================

    addWindows(
        x,
        z,
        height,
        width,
        depth
    ){

        const rows =
            Math.floor(height / 5);


        for(
            let y = 3;
            y < rows * 5;
            y += 5
        ){


            const windowGeometry =
                new THREE.BoxGeometry(
                    2,
                    1.5,
                    0.2
                );


            const window =
                new THREE.Mesh(
                    windowGeometry,
                    this.windowMaterial
                );


            window.position.set(
                x,
                y,
                z + depth / 2 + 0.1
            );


            this.scene.add(window);


        }


    }



    // ==========================
    // RANDOM SPAWN POSITION
    // ==========================

    getRandomRoadPosition(){


        const roads =
            this.tiles.filter(
                tile =>
                tile.type === "road"
            );


        if(roads.length === 0)
            return new THREE.Vector3(
                0,
                1,
                0
            );


        const spot =
            roads[
                Math.floor(
                    Math.random() *
                    roads.length
                )
            ];



        return new THREE.Vector3(
            spot.x,
            1,
            spot.z
        );

    }
        // ==========================
    // CHECK ROAD TILE
    // ==========================

    isRoad(x,z){

        for(const tile of this.tiles){

            if(
                tile.type === "road" &&
                tile.x === x &&
                tile.z === z
            ){

                return true;

            }

        }


        return false;

    }



    // ==========================
    // FIND SAFE SPAWN POINT
    // ==========================

    getSpawnPoint(){


        const position =
            this.getRandomRoadPosition();


        return new THREE.Vector3(
            position.x,
            1,
            position.z
        );

    }



    // ==========================
    // CLEAR WORLD
    // ==========================

    clear(){

        this.tiles = [];


        while(this.scene.children.length){

            this.scene.remove(
                this.scene.children[0]
            );

        }

    }



    // ==========================
    // UPDATE LOOP
    // ==========================

    update(delta){

        // Future world systems:
        // weather
        // day/night cycle
        // destruction
        // NPC events

    }


}
