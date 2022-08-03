export class Component {
  constructor(img, x, y, width, height) {
    this.image = new Image();
    this.image.src = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0; // controlling the speed on the x axis
    this.speedY = 0; // controlling the speed on the y axis
    this.health = 1;
    this.damage = 1;
  }

  drawComponent(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  newPos() {
    //console.log(this.x);
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
    this.damage = 0;
  }
}

export class Monster extends Component {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
    const maxSpeed = 10;
    const minSpeed = -10;
    this.speedX = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed); // controlling the speed on the x axis
    this.speedY = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed); // controlling the speed on the y axis
  }

  newPos() {
    super.newPos() //calling what expists in component
    const rightBorder = 1000 - 25 - this.width;
    const leftBorder = 25;
    const topBorder = 25;
    const bottomBorder = 600 - 25 - this.height;

    // Collision
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
  }
}

export class Tears extends Component {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
  }

  drawComponent(ctx, canvasWidth) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  newPos(ctx) {
    super.newPos();
    const rightBorder = 1000 - 25 - this.width;
    const leftBorder = 25;
    const topBorder = 25;
    const bottomBorder = 600 - 25 - this.height;

  

    // Collision
    if (
      this.x + this.speedX > rightBorder ||
      this.x + this.speedX < leftBorder
    ) {
      ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    // Collision

    if (
      this.y + this.speedY > bottomBorder ||
      this.y + this.speedY < topBorder
    ) {
      ctx.clearRect(this.x, this.y + this.speedY, this.width, this.height);
    }
  }
}
