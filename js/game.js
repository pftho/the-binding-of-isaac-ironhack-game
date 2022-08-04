export class Game {
  constructor() {
    this.player = {};
    this.monsters = [];
    this.tears = [];
    this.score = 0;
    this.background = new Image();
    this.background.src = "./images/basement.png";
    this.winningBackground = new Image();
    this.winningBackground.src = "";
    this.gameOverBackground = new Image();
    this.gameOverBackground.src = "/images/gameOver.jpeg";
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

  collisionTearsMonsters(tearArr, monsterArr) {
    if (!this.tears.length) {
      console.log("no tears");
    }

    tearArr.forEach((tear) => {
      monsterArr.forEach((monster) => {
        if (
          tear.x < monster.x + monster.width &&
          tear.x + tear.width > monster.x &&
          tear.y < monster.y + monster.height &&
          tear.height + monster.y > monster.y
        ) {
          monsterArr.splice(monsterArr.indexOf(monster), 1);
          tearArr.splice(tearArr.indexOf(tear), 1);
          this.score++;
        }
      });
    });
  }

  collisionPlayerMonsters(player, monsterArr, ctx, canvasWidth, canvasHeight) {
    monsterArr.forEach((monster) => {
      if (
        player.x < monster.x + monster.width &&
        player.x + player.width > monster.x &&
        player.y < monster.y + monster.height &&
        player.height + monster.y > monster.y
      ) {
        ctx.drawImage(this.gameOverBackground, 0, 0, canvasWidth, canvasHeight);
        ctx.fillText("Game Over", 185, 340);
        ctx.fillStyle = "rgb(0,0,0)";
      }
    });
  }
}
