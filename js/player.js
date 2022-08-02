export class Player {
  constructor(img, x, y, width, height) {
    this.image = new Image();
    this.image.src = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawPlayer(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  movePlayer(keyCode) {
    console.log(keyCode);
    switch (keyCode) {
      //LEFT
      case 37:
        if (this.x > 45) {
          this.x -= 10;
        }
        break;
      //RIGHT
      case 39:
        if (this.x < 45) {
          this.x += 10;
        }
        break;
      //UP
      case 38:
        if (this.y > 25) {
          this.y -= 10;
        }
        break;
      //DOWN
      case 40:
        if (this.y < 25) {
          this.y += 10;
        }
        break;
    }
  }
}
