export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.degree = 0;
    this.width = 25;
    this.height = 25;
    this.speed = 6;
    this.bulletWidth = 3;
    this.bulletHeight = 20;
    this.cash = 0;
    this.cornerNodes = [];
    this.bulletSpeed = 4;
    this.damage = 3;
    this.delay = 10;
    this.highscore = 0;
    this.roundScore = 0;

    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  draw(ctx) {
    this.move();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "black";
    ctx.beginPath();

    let degrees = [0, 45, 90, 135, 180, 225, 270, 315];
    let triangleNodes = [
      [
        [this.x, this.y - 12.5],
        [this.x - 25, this.y + 12.5],
        [this.x + 25, this.y + 12.5],
      ],
      [
        [this.x + 12.5, this.y - 12.5],
        [this.x - 22.85, this.y - 12.5],
        [this.x + 12.5, this.y + 22.85],
      ],
      [
        [this.x + 12.5, this.y],
        [this.x - 12.5, this.y + 25],
        [this.x - 12.5, this.y - 25],
      ],
      [
        [this.x + 12.5, this.y + 12.5],
        [this.x - 22.85, this.y + 12.5],
        [this.x + 12.5, this.y - 22.85],
      ],
      [
        [this.x, this.y + 12.5],
        [this.x - 25, this.y - 12.5],
        [this.x + 25, this.y - 12.5],
      ],
      [
        [this.x - 12.5, this.y + 12.5],
        [this.x + 22.85, this.y + 12.5],
        [this.x - 12.5, this.y - 22.85],
      ],
      [
        [this.x - 12.5, this.y],
        [this.x + 12.5, this.y + 25],
        [this.x + 12.5, this.y - 25],
      ],
      [
        [this.x - 12.5, this.y - 12.5],
        [this.x + 22.85, this.y - 12.5],
        [this.x - 12.5, this.y + 22.85],
      ],
    ];

    for (let i = 0; i < degrees.length; i++) {
      if (degrees[i] == this.degree) {
        ctx.moveTo(triangleNodes[i][0][0], triangleNodes[i][0][1]);
        ctx.lineTo(triangleNodes[i][1][0], triangleNodes[i][1][1]);
        ctx.lineTo(triangleNodes[i][2][0], triangleNodes[i][2][1]);
        ctx.closePath();
        this.cornerNodes = [
          [triangleNodes[i][0][0], triangleNodes[i][0][1]],
          [triangleNodes[i][1][0], triangleNodes[i][1][1]],
          [triangleNodes[i][2][0], triangleNodes[i][2][1]],
        ];
      }
    }

    ctx.stroke();
    ctx.fill();
    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      let bulletX,
        bulletY = 0;
      let width = this.bulletWidth;
      let height = this.bulletHeight;
      let align = (width * 0.707) / 2;

      if (this.degree == 0) {
        bulletX = this.x - width / 2;
        bulletY = this.y - 12.5;
      } else if (this.degree == 90) {
        bulletX = this.x + 12.5;
        bulletY = this.y - width / 2;
      } else if (this.degree == 180) {
        bulletX = this.x - width / 2;
        bulletY = this.y + 12.5;
      } else if (this.degree == 270) {
        bulletX = this.x - 12.5;
        bulletY = this.y - width / 2;
      } else if (this.degree == 45) {
        bulletX = this.x + 12.5 - align;
        bulletY = this.y - 12.5 - align;
      } else if (this.degree == 135) {
        bulletX = this.x + 12.5 + align;
        bulletY = this.y + 12.5 - align;
      } else if (this.degree == 225) {
        bulletX = this.x - 12.5 - align;
        bulletY = this.y + 12.5 - align;
      } else if (this.degree == 315) {
        bulletX = this.x - 12.5 + align;
        bulletY = this.y - 12.5 - align;
      }

      this.bulletController.shoot(
        bulletX,
        bulletY,
        this.bulletSpeed,
        this.damage,
        this.delay,
        this.degree,
        width,
        height
      );
    }
  }

  move() {
    if (this.rightPressed == true && this.upPressed == true) {
      this.x += this.speed;
      this.y -= this.speed;
      this.degree = 45;
    } else if (this.rightPressed == true && this.downPressed == true) {
      this.x += this.speed;
      this.y += this.speed;
      this.degree = 135;
    } else if (this.leftPressed == true && this.upPressed == true) {
      this.x -= this.speed;
      this.y -= this.speed;
      this.degree = 315;
    } else if (this.leftPressed == true && this.downPressed == true) {
      this.x -= this.speed;
      this.y += this.speed;
      this.degree = 225;
    } else if (this.leftPressed == true && this.rightPressed == true) {
      this.x += this.speed;
      this.degree = 0;
    } else if (this.upPressed == true && this.downPressed == true) {
      this.y -= this.speed;
      this.degree = 0;
    } else if (this.rightPressed == true) {
      this.x += this.speed;
      this.degree = 90;
    } else if (this.leftPressed == true) {
      this.x -= this.speed;
      this.degree = 270;
    } else if (this.upPressed == true) {
      this.y -= this.speed;
      this.degree = 0;
    } else if (this.downPressed == true) {
      this.y += this.speed;
      this.degree = 180;
    }
  }

  keyDownHandler = (event) => {
    if (event.keyCode == 68) {
      this.rightPressed = true;
    } else if (event.keyCode == 65) {
      this.leftPressed = true;
    }
    if (event.keyCode == 83) {
      this.downPressed = true;
    } else if (event.keyCode == 87) {
      this.upPressed = true;
    }
    if (event.keyCode == 32) {
      this.shootPressed = true;
    }
  };

  keyUpHandler = (event) => {
    if (event.keyCode == 68) {
      this.rightPressed = false;
    } else if (event.keyCode == 65) {
      this.leftPressed = false;
    }
    if (event.keyCode == 83) {
      this.downPressed = false;
    } else if (event.keyCode == 87) {
      this.upPressed = false;
    }
    if (event.keyCode == 32) {
      this.shootPressed = false;
    }
  };
}
