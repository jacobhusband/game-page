import Enemy from "./Enemy.js";

export default class EnemyController {
  enemies = [];
  timerTillNextEnemy = 0;

  constructor(canvas) {
    this.canvas = canvas;
    this.speedAmt = 2;
    this.maxRadius = 40;
    this.minRadius = 5;
    this.enemySpawnRate = 100;
  }

  spawn() {
    if (this.timerTillNextEnemy <= 0) {
      let [x, y] = this.calcSpawnLocation();
      let speed = this.calcSpeed(this.speedAmt);
      this.maxRadius += 0.5;
      this.minRadius += 0.5;
      let radius = this.calcRadius(this.maxRadius, this.minRadius);
      this.enemySpawnRate = Math.ceil(this.enemySpawnRate * 0.97);
      let delay = this.enemySpawnRate;
      this.enemies.push(new Enemy(x, y, speed, radius));
      this.timerTillNextEnemy = delay;
    }

    this.timerTillNextEnemy--;
  }

  calcSpawnLocation() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    let randomNum = this.calcRandomNum(4);
    let x = 0;
    let y = 0;

    switch (randomNum) {
      case 1:
        x = this.calcRandomNum(-20, -50);
        y = this.calcRandomNum(-50, h + 50);
        break;
      case 2:
        x = this.calcRandomNum(w + 20, w + 50);
        y = this.calcRandomNum(-50, h + 50);
        break;
      case 3:
        x = this.calcRandomNum(-50, w + 50);
        y = this.calcRandomNum(-20, -50);
        break;
      case 4:
        x = this.calcRandomNum(-50, w + 50);
        y = this.calcRandomNum(h + 20, h + 50);
        break;
    }

    return [x, y];
  }

  calcSpeed(max, min = 1) {
    return this.calcRandomNum(max, min);
  }

  calcRadius(max, min = 1) {
    return this.calcRandomNum(max, min);
  }

  calcRandomNum(max, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw(ctx, playerX, playerY) {
    this.checkHP();
    this.spawn();
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx, playerX, playerY);
    });
  }

  checkHP() {
    this.enemies.forEach((enemy) => {
      if (enemy.radius <= 3) {
        const index = this.enemies.indexOf(enemy);
        this.enemies.splice(index, 1);
      }
    });
  }
}
