export class Player {
  constructor(img, x, y, width, height) {
    this.image = new Image();
    this.image.src = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0; // controlling the speed on the x axis
    this.speedY = 0; // controlling the speed on the y axis
  }

  drawPlayer(ctx) {
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
