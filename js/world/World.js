import { Terrain } from "./Terrain.js";
import { Roads } from "./Roads.js";
import { Buildings } from "./Buildings.js";
import { Decorations } from "./Decorations.js";
import { SpawnManager } from "./SpawnManager.js";
import { Collision } from "./Collision.js";

export class World{

    constructor(scene){

        this.scene=scene;

        this.size=600;

        this.terrain=null;
        this.roads=null;
        this.buildings=null;
        this.decorations=null;
        this.spawnManager=null;
        this.collision=null;

        this.generate();

    }

    generate(){

        this.terrain=new Terrain(
            this.scene,
            this.size
        );

        this.roads=new Roads(
            this.scene,
            this.size
        );

        this.buildings=new Buildings(
            this.scene,
            this.size
        );

        this.decorations=new Decorations(
            this.scene,
            this.size
        );

        this.spawnManager=new SpawnManager(
            this.size,
            this.roads
        );

        this.collision=new Collision(
            this.buildings
        );

    }

    update(dt){

        if(this.decorations)
            this.decorations.update(dt);

    }

}
