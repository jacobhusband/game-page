export default class Player {
  constructor(x, y, bulletController) {
    // Player position
    this.x = x;
    this.y = y;

    // Player scores
    this.highscore = 0;
    this.roundScore = 0;

    // Player character attributes
    this.width = 25;
    this.height = 25;
    this.playerSpeed = 6;
    this.cash = 0;
    this.heatSeek = false;

    // Player weapon attributes
    this.bulletWidth = 2;
    this.bulletHeight = 5;
    this.bulletSpeed = 4;
    this.bulletDamage = 3;
    this.fireRate = 10;

    // Player upgrade costs and counts
    this.bulletSpeedCurrentCost = 100;
    this.bulletDamageCurrentCost = 100;
    this.bulletWidthCurrentCost = 300;
    this.fireRateCurrentCost = 200;
    this.heatSeekCost = [500, 1000, 1500, 2000, 0];
    this.heatSeekRange = 25;
    this.bulletSpeedCount = 1;
    this.bulletDamageCount = 1;
    this.bulletWidthCount = 1;
    this.fireRateCount = 1;
    this.heatSeekCount = 0;
    this.heatSeekText = "OFF";

    // Bullet position, angle, hit box points
    this.bulletController = bulletController;
    this.cornerNodes = [];
    this.degree = 0;

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
        this.bulletDamage,
        this.fireRate,
        this.degree,
        width,
        height,
        this.heatSeek,
        this.heatSeekRange
      );
    }
  }

  move() {
    if (this.rightPressed == true && this.upPressed == true) {
      this.x += this.playerSpeed;
      this.y -= this.playerSpeed;
      this.degree = 45;
    } else if (this.rightPressed == true && this.downPressed == true) {
      this.x += this.playerSpeed;
      this.y += this.playerSpeed;
      this.degree = 135;
    } else if (this.leftPressed == true && this.upPressed == true) {
      this.x -= this.playerSpeed;
      this.y -= this.playerSpeed;
      this.degree = 315;
    } else if (this.leftPressed == true && this.downPressed == true) {
      this.x -= this.playerSpeed;
      this.y += this.playerSpeed;
      this.degree = 225;
    } else if (this.leftPressed == true && this.rightPressed == true) {
      this.x += this.playerSpeed;
      this.degree = 0;
    } else if (this.upPressed == true && this.downPressed == true) {
      this.y -= this.playerSpeed;
      this.degree = 0;
    } else if (this.rightPressed == true) {
      this.x += this.playerSpeed;
      this.degree = 90;
    } else if (this.leftPressed == true) {
      this.x -= this.playerSpeed;
      this.degree = 270;
    } else if (this.upPressed == true) {
      this.y -= this.playerSpeed;
      this.degree = 0;
    } else if (this.downPressed == true) {
      this.y += this.playerSpeed;
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
