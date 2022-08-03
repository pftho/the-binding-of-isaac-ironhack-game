import { Player } from "./player.js";
import { Monster } from "./monster.js";
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
  function handleMove(keyCode) {
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
    handleMove(playerMoves);
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
  currentGame.drawBackground(ctx, canvasWidth, canvasHeight);
  currentGame.player.drawPlayer(ctx);
  currentGame.player.newPos();
  currentGame.monsters.forEach((monster) => monster.drawMonster(ctx));
  currentGame.displayScore(ctx);
}

//GENERATE RANDOM MONSTERS

function generateRandomMonster(img, width, height) {
  const maxX = canvasWidth - width - 45;
  const minX = 45;
  const maxY = canvasHeight - height - 45;
  const minY = 45;
  return new Monster(
    img,
    Math.floor(Math.random() * (maxX - minX + 1) + minX),
    Math.floor(Math.random() * (maxY - minY + 1) + minY),
    width,
    height
  );
}

function generateRandomMonsters() {
  const meetSavage = generateRandomMonster("images/monster1.png", 80, 80);
  const zombiRider = generateRandomMonster("images/monster2.png", 50, 60);
  const romanticGost = generateRandomMonster("images/monster3.png", 60, 60);
  const bloodyFairy = generateRandomMonster("images/monster4.png", 75, 70);

  //push monsters in Game Array
  currentGame.monsters.push(meetSavage);
  currentGame.monsters.push(zombiRider);
  currentGame.monsters.push(romanticGost);
  currentGame.monsters.push(bloodyFairy);
}
