export class InputManager{

    constructor(element=document){

        this.element=element;

        this.keys={};

        this.mouse={

            x:0,

            y:0,

            dx:0,

            dy:0,

            left:false,

            right:false

        };

        this.setupKeyboard();

        this.setupMouse();

    }

    /*==================================================*/

    setupKeyboard(){

        window.addEventListener(

            "keydown",

            (e)=>{

                this.keys[e.code]=true;

            }

        );

        window.addEventListener(

            "keyup",

            (e)=>{

                this.keys[e.code]=false;

            }

        );

    }

    /*==================================================*/

    setupMouse(){

        this.element.addEventListener(

            "mousemove",

            (e)=>{

                this.mouse.dx=e.movementX;

                this.mouse.dy=e.movementY;

            }

        );

        this.element.addEventListener(

            "mousedown",

            (e)=>{

                if(e.button===0)

                    this.mouse.left=true;

                if(e.button===2)

                    this.mouse.right=true;

            }

        );

        this.element.addEventListener(

            "mouseup",

            (e)=>{

                if(e.button===0)

                    this.mouse.left=false;

                if(e.button===2)

                    this.mouse.right=false;

            }

        );

        this.element.addEventListener(

            "contextmenu",

            (e)=>e.preventDefault()

        );

    }

    /*==================================================*/

    get forward(){

        return this.keys["KeyW"];

    }

    get backward(){

        return this.keys["KeyS"];

    }

    get left(){

        return this.keys["KeyA"];

    }

    get right(){

        return this.keys["KeyD"];

    }

    get sprint(){

        return this.keys["ShiftLeft"];

    }

    get jump(){

        return this.keys["Space"];

    }

    get reload(){

        return this.keys["KeyR"];

    }

    get interact(){

        return this.keys["KeyE"];

    }

    get pause(){

        return this.keys["Escape"];

    }

    resetMouse(){

        this.mouse.dx=0;

        this.mouse.dy=0;

    }

}
