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
    this.heatSeek = true;
    this.directionFound = false;
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

    // Find index where angle of bullet matches rectangle corner node positions
    let i = degrees.indexOf(this.degree);
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
    this.moveBullet(this.speeds[i], ctx, i);
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

  moveBullet(displacement, ctx, i) {
    if (!this.heatSeek) {
      this.x += displacement[0];
      this.y += displacement[1];
    } else if (this.heatSeek == true && this.directionFound == false) {
      let radius = 300;
      let step = 10;
      let point;
      let unitvec;
      let points = this.getPointsAroundLocation(radius, step);
      point = this.findColor(ctx, points, 255, 255, 255);
      if (point !== undefined) {
        unitvec = this.calcDirection(point[0], point[1]);
        console.log(`point: ${point}`);
        this.speeds[i][0] = unitvec[0] * this.speed;
        this.speeds[i][1] = unitvec[1] * this.speed;
        this.x += displacement[0];
        this.y += displacement[1];
        this.directionFound = true;
      } else {
        this.x += displacement[0];
        this.y += displacement[1];
      }
    } else {
      console.log();
      this.x += displacement[0];
      this.y += displacement[1];
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

  getPointsAroundLocation(radius, step) {
    let points = [];
    let x, y;
    for (let i = 0; i <= 360; i += step) {
      x = radius * Math.cos(this.toRadians(i));
      y = radius * Math.sin(this.toRadians(i));
      x += this.x;
      y += this.y;
      points.push([x, y]);
    }
    return points;
  }

  findColor(ctx, points, r, g, b) {
    let pixel;
    for (let i = 0; i < points.length; i++) {
      pixel = ctx.getImageData(points[i][0], points[i][1], 1, 1).data;
      if (pixel[0] >= r - 10 && pixel[1] >= g - 10 && pixel[2] >= b - 10) {
        // console.log(`pixel: ${pixel}, item 1: ${item[0]}, item 2: ${item[1]}`);
        return [points[i][0], points[i][1]];
      } else {
        return undefined;
      }
    }
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
