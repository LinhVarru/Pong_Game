import { detectCollision } from "/src/CollisionDetection";
export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.position = position;

    this.width = 87;
    this.height = 30;

    this.game = game;

    this.marked_for_deletion = false;
  }
  update() {
    if (detectCollision(this.game.ball, this))
      this.game.ball.speed.y = -this.game.ball.speed.y;
    this.marked_for_deletion = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
