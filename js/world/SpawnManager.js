export class SpawnManager{

    constructor(size,roads){

        this.size=size;

        this.roads=roads;

        this.safeRadius=35;

    }

    random(min,max){

        return Math.random()*(max-min)+min;

    }

    randomPosition(){

        return{

            x:this.random(

                -this.size/2,

                this.size/2

            ),

            z:this.random(

                -this.size/2,

                this.size/2

            )

        };

    }

    getRandomHumanSpawn(){

        let p=this.randomPosition();

        while(

            Math.abs(p.x)<this.safeRadius&&

            Math.abs(p.z)<this.safeRadius

        ){

            p=this.randomPosition();

        }

        return p;

    }

    getRandomZombieSpawn(){

        let p=this.randomPosition();

        while(

            Math.sqrt(

                p.x*p.x+

                p.z*p.z

            )<120

        ){

            p=this.randomPosition();

        }

        return p;

    }

    getPlayerSpawn(){

        return{

            x:0,

            z:0

        };

    }

    getVehicleSpawn(){

        return this.roads.getRandomRoadPosition();

    }

    getLootSpawn(){

        return this.randomPosition();

    }

    getPoliceSpawn(){

        return this.roads.getRandomRoadPosition();

    }

    getHospitalSpawn(){

        return this.randomPosition();

    }

    getRandomRoadSpawn(){

        return this.roads.getRandomRoadPosition();

    }

    getWaveSpawn(){

        const side=Math.floor(

            Math.random()*4

        );

        const edge=this.size/2-10;

        switch(side){

            case 0:

                return{

                    x:-edge,

                    z:this.random(

                        -edge,

                        edge

                    )

                };

            case 1:

                return{

                    x:edge,

                    z:this.random(

                        -edge,

                        edge

                    )

                };

            case 2:

                return{

                    x:this.random(

                        -edge,

                        edge

                    ),

                    z:-edge

                };

            default:

                return{

                    x:this.random(

                        -edge,

                        edge

                    ),

                    z:edge

                };

        }

    }

}
