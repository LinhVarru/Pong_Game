import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "/src/level";
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
  }

  start() {
    //paddle object
    this.paddle = new Paddle(this);

    //ball object
    this.ball = new Ball(this);

    //brick object
    let bricks = buildLevel(this, level1);

    //input handler
    new InputHandler(this.paddle);

    this.gameObjects = [this.paddle, this.ball, ...bricks];
  }

  update(deltaTime) {
    //update new position using delta Time
    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.marked_for_deletion
    );
  }

  draw(ctx) {
    //drawing the actual update
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
