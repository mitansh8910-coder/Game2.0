export class HUD {


    constructor(){



        this.createHUD();



    }



    /*==================================================*/

    createHUD(){



        this.container = document.createElement(

            "div"

        );



        this.container.id = "hud";



        this.container.style.position = "fixed";


        this.container.style.top = "20px";


        this.container.style.left = "20px";


        this.container.style.color = "white";


        this.container.style.fontFamily =

            "Arial";



        this.container.style.fontSize =

            "20px";



        this.container.style.zIndex =

            "1000";



        document.body.appendChild(

            this.container

        );



        this.healthText = this.createText();



        this.waveText = this.createText();



        this.zombieText = this.createText();



        this.ammoText = this.createText();



        this.timerText = this.createText();



        this.rewardText = this.createText();



    }



    /*==================================================*/

    createText(){



        const element = document.createElement(

            "div"

        );



        this.container.appendChild(

            element

        );



        return element;



    }



    /*==================================================*/

    update(data){



        this.healthText.innerHTML =


            "❤️ Health: " +

            Math.floor(

                data.health

            );



        this.waveText.innerHTML =


            "🌊 Wave: " +

            data.wave;



        this.zombieText.innerHTML =


            "🧟 Zombies: " +

            data.zombies;



        this.ammoText.innerHTML =


            "🔫 Ammo: " +

            data.ammo;



        this.timerText.innerHTML =


            "⏱ Next Wave: " +

            data.countdown;



        this.rewardText.innerHTML =


            "💰 Coins: " +

            data.coins;



    }
  
    /*==================================================*/

    createHealthBar(){



        this.healthContainer = document.createElement(

            "div"

        );



        this.healthContainer.style.width =

            "250px";



        this.healthContainer.style.height =

            "25px";



        this.healthContainer.style.background =

            "rgba(0,0,0,0.5)";



        this.healthContainer.style.marginTop =

            "10px";



        this.healthFill = document.createElement(

            "div"

        );



        this.healthFill.style.height =

            "100%";



        this.healthFill.style.width =

            "100%";



        this.healthContainer.appendChild(

            this.healthFill

        );



        this.container.appendChild(

            this.healthContainer

        );



    }



    /*==================================================*/

    updateHealthBar(value){



        let percent =

            Math.max(

                0,

                Math.min(

                    100,

                    value

                )

            );



        this.healthFill.style.width =

            percent + "%";



    }



    /*==================================================*/

    createCrosshair(){



        this.crosshair = document.createElement(

            "div"

        );



        this.crosshair.innerHTML =

            "+";



        this.crosshair.style.position =

            "fixed";



        this.crosshair.style.top =

            "50%";



        this.crosshair.style.left =

            "50%";



        this.crosshair.style.transform =

            "translate(-50%,-50%)";



        this.crosshair.style.fontSize =

            "35px";



        this.crosshair.style.color =

            "white";



        this.crosshair.style.zIndex =

            "1000";



        document.body.appendChild(

            this.crosshair

        );



    }



    /*==================================================*/

    showMessage(text){



        if(this.message)

            this.message.remove();



        this.message = document.createElement(

            "div"

        );



        this.message.innerHTML = text;



        this.message.style.position =

            "fixed";



        this.message.style.top =

            "40%";



        this.message.style.left =

            "50%";



        this.message.style.transform =

            "translate(-50%,-50%)";



        this.message.style.fontSize =

            "50px";



        this.message.style.color =

            "white";



        this.message.style.zIndex =

            "2000";



        document.body.appendChild(

            this.message

        );



    }



    /*==================================================*/

    /*==================================================*/

    showGameOver(){



        this.gameOver = document.createElement(

            "div"

        );



        this.gameOver.innerHTML =

            "☠ GAME OVER ☠";



        this.gameOver.style.position =

            "fixed";



        this.gameOver.style.top =

            "50%";



        this.gameOver.style.left =

            "50%";



        this.gameOver.style.transform =

            "translate(-50%,-50%)";



        this.gameOver.style.fontSize =

            "70px";



        this.gameOver.style.color =

            "red";



        this.gameOver.style.zIndex =

            "3000";



        document.body.appendChild(

            this.gameOver

        );



    }



    /*==================================================*/

    hideGameOver(){



        if(this.gameOver){



            this.gameOver.remove();



            this.gameOver=null;



        }



    }



    /*==================================================*/

    showWaveStart(number){



        this.showMessage(

            "🌊 Wave " +

            number +

            " Started"

        );



        setTimeout(()=>{



            if(this.message)

                this.message.remove();



        },3000);



    }



    /*==================================================*/

    showCountdown(time){



        this.timerText.innerHTML =


            "⏱ Next Wave: " +

            Math.ceil(time);



    }



    /*==================================================*/

    notify(text){



        const notification = document.createElement(

            "div"

        );



        notification.innerHTML = text;



        notification.style.position =

            "fixed";



        notification.style.bottom =

            "50px";



        notification.style.left =

            "50%";



        notification.style.transform =

            "translateX(-50%)";



        notification.style.fontSize =

            "25px";



        notification.style.color =

            "yellow";



        notification.style.zIndex =

            "2000";



        document.body.appendChild(

            notification

        );



        setTimeout(()=>{



            notification.remove();



        },2000);



    }



    /*==================================================*/

    /*==================================================*/

    reset(){



        this.hideGameOver();



        if(this.message){



            this.message.remove();



            this.message=null;



        }



        this.update({



            health:100,


            wave:0,


            zombies:0,


            ammo:0,


            countdown:0,


            coins:0



        });



    }



    /*==================================================*/

    setVisible(value){



        this.container.style.display =

            value ? "block" : "none";



        if(this.crosshair){



            this.crosshair.style.display =

                value ? "block" : "none";



        }



    }



    /*==================================================*/

    dispose(){



        if(this.container){



            this.container.remove();



        }



        if(this.crosshair){



            this.crosshair.remove();



        }



        if(this.gameOver){



            this.gameOver.remove();



        }



        this.container=null;


        this.crosshair=null;


        this.gameOver=null;



    }



}



/*==================================================*/
