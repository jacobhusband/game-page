export default class Bullet {
  constructor(x, y, speed, damage, degree, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.degree = degree;
    this.width = width;
    this.height = height;
    this.color = "red";
    this.cornerNodes = [];
    this.hp = 1;
    this.heatSeek = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    let short = this.width;
    let long = this.height;
    let angle45Long = long * Math.cos(Math.PI / 4);
    let angle45Short = short * Math.cos(Math.PI / 4);
    let speeds = [];
    let cornerPoints = [];
    let degrees = [];

    degrees = [0, 45, 90, 135, 180, 225, 270, 315];
    speeds = [
      [0, -this.speed],
      [this.speed, -this.speed],
      [this.speed, 0],
      [this.speed, this.speed],
      [0, this.speed],
      [-this.speed, this.speed],
      [-this.speed, 0],
      [-this.speed, -this.speed],
    ];
    cornerPoints = [
      [
        [this.x, this.y - long],
        [this.x, this.y],
        [this.x + short, this.y],
        [this.x + short, this.y - long],
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
        [this.x + long, this.y],
        [this.x + long, this.y + short],
        [this.x, this.y + short],
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
        [this.x + short, this.y],
        [this.x + short, this.y + long],
        [this.x, this.y + long],
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
        [this.x - long, this.y],
        [this.x, this.y],
        [this.x, this.y + short],
        [this.x - long, this.y + short],
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

    for (let i = 0; i < degrees.length; i++) {
      // Find bullet angle
      if (degrees[i] == this.degree) {
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
        this.moveBullet(speeds, i);
        // Add bullet hit points
        this.cornerNodes = this.combineLists(
          this.cornerNodes,
          this.createMidpointsFromNodes(this.cornerNodes)
        );
        i = degrees.length;
      }
    }
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

  moveBullet(speeds, i) {
    this.x += speeds[i][0];
    this.y += speeds[i][1];
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
}
