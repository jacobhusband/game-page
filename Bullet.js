export default class Bullet {
  constructor(
    x,
    y,
    speed,
    damage,
    degree,
    width,
    height,
    enemyController,
    heatSeek,
    heatSeekRange
  ) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.degree = degree;
    this.width = width;
    this.height = height;
    this.enemyController = enemyController;
    this.color = "red";
    this.cornerNodes = [];
    this.differenceX = 0;
    this.hp = 1;
    this.heatSeek = heatSeek;
    this.heatSeekRange = heatSeekRange;
    this.foundTarget = false;
    this.speeds = [
      [0, -this.speed],
      [this.speed, -this.speed],
      [this.speed, 0],
      [this.speed, this.speed],
      [0, this.speed],
      [-this.speed, this.speed],
      [-this.speed, 0],
      [-this.speed, -this.speed],
    ];
    this.degrees = [0, 45, 90, 135, 180, 225, 270, 315];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    let angle45Long = this.height * Math.cos(Math.PI / 4);
    let angle45Short = this.width * Math.cos(Math.PI / 4);

    let cornerPoints = [
      [
        [this.x, this.y - this.height],
        [this.x, this.y],
        [this.x + this.width, this.y],
        [this.x + this.width, this.y - this.height],
      ],
      [
        [this.x, this.y],
        [this.x + angle45Short, this.y + angle45Short],
        [
          this.x + angle45Long + angle45Short,
          this.y - angle45Long + angle45Short,
        ],
        [this.x + angle45Long, this.y - angle45Long],
      ],
      [
        [this.x, this.y],
        [this.x + this.height, this.y],
        [this.x + this.height, this.y + this.width],
        [this.x, this.y + this.width],
      ],
      [
        [this.x, this.y],
        [this.x - angle45Short, this.y + angle45Short],
        [
          this.x + angle45Long - angle45Short,
          this.y + angle45Long + angle45Short,
        ],
        [this.x + angle45Long, this.y + angle45Long],
      ],
      [
        [this.x, this.y],
        [this.x + this.width, this.y],
        [this.x + this.width, this.y + this.height],
        [this.x, this.y + this.height],
      ],
      [
        [this.x, this.y],
        [this.x + angle45Short, this.y + angle45Short],
        [
          this.x - angle45Long + angle45Short,
          this.y + angle45Long + angle45Short,
        ],
        [this.x - angle45Long, this.y + angle45Long],
      ],
      [
        [this.x - this.height, this.y],
        [this.x, this.y],
        [this.x, this.y + this.width],
        [this.x - this.height, this.y + this.width],
      ],
      [
        [this.x, this.y],
        [this.x - angle45Short, this.y + angle45Short],
        [
          this.x - angle45Long - angle45Short,
          this.y - angle45Long + angle45Short,
        ],
        [this.x - angle45Long, this.y - angle45Long],
      ],
    ];

    // Find index where angle of bullet matches rectangle corner node positions
    let i = this.degrees.indexOf(this.degree);
    // Save relevant corner points
    this.cornerNodes = [
      [cornerPoints[i][0][0], cornerPoints[i][0][1]],
      [cornerPoints[i][1][0], cornerPoints[i][1][1]],
      [cornerPoints[i][2][0], cornerPoints[i][2][1]],
      [cornerPoints[i][3][0], cornerPoints[i][3][1]],
    ];
    // Draw bullet
    this.drawBullet(
      ctx,
      this.cornerNodes[0][0],
      this.cornerNodes[0][1],
      this.cornerNodes[1][0],
      this.cornerNodes[1][1],
      this.cornerNodes[2][0],
      this.cornerNodes[2][1],
      this.cornerNodes[3][0],
      this.cornerNodes[3][1]
    );
    // Move bullet
    this.moveBullet(this.speeds[i], i);
    // Add bullet hit points
    this.cornerNodes = this.combineLists(
      this.cornerNodes,
      this.createMidpointsFromNodes(this.cornerNodes)
    );
  }

  calcMidPoint(xNode1, xNode2, yNode1, yNode2) {
    let xNode = (xNode1 + xNode2) / 2;
    let yNode = (yNode1 + yNode2) / 2;
    return [xNode, yNode];
  }

  drawBullet(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }

  moveBullet(displacement, index) {
    let unitVec, directionVec;
    if (!this.heatSeek) {
      this.x += displacement[0];
      this.y += displacement[1];
    } else {
      if (this.foundTarget === false) {
        for (let i = 0; i < this.enemyController.enemies.length; i++) {
          if (
            this.x - this.heatSeekRange < this.enemyController.enemies[i].x &&
            this.x + this.heatSeekRange > this.enemyController.enemies[i].x &&
            this.y - this.heatSeekRange < this.enemyController.enemies[i].y &&
            this.y + this.heatSeekRange > this.enemyController.enemies[i].y
          ) {
            this.foundTarget = true;
            this.enemy = this.enemyController.enemies[i];
          }
        }
        this.x += displacement[0];
        this.y += displacement[1];
      } else {
        unitVec = this.calcDirection(this.enemy.x, this.enemy.y);
        directionVec = unitVec.map((x) => x * this.speed);
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += directionVec[0];
        this.y += directionVec[1];
        this.oldDifferenceX = this.differenceX;
        this.differenceX = Math.abs(this.oldX - this.x);
        console.log(`${this.enemy.x}`);
        if (this.oldDifferenceX === this.differenceX) {
          console.log(`Stagnant`);
          this.hp = 0;
        }
      }
    }
  }

  // Points are lists like: points = [p1, p2, p3] with p* = [x*, y*]
  createMidpointsFromNodes(points) {
    let midPointSet = [];
    for (let j = -1; j < points.length - 1; j++) {
      // Midpoint between first and last points
      if (j == -1) {
        midPointSet.push(
          this.calcMidPoint(
            points[points.length - 1][0],
            points[0][0],
            points[points.length - 1][1],
            points[0][1]
          )
        );
        // Midpoint between rest of points
      } else {
        midPointSet.push(
          this.calcMidPoint(
            points[j][0],
            points[j + 1][0],
            points[j][1],
            points[j + 1][1]
          )
        );
      }
    }
    return midPointSet;
  }

  combineLists(listBegin, listEnd) {
    return listBegin.concat(listEnd);
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  calcDirection(pX, pY) {
    const xDir = pX - this.x;
    const yDir = pY - this.y;
    const magnitude = (xDir ** 2 + yDir ** 2) ** (1 / 2);
    const ux = xDir / magnitude;
    const uy = yDir / magnitude;
    return [ux, uy];
  }
}
