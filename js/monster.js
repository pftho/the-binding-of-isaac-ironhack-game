export class Monster {
  constructor(img, x, y, width, height) {
    this.image = new Image();
    this.image.src = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawMonster(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}
