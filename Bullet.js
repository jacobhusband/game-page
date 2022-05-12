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
    let midPoints = [];

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
      let midPointSet = [];
      if (degrees[i] == this.degree) {
        ctx.beginPath();
        ctx.moveTo(cornerPoints[i][0][0], cornerPoints[i][0][1]);
        ctx.lineTo(cornerPoints[i][1][0], cornerPoints[i][1][1]);
        ctx.lineTo(cornerPoints[i][2][0], cornerPoints[i][2][1]);
        ctx.lineTo(cornerPoints[i][3][0], cornerPoints[i][3][1]);
        ctx.closePath();
        ctx.fill();
        this.x += speeds[i][0];
        this.y += speeds[i][1];
        this.cornerNodes = [
          [cornerPoints[i][0][0], cornerPoints[i][0][1]],
          [cornerPoints[i][1][0], cornerPoints[i][1][1]],
          [cornerPoints[i][2][0], cornerPoints[i][2][1]],
          [cornerPoints[i][3][0], cornerPoints[i][3][1]],
        ];
        for (let j = -1; j < this.cornerNodes.length - 1; j++) {
          if (j == -1) {
            midPointSet.push([
              this.calcMidPoint(
                cornerPoints[i][this.cornerNodes.length - 1][0],
                cornerPoints[i][0][0],
                cornerPoints[i][this.cornerNodes.length - 1][1],
                cornerPoints[i][0][1]
              ),
            ]);
          } else {
            midPointSet.push([
              this.calcMidPoint(
                cornerPoints[i][j][0],
                cornerPoints[i][j + 1][0],
                cornerPoints[i][j][1],
                cornerPoints[i][j + 1][1]
              ),
            ]);
          }
        }
        midPointSet.forEach((point) => {
          this.cornerNodes.push(point);
        });
        i = degrees.length;
      }
    }
  }

  calcMidPoint(xNode1, xNode2, yNode1, yNode2) {
    let xNode = (xNode1 + xNode2) / 2;
    let yNode = (yNode1 + yNode2) / 2;
    return [xNode, yNode];
  }
}
