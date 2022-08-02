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

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
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
