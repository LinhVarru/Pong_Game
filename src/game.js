import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "/src/level";

const GAMESTATE = {
  PAUSED : 0,
  RUNNING : 1,
  MENU: 2,
  OVER: 3
}
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    //paddle object
    this.paddle = new Paddle(this);

    //ball object
    this.ball = new Ball(this);

    //brick object
    let bricks = buildLevel(this, level1);

    //input handler
    new InputHandler(this,this.paddle);

    this.gameObjects = [this.paddle, this.ball, ...bricks];
  }

  update(deltaTime) {
    //Game paused, no update
    if(this.gamestate == GAMESTATE.PAUSED)  return;

    //update new position using delta Time
    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.marked_for_deletion
    );
  }

  draw(ctx) {
    //drawing the actual update
    this.gameObjects.forEach(object => object.draw(ctx));
    
    if(this.gamestate == GAMESTATE.PAUSED){
      ctx.rect(0,0,this.gameWidth,this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
    }
  }

  togglePause(){
    if(this.gamestate == GAMESTATE.PAUSED)
      this.gamestate = GAMESTATE.RUNNING;
    else
      this.gameHeight = GAMESTATE.PAUSED;
  }
}
