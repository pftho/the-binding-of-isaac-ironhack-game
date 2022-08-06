import { Monster } from "./components.js";

// THIS FILE IMPLEMENTS GAME LOGIC

export class Game {
  constructor(canvas, onGameEnded, onGameOver) {
    this.player = {};
    this.monsters = [];
    this.tears = [];
    this.score = 0;
    this.background = new Image();
    this.background.src = "./images/basement.png";
    this.onGameEnded = onGameEnded; // function from the index because DOM manipulation
    this.onGameOver = onGameOver; // function from the index because DOM manipulation
    this.canvas = canvas; //Canvas interacts with DOM so we need to get it from Index
    this.ctx = this.canvas.getContext("2d");
  }

  startLoop() {
    this.startGameTime = new Date();
    //UPDATE GAME
    this.update();
    this.intervalID = setInterval(() => {
      this.update();
    }, 32);
  }

  stop() {
    clearInterval(this.intervalID);
    
  }

  update() {
    //update background to clear, keep track of time & score
    this.drawBackground();
    this.displayScore();
    this.counter();

    // update player
    this.player.newPos();
    this.player.drawComponent(this.ctx);

    // update monster
    this.monsters.forEach((monster) => {
      monster.drawComponent(this.ctx);
    });
    this.monsters.forEach((monster) => {
      monster.newPos();
    }); // newPos makes them move randomly because they speedX and speedY is random in the class

    this.monsters.forEach((monster) =>
      monster.collisionWithBorder(this.monsters)
    );

    if (this.monsters.length < 6) {
      this.generateRandomMonster();
    } //6 monsters on the board

    //update Tears
    this.tears.forEach((tear) => tear.drawComponent(this.ctx));
    this.tears.forEach((tear) => tear.newPos(this.ctx));
    this.tears.forEach((tear) => tear.collisionWithBorder(this.tears));

    // Check for collision
    this.collisionTearsMonsters(); //-> increase score
    this.collisionPlayerMonsters(); //-> game over
  }

  displayScore() {
    this.ctx.font = "18px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 850, 35);
  }

  drawBackground() {
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  collisionTearsMonsters() {
    if (!this.tears.length) {
      return;
    }

    this.tears.forEach((tear) => {
      this.monsters.forEach((monster) => {
        if (
          tear.x < monster.x + monster.width &&
          tear.x + tear.width > monster.x &&
          tear.y < monster.y + monster.height &&
          tear.height + monster.y > monster.y
        ) {
          this.monsters.splice(this.monsters.indexOf(monster), 1);
          this.tears.splice(this.tears.indexOf(tear), 1);
          this.score++;
        }
      });
    });
  }

  //GAME OVER TRIGGER
  collisionPlayerMonsters() {
    this.monsters.forEach((monster) => {
      if (
        this.player.x < monster.x + monster.width &&
        this.player.x + this.player.width > monster.x &&
        this.player.y < monster.y + monster.height &&
        this.player.height + this.player.y > monster.y
      ) {
        this.stop();
        this.onGameOver(); // dom interaction so -> index.js We can access it because when we initiate the game on the index, we pass the function as an argument
        console.log("game over", this.startGameTime);
      }
    });
  }

  // COUNTER -> WILL DETERMINE IF WIN
  counter() {
    const timeFromStart = Math.ceil(
      (new Date().getTime() - this.startGameTime.getTime()) / 1000
    );

    if (timeFromStart > 0) {
      this.ctx.font = "18px serif";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`Timer: ${60 - timeFromStart}s left`, 600, 35);
    }

    if (timeFromStart > 30) {
      this.stop();
      this.onGameEnded(this.score); // dom interaction so -> index.js We can access it because when we initiate the game on the index, we pass the function as an argument
    }
  }

  // OBSTACLES

  generateRandomMonster() {
    // X left Range
    const maxXLeftRange = this.player.x - 150;
    const minXLeftRange = 45;

    // X right Range
    const maxXRightRange = 895;
    const minXRightRange = this.player.x + 150;

    // Y
    const maxY = this.canvas.height - 60 - 45;
    const minY = 45;

    const monsterConfig = [
      {
        img: "images/monster1.png",
        x: Math.floor(
          Math.random() * (maxXLeftRange - minXLeftRange + 1) + minXLeftRange
        ),
        y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
        width: 80,
        height: 80,
      },
      {
        img: "images/monster2.png",
        x: Math.floor(
          Math.random() * (maxXLeftRange - minXLeftRange + 1) + minXLeftRange
        ),
        y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
        width: 50,
        height: 50,
      },
      {
        img: "images/monster3.png",
        x: Math.floor(
          Math.random() * (maxXRightRange - minXRightRange + 1) + minXRightRange
        ),
        y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
        width: 60,
        height: 60,
      },
      {
        img: "images/monster4.png",
        x: Math.floor(
          Math.random() * (maxXRightRange - minXRightRange + 1) + minXRightRange
        ),
        y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
        width: 75,
        height: 70,
      },
    ];

    const randomMonsterConfig =
      monsterConfig[Math.floor(Math.random() * monsterConfig.length)];
    //console.log("random monster", randomMonsterConfig);

    let randomMonster = new Monster(
      randomMonsterConfig.img,
      randomMonsterConfig.x,
      randomMonsterConfig.y,
      randomMonsterConfig.width,
      randomMonsterConfig.height
    );
    //console.log("game array", currentGame.monsters);

    this.monsters.push(randomMonster);
  }
}
