export class Game {
  constructor() {
    this.player = {};
    this.monsters = [];
    this.score = 0;
  }

  displayScore(ctx) {
    ctx.font = "18px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 850, 35);
  }
}
