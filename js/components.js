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

  newPos() {
    this.x += this.speedX; // this.x = this.x + speedX
    this.y += this.speedY; // this.y = this.y + speedY
  }
}

export class Player extends Component {
  constructor(img, health, strength, x, y, width, height) {
    super(img, x, y, width, height);
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return (this.strength = strength);
  }
}
