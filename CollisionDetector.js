import EndGame from "./EndGame.js";

export default class CollisionDetector {
  constructor(canvas) {
    this.canvas = canvas;
  }

  detectEnemyHit(ctx, bullets, enemies, score) {
    bullets.forEach((bullet) => {
      bullet.cornerNodes.forEach((node) => {
        enemies.forEach((enemy) => {
          let d = this.calcDistance(node[0], enemy.x, node[1], enemy.y);
          if (d <= enemy.radius) {
            enemy.hp -= bullet.damage;
            enemy.radius -= bullet.damage;
            enemy.radius <= 0
              ? (enemy.radius = 0)
              : (enemy.radius = enemy.radius);
            bullet.hp -= 1;
            score.score += bullet.damage;
          }
        });
      });
    });
  }

  detectPlayerHit(ctx, enemies, player) {
    let [center, radius] = this.calcPlayerHitBox(player.cornerNodes);
    enemies.forEach((enemy) => {
      let d = this.calcDistance(enemy.x, center[0], enemy.y, center[1]);
      if (d <= radius + enemy.radius) {
        new EndGame();
      }
    });
  }

  calcPlayerHitBox(nodes) {
    let center = [
      (nodes[0][0] + nodes[1][0] + nodes[2][0]) / 3,
      (nodes[0][1] + nodes[1][1] + nodes[2][1]) / 3,
    ];
    let A = this.calcDistance(
      nodes[1][0],
      nodes[0][0],
      nodes[1][1],
      nodes[0][1]
    );
    let B = this.calcDistance(
      nodes[2][0],
      nodes[1][0],
      nodes[2][1],
      nodes[1][1]
    );
    let C = this.calcDistance(
      nodes[0][0],
      nodes[2][0],
      nodes[0][1],
      nodes[2][1]
    );
    let P = A + B + C;
    let X = P / 2;
    let area = [X * (X - A) * (X - B) * (X - C)] ** (1 / 2);
    let radius = (2 * area) / P;
    return [center, radius];
  }

  calcDistance(X2, X1, Y2, Y1) {
    return ((X2 - X1) ** 2 + (Y2 - Y1) ** 2) ** (1 / 2);
  }
}
