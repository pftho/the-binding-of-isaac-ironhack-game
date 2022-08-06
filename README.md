# the-binding-of-isaac-ironhack-game

PROJECT'S NAME

The bind() of this.hack

DESCRIPTION

The goal of this project was to practice Javascript, DOM manipulation, Canvas and classes as well as bastic HTML & CSS by coding a simple game.

The game is based on a real game: The Binding of Isaac.

"The Binding of Isaac is a roguelike video game designed by independent developers Edmund McMillen and Florian Himsl. It was released in 2011 for Microsoft Windows, then ported to OS X, and Linux. The game's title and plot are inspired by the Biblical story of the Binding of Isaac. In the game, Isaac's mother receives a message from God demanding the life of her son as proof of her faith, and Isaac, fearing for his life, flees into the monster-filled basement of their home where he must fight to survive. "

source: https://en.wikipedia.org/wiki/The_Binding_of_Isaac_(video_game)

MVP

The player:

- The player can move in four directions using arrow keys
- Player can increase speed if arrow keys are pressed / Speed is reset when key up
- The player is able to shoot monster using "tears" in four directions using WASD / ZQSD keys

Monsters (obstacles):

- Monster appear and move randomly at a constant speed

Win / Loose:

- To win the player has to survive 30s
- Number of monsters killed is tracked during game
- if player enters in collision with a monster he looses

BACKLOG

- Fix bugs (tears not always leaving the screen when collision with border / Monster can occasionnaly flash due to canvas reset issues)
- Add music effects
- Add health for the player and monsters
- Add items that give bonus / malus
- Give the option to choose female player

DATA STRUCTURE

Index.js -> File managing DOM interactions

startGame(){
onGameEnded(){}
onGameOver(){}
handlePlayerMove(){}
generateTears(){}
handleTearMove(){}
}

components.js -> file implements components logic

- Component(){this.imgage, this.x, this.y, this.width, this.height, this.speedX, this.speedY}
  drawComponent(){}
  newPos(){}

- Player(){} extends Component

- Monster(){}extends Component
  collisionWithBorder(){}

- Tears(){} extends Component
  collisionWithBorder(){}

game.js -> file implements game logic

- Game(){
  this.canvas
  this.ctx
  this.player
  this.monsters
  this.tears
  this.score
  this.background
  this.onGameEnded
  this.onGameOver
  }
  start(){
  this.startGameTime
  this.update()
  this.intervalID
  }
  stop(){}
  update(){}
  collisionTearsMonsters(){}
  collisionPlayerMonster(){}
  counter(){}
  generateRandomMonster(){}

STATES Y STATES TRANSITIONS

- splashScreen
- gameScreen
- gameOverScreen
- gameEndedScreen

TASK

- Index - build DOM
- Index - build SplashScreen, GameScreen, gameOverScreen & gameEndedScreen
- Index - hide GameScreen, gameOverScreen & gameEndedScreen
- Index - build Canvas within GameScreen
- Index - addEvenListener for startGame
- Index - startGame
- Index (startGame(){}) - hide SplashScreen
- Index (startGame(){}) - display GameScreen
- Index (startGame(){}) - initiate Game
- Index (startGame(){}) - initiate Player
- Index (startGame(){}) - addEvenListener for player move
- Index (startGame(){}) - addEvenListener for player shoot
- Index (startGame(){}) - Game - startLoop
- Game - startLoop
- Game - updateCanvas
- Game - startGameTime
- Game - counter
  -> if timeFromStart > 60 :
  -> Game - stop
  -> Game - onGameEnded(){}
  -> onGameEnded(){} - storeBestScore(){}
- Game - displayScore
- Game - drawBackgournd
- Game - generateRandomMonster
- Player - draw
- Player - move
- Monster - draw
- Monster - move
- Monster - collisionWithBorder
- Tears - draw
- Tears - move
- Tears - collisionWithBorder
- Game - check collisionTearsMonsters
- Game - check collisionPlayerMonsters
  -> Game - stop
  -> Game- onGameOver

LINKS
Git
URls for the project repo and deploy:
https://github.com/pftho/the-binding-of-isaac-ironhack-game

Slides
URls for the project presentation (slides) :
https://docs.google.com/presentation/d/1fMq3c-SFzMUU-XXFHopuI6aACKGAO7C4TaA7_kzzk54/edit?usp=sharing
