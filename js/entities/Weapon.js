import { Bullet } from "./Bullet.js";

export class Weapon{

    constructor(type="pistol",owner){

        this.owner=owner;

        this.changeWeapon(type);

        this.lastShot=0;

    }

    changeWeapon(type){

        this.type=type;

        switch(type){

            case "rifle":

                this.damage=20;
                this.fireRate=0.10;
                this.magazineSize=30;
                this.reloadTime=2.2;
                this.bulletSpeed=120;
                this.spread=0.02;
                break;

            case "shotgun":

                this.damage=15;
                this.fireRate=0.9;
                this.magazineSize=8;
                this.reloadTime=3;
                this.bulletSpeed=90;
                this.spread=0.18;
                this.pellets=8;
                break;

            case "sniper":

                this.damage=120;
                this.fireRate=1.5;
                this.magazineSize=5;
                this.reloadTime=3.5;
                this.bulletSpeed=220;
                this.spread=0;
                break;

            default:

                this.damage=30;
                this.fireRate=0.35;
                this.magazineSize=15;
                this.reloadTime=1.6;
                this.bulletSpeed=100;
                this.spread=0.03;
                this.type="pistol";

        }

        this.ammo=this.magazineSize;

        this.reloading=false;

        this.reloadTimer=0;

    }

    update(dt){

        if(this.lastShot>0)

            this.lastShot-=dt;

        if(this.reloading){

            this.reloadTimer-=dt;

            if(this.reloadTimer<=0){

                this.reloading=false;

                this.ammo=this.magazineSize;

            }

        }

    }

    fire(target){

        if(this.reloading)return null;

        if(this.lastShot>0)return null;

        if(this.ammo<=0){

            this.reload();

            return null;

        }

        this.ammo--;

        this.lastShot=this.fireRate;

        if(this.type==="shotgun"){

            const bullets=[];

            for(let i=0;i<this.pellets;i++){

                bullets.push(

                    new Bullet(

                        this.owner,

                        target,

                        this.damage,

                        this.bulletSpeed,

                        this.spread

                    )

                );

            }

            return bullets;

        }

        return new Bullet(

            this.owner,

            target,

            this.damage,

            this.bulletSpeed,

            this.spread

        );

    }

    reload(){

        if(this.reloading)return;

        if(this.ammo===this.magazineSize)return;

        this.reloading=true;

        this.reloadTimer=this.reloadTime;

    }

    canFire(){

        return(

            !this.reloading &&

            this.ammo>0 &&

            this.lastShot<=0

        );

    }

}
