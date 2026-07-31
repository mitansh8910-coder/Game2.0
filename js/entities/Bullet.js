import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

export class Bullet{

    constructor(owner,target,damage=20,speed=120,spread=0){

        this.owner=owner;

        this.damage=damage;

        this.speed=speed;

        this.alive=true;

        this.life=3;

        this.position=owner.position.clone();

        this.direction=new THREE.Vector3();

        if(target){

            this.direction.subVectors(

                target.position,

                owner.position

            );

        }else{

            owner.mesh.getWorldDirection(

                this.direction

            );

        }

        this.direction.normalize();

        this.direction.x+=(Math.random()-0.5)*spread;

        this.direction.y+=(Math.random()-0.5)*spread;

        this.direction.z+=(Math.random()-0.5)*spread;

        this.direction.normalize();

        this.mesh=new THREE.Mesh(

            new THREE.SphereGeometry(

                0.05,

                8,

                8

            ),

            new THREE.MeshBasicMaterial({

                color:0xffdd55

            })

        );

        this.mesh.position.copy(

            this.position

        );

        owner.scene.add(this.mesh);

    }

    update(dt,targets=[]){

        if(!this.alive)return;

        this.life-=dt;

        if(this.life<=0){

            this.destroy();

            return;

        }

        this.position.add(

            this.direction.clone()

            .multiplyScalar(

                this.speed*dt

            )

        );

        this.mesh.position.copy(

            this.position

        );

        for(const target of targets){

            if(!target.alive)continue;

            if(target===this.owner)continue;

            const d=this.position.distanceTo(

                target.position

            );

            if(d<0.8){

                target.takeDamage(

                    this.damage

                );

                this.destroy();

                return;

            }

        }

    }

    destroy(){

        if(!this.alive)return;

        this.alive=false;

        if(this.mesh.parent){

            this.mesh.parent.remove(

                this.mesh

            );

        }

    }

}
