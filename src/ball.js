import { detectCollision } from "/src/CollisionDetection";
export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.position = { x: 10, y: 200 };
    this.speed = { x: 4, y: 4 };

    this.size = 16;

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //COLLISION

    //Against 2 sides
    if (
      this.position.x + this.size > this.gameWidth ||
      this.position.x + this.size < 0
    )
      this.speed.x = -this.speed.x;

    //Against top and bottom
    if (
      this.position.y + this.size > this.gameHeight ||
      this.position.y + this.size < 0
    )
      this.speed.y = -this.speed.y;

    //Against the paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
