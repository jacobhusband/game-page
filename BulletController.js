import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay, degree) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage, degree));
      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }

  draw(ctx) {
    console.log(this.bullets.length);
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  isBulletOffScreen(bullet) {
    if (bullet.y <= 0 || bullet.y >= 600 || bullet.x <= 0 || bullet.x >= 550) {
      return true;
    }
  }
}
