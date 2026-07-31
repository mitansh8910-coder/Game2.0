export class GameLoop{

    constructor(game){

        this.game=game;

        this.running=false;

        this.lastTime=0;

        this.delta=0;

        this.maxDelta=0.05;

        this.fps=0;

        this.frames=0;

        this.fpsTimer=0;

        this.animate=this.animate.bind(this);

    }

    start(){

        if(this.running)return;

        this.running=true;

        this.lastTime=performance.now();

        requestAnimationFrame(this.animate);

    }

    stop(){

        this.running=false;

    }

    animate(now){

        if(!this.running)return;

        this.delta=(now-this.lastTime)/1000;

        this.lastTime=now;

        if(this.delta>this.maxDelta)

            this.delta=this.maxDelta;

        this.frames++;

        this.fpsTimer+=this.delta;

        if(this.fpsTimer>=1){

            this.fps=this.frames;

            this.frames=0;

            this.fpsTimer=0;

            if(this.game.ui?.fps)

                this.game.ui.fps.textContent=this.fps;

        }

        this.game.update(this.delta);

        this.game.render();

        requestAnimationFrame(

            this.animate

        );

    }

}
