export default class Enemy {
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
    this.color = 'white';
    this.hp = radius*2;
  }

  draw(ctx, playerX, playerY) {
    let [ux, uy] = this.calcDirection(playerX, playerY);
    this.move(ux, uy);
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill()
  }

  calcDirection(pX, pY) {
    const xDir = pX - this.x;
    const yDir = pY - this.y;
    const magnitude = (xDir**2 + yDir**2)**(1/2);
    const ux = xDir/magnitude;
    const uy = yDir/magnitude;
    return [ux, uy];
  }

  move(ux, uy) {
    this.x += ux * this.speed;
    this.y += uy * this.speed;
  }
}
