import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas, enemyController) {
    this.canvas = canvas;
    this.enemyController = enemyController;
  }

  shoot(
    x,
    y,
    speed,
    damage,
    delay,
    degree,
    width,
    height,
    heatSeek,
    heatSeekRange
  ) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(
        new Bullet(
          x,
          y,
          speed,
          damage,
          degree,
          width,
          height,
          this.enemyController,
          heatSeek,
          heatSeekRange
        )
      );
      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }

  draw(ctx) {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      if (bullet.hp <= 0) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  isBulletOffScreen(bullet) {
    if (
      bullet.y <= 0 ||
      bullet.y >= window.innerHeight ||
      bullet.x <= 0 ||
      bullet.x >= window.innerWidth
    ) {
      return true;
    }
  }
}
