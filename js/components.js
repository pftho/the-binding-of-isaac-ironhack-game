// THIS FILE IMPLEMENTS COMPONENTS LOGIC

export class Component {
  constructor(img, x, y, width, height) {
    this.image = new Image();
    this.image.src = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawComponent(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // if component is withing range we increase position with speed, as a result character moves
  // speed is controlled by eventlistener on the dom (index.js)
  newPos() {
    if (
      this.x + this.speedX < 1000 - 25 - this.width &&
      this.x + this.speedX > 25
    ) {
      this.x += this.speedX;
    }

    if (
      this.y + this.speedY < 600 - 25 - this.height &&
      this.y + this.speedY > 25
    ) {
      this.y += this.speedY;
    }
  }
}

export class Player extends Component {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
  }
}

export class Monster extends Component {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
    //speed range  for monsters
    const maxSpeed = 5;
    const minSpeed = -5;
    // random speed for the monster within range
    this.speedX = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed);
    this.speedY = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed);
  }

  // if current position + next position = collision we revert speed so they go the other way
  collisionWithBorder(monsterArr) {
    const rightBorder = 1000 - 25 - this.width;
    const leftBorder = 25;
    const topBorder = 25;
    const bottomBorder = 600 - 25 - this.height;

    monsterArr.forEach((monster) => {
      if (
        this.x + this.speedX > rightBorder ||
        this.x + this.speedX < leftBorder
      ) {
        this.speedX = -this.speedX;
        this.x += this.speedX;
      }

      // Collision

      if (
        this.y + this.speedY > bottomBorder ||
        this.y + this.speedY < topBorder
      ) {
        this.speedY = -this.speedY;
        this.y += this.speedY;
      }
    });
  }
}

export class Tears extends Component {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
  }

  drawComponent(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // if current position + next position = collision, we delete from the array so they disapear

  collisionWithBorder(tearArr) {
    const rightBorder = 1000 - 25 - this.width;
    const leftBorder = 25;
    const topBorder = 25;
    const bottomBorder = 600 - 25 - this.height;

    tearArr.forEach((tear) => {
      if (
        this.x + this.speedX > rightBorder ||
        this.x + this.speedX < leftBorder
      ) {
        tearArr.splice(tearArr.indexOf(tear), 1);
      }

      // Collision

      if (
        this.y + this.speedY > bottomBorder ||
        this.y + this.speedY < topBorder
      ) {
        tearArr.splice(tearArr.indexOf(tear), 1);
      }
    });
  }
}
