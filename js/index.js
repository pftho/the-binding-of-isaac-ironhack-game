import { Component, Player, Monster, Tears } from "./components.js";
import { Game } from "./game.js";

// DECLARE GAME & PLAYER TO USE THE CLASSES
let currentGame;
let currentPlayer;

//SET UP CANVAS AND APPEND TO THE DOM
const canvasDiv = document.querySelector("#game-board");
const canvas = document.createElement("canvas");
canvasDiv.appendChild(canvas); // put canvas on the DOM
const canvasWidth = 1000; // set size of canvas
canvas.width = canvasWidth;
const canvasHeight = 600; // set size of canvas
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d"); // Initialize context

// LISTEN FOR START GAME BUTTON PRESS = FUNCTION START
window.onload = () => {
  //document.getElementById("start-button").onclick = () => {
  startGame();
  // };
};

// START FUNCTION TRIGGERED WHEN BUTTON PRESSED
function startGame() {
  // HIDE SPLASH & SHOW CANVAS
  const gameIntro = document.querySelector(".game-intro");
  const gameGoal = document.querySelector(".goal");
  const canvasDiv = document.querySelector("#game-board");
  gameIntro.style.display = "none";
  gameGoal.style.display = "none";
  canvasDiv.style.display = "flex";

  // INITITATE GAME & MUSIC
  currentGame = new Game();
  //currentGame.playGameMusic();

  // INITIATE PLAYER
  currentPlayer = new Player("/images/isaac.png", 400, 350, 50, 50);
  currentGame.player = currentPlayer;

  // DEFINE HOW PLAYER MOVES
  function handlePlayerMove(keyCode) {
    switch (keyCode) {
      //LEFT
      case 37:
        currentPlayer.speedX = -10;
        // console.log("speedX", currentPlayer.speedX);
        break;

      //RIGHT
      case 39:
        currentPlayer.speedX = 10;
        // console.log("speedX", currentPlayer.speedX);
        break;

      //UP

      case 38:
        currentPlayer.speedY = -10;
        // console.log("speedY", currentPlayer.speedY);
        break;

      //DOWN
      case 40:
        currentPlayer.speedY = 10;
        //  console.log("speedY", currentPlayer.speedY);
        break;
    }
  }

  // SPEED GOES BACK TO 0 WHEN KEY UP
  document.addEventListener("keyup", (e) => {
    currentPlayer.speedX = 0;
    currentPlayer.speedY = 0;
  });

  //LISTEN FOR A ARROW DOWN AND MAKE PLAYER MOVE
  document.addEventListener("keydown", (e) => {
    let playerMoves = e.keyCode;
    handlePlayerMove(playerMoves);
  });

  // GENERATE MONSTERS
  generateRandomMonsters();

  //UPDATE GAME
  updateGame();
  setInterval(() => {
    updateGame();
  }, 200);
}

//UPDATING BY DRAWING THE NEW STATES
function updateGame() {
  //update background to clear & score
  currentGame.drawBackground(ctx, canvasWidth, canvasHeight);
  currentGame.displayScore(ctx);

  // update player
  currentGame.player.newPos();
  currentGame.player.drawComponent(ctx);

  // update monster
  currentGame.monsters.forEach((monster) => {
    if (currentPlayer.x !== monster.x && currentPlayer.y !== monster.y) {
      monster.drawComponent(ctx);
    }
  });
  currentGame.monsters.forEach((monster) => {
    monster.newPos();
  }); // newPos makes them move randomly

  if (currentGame.monsters.length < 6) {
    generateRandomMonsters();
  } //6 monsters on the board

  //update Tears
  currentGame.tears.forEach((tear) => tear.drawComponent(ctx));
  currentGame.tears.forEach((tear) => tear.newPos(ctx));

  // check for collision tears vs monsters
  collisionTearsMonsters(currentGame.tears, currentGame.monsters);
}

//GENERATE RANDOM MONSTERS

function generateRandomMonsters() {
  const maxX = canvasWidth - 60 - 45;
  const minX = 45;
  const maxY = canvasHeight - 60 - 45;
  const minY = 45;

  const monsterConfig = [
    {
      img: "images/monster1.png",
      x: Math.floor(Math.random() * (maxX - minX + 1) + minX),
      y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
      width: 80,
      height: 80,
    },
    {
      img: "images/monster2.png",
      x: Math.floor(Math.random() * (maxX - minX + 1) + minX),
      y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
      width: 50,
      height: 50,
    },
    {
      img: "images/monster3.png",
      x: Math.floor(Math.random() * (maxX - minX + 1) + minX),
      y: Math.floor(Math.random() * (maxY - minY + 1) + minY),
      width: 60,
      height: 60,
    },
    {
      img: "images/monster4.png",
      x: Math.floor(Math.random() * (maxX - minX + 1) + minX),
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

  currentGame.monsters.push(randomMonster);
}

//GENERATE TEARS AND HOW THEY MOVE

// document.addEventListener("keydown", (e) => {
//   if (e.keyCode === 32) {
//     return generateTears();
//   }
// });
document.addEventListener("keydown", (e) => handleTearMove(e.keyCode));

function handleTearMove(keyCode) {
  switch (keyCode) {
    //LEFT
    case 81:
      generateTears(currentPlayer.x - 15, currentPlayer.y + 10, -10, 0);
      break;

    //RIGHT
    case 68:
      generateTears(currentPlayer.x + 60, currentPlayer.y + 10, 10, 0);
      break;

    //UP
    case 90:
      generateTears(
        currentPlayer.x + currentPlayer.width / 2,
        currentPlayer.y,
        0,
        -10
      );
      break;

    //DOWN
    case 83:
      generateTears(
        currentPlayer.x + currentPlayer.width / 2,
        currentPlayer.y,
        0,
        10
      );
      break;
  }
}

function generateTears(x, y, speedX, speedY) {
  let tear = new Tears("/images/tear.png", x, y, 15, 20);
  tear.speedX = speedX;
  tear.speedY = speedY;
  currentGame.tears.push(tear);
}

//COLLISION TEAR VS MONSTER  -> score increase
// we need to compare every monster position with every tear position

function collisionTearsMonsters(tearArr, monsterArr) {
  if (!currentGame.tears.length) {
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
        currentGame.score++
      }
    });
  });
}

//COLLISION ISAAC VS MONSTER -> game over
// we need to compare every monster position with Isaac position
