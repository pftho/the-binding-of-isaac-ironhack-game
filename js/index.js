import { Player, Tears } from "./components.js";
import { Game } from "./game.js";

// THIS FILE MANAGES DOM INTERACTIONS

//HIDING GAME OVER AND END GAME PAGES
const gameOver = document.querySelector(".gameOver");
const endGame = document.querySelector(".endGame");
gameOver.style.display = "none";
endGame.style.display = "none";

//SET UP CANVAS AND APPEND TO THE DOM
const canvasDiv = document.querySelector("#game-board");
const canvas = document.createElement("canvas");
canvasDiv.appendChild(canvas);
const canvasWidth = 1000;
canvas.width = canvasWidth;
const canvasHeight = 600;
canvas.height = canvasHeight;

//CREATE LOCAL STORAGE

function storeBestScore(score) {
  const lsScoreEndSpan = document.querySelector("#ls-score-game-ended-span");

  if (localStorage.length === 1) {
    window.localStorage.heightScore = window.localStorage.currentScore;
    lsScoreEndSpan.innerHTML = window.localStorage.heightScore;
    console.log(window.localStorage);
  } else if (
    parseInt(localStorage.getItem("currentScore")) >=
    parseInt(localStorage.getItem("heightScore"))
  ) {
    window.localStorage.heightScore = window.localStorage.currentScore;
    lsScoreEndSpan.innerHTML = window.localStorage.heightScore;
  }
}

// LISTEN FOR START GAME BUTTON PRESS = FUNCTION START
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

// START FUNCTION TRIGGERED WHEN BUTTON PRESSED
function startGame() {
  // HIDE SPLASH & SHOW CANVAS
  const gameIntro = document.querySelector(".game-intro");
  const gameGoal = document.querySelector(".goal");
  const canvasDiv = document.querySelector("#game-board");
  const gameOver = document.querySelector(".gameOver");
  const endGame = document.querySelector(".endGame");
  gameOver.style.display = "none";
  endGame.style.display = "none";
  gameIntro.style.display = "none";
  gameGoal.style.display = "none";
  canvasDiv.style.display = "flex";

  // GAME OVER & END GAME
  // End Game
  function onGameEnded(score) {
    // HIDE CANVAS AND DISPLAY WIN SCREEN
    endGame.style.display = "flex";
    canvasDiv.style.display = "none";
    const scoreSpan = document.querySelector(".endGame #score");
    scoreSpan.innerHTML = `${score} monsters`;
    window.localStorage.currentScore = score;

    console.log(window.localStorage);

    storeBestScore(score);

    //CONNECT THINGS FOR GAME TO RESTART ONCE: if not eventlistener keep stacking on the button and start multiple time the game
    const playAgainBtn = document.querySelector(".endGame .play-again");
    playAgainBtn.addEventListener(
      "click",
      () => {
        startGame();
      },
      { once: true }
    );
  }

  //Game Over
  function onGameOver() {
    gameOver.style.display = "flex";
    canvasDiv.style.display = "none";

    const playAgainBtn = document.querySelector(".gameOver .play-again");
    playAgainBtn.addEventListener(
      "click",
      () => {
        startGame(); // startGame initialise things, so it works as a reset
      },
      { once: true }
    );
  }

  // INITITATE GAME
  const game = new Game(canvas, onGameEnded, onGameOver);

  // PLAYER
  // Init Player and assign the to game
  const currentPlayer = new Player("images/isaac.png", 400, 350, 50, 50);
  game.player = currentPlayer;

  // Define : arrow keys & speed
  function handlePlayerMove(keyCode) {
    switch (keyCode) {
      //LEFT
      case 37:
        currentPlayer.speedX = -10;
        break;

      //RIGHT
      case 39:
        currentPlayer.speedX = 10;
        break;

      //UP
      case 38:
        currentPlayer.speedY = -10;
        break;

      //DOWN
      case 40:
        currentPlayer.speedY = 10;
        break;
    }
  }

  document.addEventListener("keyup", (e) => {
    currentPlayer.speedX = 0;
    currentPlayer.speedY = 0;
  });

  //Trigger player move
  document.addEventListener("keydown", (e) => {
    handlePlayerMove(e.keyCode);
  });

  // TEARS
  // Init tears

  function generateTears(x, y, speedX, speedY) {
    let tear = new Tears("images/tear.png", x, y, 15, 20);
    tear.speedX = speedX;
    tear.speedY = speedY;
    game.tears.push(tear);
  }

  //define how tears are triggered for each keys
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

  //Trigger the tears when keydown
  document.addEventListener("keydown", (e) => handleTearMove(e.keyCode));

  game.startLoop();
}
