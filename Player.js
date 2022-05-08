export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.degree = 0;
    this.width = 25;
    this.height = 25;
    this.speed = 4;
    this.bulletWidth = 3;
    this.bulletHeight = 20;

    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  draw(ctx) {
    this.move();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "black";
    ctx.beginPath();

    // replace this with one function that calculates the center
    // and a second function that calculates the rotated triangle nodes
    if (this.degree == 0) {
      ctx.moveTo(this.x, this.y - 12.5);
      ctx.lineTo(this.x - 25, this.y + 12.5);
      ctx.lineTo(this.x + 25, this.y + 12.5);
      ctx.lineTo(this.x, this.y - 12.5);
    } else if (this.degree == 180) {
      ctx.moveTo(this.x, this.y + 12.5);
      ctx.lineTo(this.x - 25, this.y - 12.5);
      ctx.lineTo(this.x + 25, this.y - 12.5);
      ctx.lineTo(this.x, this.y + 12.5);
    } else if (this.degree == 90) {
      ctx.moveTo(this.x + 12.5, this.y);
      ctx.lineTo(this.x - 12.5, this.y + 25);
      ctx.lineTo(this.x - 12.5, this.y - 25);
      ctx.lineTo(this.x + 12.5, this.y);
    } else if (this.degree == 270) {
      ctx.moveTo(this.x - 12.5, this.y);
      ctx.lineTo(this.x + 12.5, this.y + 25);
      ctx.lineTo(this.x + 12.5, this.y - 25);
      ctx.lineTo(this.x - 12.5, this.y);
    } else if (this.degree == 45) {
      ctx.moveTo(this.x + 12.5, this.y - 12.5);
      ctx.lineTo(this.x - 22.85, this.y - 12.5);
      ctx.lineTo(this.x + 12.5, this.y + 22.85);
      ctx.lineTo(this.x + 12.5, this.y - 12.5);
    } else if (this.degree == 135) {
      ctx.moveTo(this.x + 12.5, this.y + 12.5);
      ctx.lineTo(this.x - 22.85, this.y + 12.5);
      ctx.lineTo(this.x + 12.5, this.y - 22.85);
      ctx.lineTo(this.x + 12.5, this.y + 12.5);
    } else if (this.degree == 225) {
      ctx.moveTo(this.x - 12.5, this.y + 12.5);
      ctx.lineTo(this.x + 22.85, this.y + 12.5);
      ctx.lineTo(this.x - 12.5, this.y - 22.85);
      ctx.lineTo(this.x - 12.5, this.y + 12.5);
    } else if (this.degree == 315) {
      ctx.moveTo(this.x - 12.5, this.y - 12.5);
      ctx.lineTo(this.x + 22.85, this.y - 12.5);
      ctx.lineTo(this.x - 12.5, this.y + 22.85);
      ctx.lineTo(this.x - 12.5, this.y - 12.5);
    }
    ctx.stroke();
    ctx.fill();
    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 8;
      const delay = 7;
      const damage = 1;
      let bulletX, bulletY = 0;
      let width = this.bulletWidth;
      let height = this.bulletHeight;
      let align = width*.707/2

      if (this.degree == 0) {
        bulletX = this.x - width/2;
        bulletY = this.y - 12.5;
      } else if (this.degree == 90) {
        bulletX = this.x + 12.5;
        bulletY = this.y - width/2;
      } else if (this.degree == 180) {
        bulletX = this.x - width/2;
        bulletY = this.y + 12.5;
      } else if (this.degree == 270) {
        bulletX = this.x - 12.5;
        bulletY = this.y - width/2;
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
        speed,
        damage,
        delay,
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
