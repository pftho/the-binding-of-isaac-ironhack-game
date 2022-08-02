import { Component, Player } from "./components.js";
// HIDE SPLASH

const clearSplash = () => {
  const gameIntro = document.querySelector(".game-intro");
  const gameGoal = document.querySelector(".goal");
  const canvasDiv = document.querySelector("#game-board"); // create the canvas
  gameIntro.style.display = "none";
  gameGoal.style.display = "none";
  canvasDiv.style.display = "flex";
};

const gameArea = {
  //CANVAS
  canvas: document.createElement("canvas"),
  componentsArray: [],

  start: function () {
    //set up the canvas
    this.canvas.width = 1000; // set size of canvas
    this.canvas.height = 700; // set size of canvas
    this.ctx = this.canvas.getContext("2d"); // Initialize context

    //append canvas to the DOM
    const canvasDiv = document.querySelector("#game-board"); // create the canvas
    canvasDiv.appendChild(this.canvas); // put canvas on the DOM

    this.drawBackground();
    this.initComponents();

    this.intervalId = setInterval(() => {
      this.updateGame();
    }, 60);
  },

  //UPDATE GAME
  updateGame: function () {
    this.clear();
    this.drawBackground();
    this.drawComponents();
    this.displayScore();
    this.newPos();
  },

  // CLEAR (so we can see the new updated version)
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  //INIT COMPONENTS
  initComponents: function () {
    //init component
    const isaac = new Player("/images/isaac.png", 1, 1, 500, 350, 50, 50);
    const meetSavage = new Player(
      "/images/monster1.png",
      1,
      1,
      400,
      200,
      80,
      80
    );
    const zombiRider = new Player(
      "/images/monster2.png",
      1,
      1,
      200,
      100,
      70,
      85
    );

    const romanticGost = new Player(
      "/images/monster3.png",
      1,
      1,
      300,
      500,
      80,
      85
    );
    const bloodyFairy = new Player(
      "/images/monster4.png",
      1,
      1,
      600,
      400,
      85,
      80
    );

    this.componentsArray.push(isaac);
    this.componentsArray.push(meetSavage);
    this.componentsArray.push(zombiRider);
    this.componentsArray.push(romanticGost);
    this.componentsArray.push(bloodyFairy);

    return isaac;
  },

  //DRAW COMPONENTS

  drawComponents: function () {
    this.componentsArray.forEach((component) => {
      gameArea.ctx.drawImage(
        component.image,
        component.x,
        component.y,
        component.width,
        component.height
      );
    });
  },

  //UPDATE PLAYER POSITION

  updatePlayerSpeed() {
    document.addEventListener("keydown", (e) => console.log(Player.speedX));
  },

  newPlayerPos() {
    this.x += this.speedX; // this.x = this.x + speedX
    this.y += this.speedY; // this.y = this.y + speedY
  },

  //LISTEN FOR AN EVENT TO UPDATE THE SPEED

  // GAME MUSIC

  playGameMusic: function () {
    this.gameMusic = document.createElement("audio");
    this.canvas.appendChild(this.gameMusic); // put canvas on the DOM
    this.gameMusic.src =
      "/musics/The Binding of Isaac Afterbirth+ OST Delirium.mp3";
    this.gameMusic.play();
  },

  stopMusic: function () {
    this.gameMusic.stop();
  },

  //BACKGROUND

  drawBackground: function () {
    //  display canvas background
    this.background = new Image();
    this.background.src = "./images/basement.png";
    this.background.addEventListener("load", () => {
      this.ctx.drawImage(
        this.background,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    });
  },

  //SCORE
  displayScore: function () {
    this.ctx.font = "18px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: 6576`, 850, 100);
  },
};

window.onload = () => {
  // document.getElementById("start-button").onclick = () => {
  clearSplash();
  gameArea.start();
  gameArea.updatePlayerSpeed();

  // };
};
