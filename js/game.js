export class Game {
  constructor() {
    this.player = {};
    this.monsters = [];
    this.score = 0;
    this.background = new Image();
    this.background.src = "./images/basement.png";
  //  this.gameMusic = new Audio(
     // "/musics/The Binding of Isaac Afterbirth+ OST Delirium.mp3"
 //   );
  }

  displayScore(ctx) {
    ctx.font = "18px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 850, 35);
  }

  drawBackground(ctx, canvasWidth, canvasHeight) {
    ctx.drawImage(this.background, 0, 0, canvasWidth, canvasHeight);
  }

  // playGameMusic() {
  //   this.gameMusic.play();
  // }
}
