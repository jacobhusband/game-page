export default class Bullet {
  constructor(x, y, speed, damage, degree) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.degree = degree;

    this.color = "red";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    let width = 5;
    let height = 15;
    let angle45Long = height * Math.cos(Math.PI / 4);
    let angle45Short = width * Math.cos(Math.PI / 4);

    if (this.degree == 0) {
      this.y -= this.speed;
      width = 5;
      height = 15;
    } else if (this.degree == 90) {
      this.x += this.speed;
      width = 15;
      height = 5;
    } else if (this.degree == 180) {
      this.y += this.speed;
      width = 5;
      height = 15;
    } else if (this.degree == 270) {
      this.x -= this.speed;
      width = 15;
      height = 5;
    }

    if (
      this.degree == 0 ||
      this.degree == 90 ||
      this.degree == 180 ||
      this.degree == 270
    ) {
      ctx.fillRect(this.x, this.y, width, height);
    }

    if (this.degree == 45) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + angle45Short, this.y + angle45Short);
      ctx.lineTo(
        this.x + angle45Long + angle45Short,
        this.y - angle45Long + angle45Short
      );
      ctx.lineTo(this.x + angle45Long, this.y - angle45Long);
      ctx.closePath();
      ctx.fill();
      this.x += this.speed;
      this.y -= this.speed;
    } else if (this.degree == 135) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - angle45Short, this.y + angle45Short);
      ctx.lineTo(
        this.x + angle45Long - angle45Short,
        this.y + angle45Long + angle45Short
      );
      ctx.lineTo(this.x + angle45Long, this.y + angle45Long);
      ctx.closePath();
      ctx.fill();
      this.x += this.speed;
      this.y += this.speed;
    } else if (this.degree == 225) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + angle45Short, this.y + angle45Short);
      ctx.lineTo(
        this.x - angle45Long + angle45Short,
        this.y + angle45Long + angle45Short
      );
      ctx.lineTo(this.x - angle45Long, this.y + angle45Long);
      ctx.closePath();
      ctx.fill();
      this.x -= this.speed;
      this.y += this.speed;
    } else if (this.degree == 315) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - angle45Short, this.y + angle45Short);
      ctx.lineTo(
        this.x - angle45Long - angle45Short,
        this.y - angle45Long + angle45Short
      );
      ctx.lineTo(this.x - angle45Long, this.y - angle45Long);
      ctx.closePath();
      ctx.fill();
      this.x -= this.speed;
      this.y -= this.speed;
    }
  }
}
