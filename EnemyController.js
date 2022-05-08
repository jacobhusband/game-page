import Enemy from "./Enemy.js";

export default class EnemyController {
  enemies = [];
  timerTillNextEnemy = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  spawn() {
    if (timerTillNextEnemy <= 0) {
      let [x, y] = this.calcSpawnLocation();
      let speed = this.calcSpeed(10);
      let radius = this.calcRadius(20, 3);
      this.enemies.push(new Enemy(x, y, speed, radius));
    }
  }

  calcSpawnLocation() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const borderX = [0, w];
    const borderY = [0, h];
    const randomNum = this.calcRandomNum(4, 1);
    let x = 0;
    let y = 0;

    switch (randomNum) {
      case 1:
        x = this.calcRandomNum(-20, -50);
        y = this.calcRandomNum(-50, h + 50);
      case 2:
        x = this.calcRandomNum(w + 20, w + 50);
        y = this.calcRandomNum(-50, h + 50);
      case 3:
        x = this.calcRandomNum(-50, w + 50);
        y = this.calcRandomNum(-20, -50);
      case 4:
        x = this.calcRandomNum(-50, w + 50);
        y = this.calcRandomNum(h + 20, h + 50);
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

  draw(ctx) {
    this.enemies.forEach((enemy) => {});
  }
  isEnemyDead() {}
}
