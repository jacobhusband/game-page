export default class EndGame {
  constructor(
    canvas,
    player,
    score,
    collisionDetector,
    enemyController,
    bulletController
  ) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const highscore = document.getElementById("highscore");
    const scoremodal = document.getElementById("round-score");
    const playerCash = document.getElementById("cash");

    const increaseBulletSpeed = document.getElementById("increaseBulletSpeed");
    const decreaseBulletSpeed = document.getElementById("decreaseBulletSpeed");
    const bulletSpeed = document.getElementById("bullet-speed");
    const bulletSpeedCost = document.getElementById("bullet-speed-cost");

    const increaseBulletDamage = document.getElementById(
      "increaseBulletDamage"
    );
    const decreaseBulletDamage = document.getElementById(
      "decreaseBulletDamage"
    );
    const bulletDamage = document.getElementById("bullet-damage");
    const bulletDamageCost = document.getElementById("bullet-damage-cost");

    const increaseBulletWidth = document.getElementById("increaseBulletWidth");
    const decreaseBulletWidth = document.getElementById("decreaseBulletWidth");
    const bulletWidth = document.getElementById("bullet-width");
    const bulletWidthCost = document.getElementById("bullet-width-cost");

    const increaseFireRate = document.getElementById("increaseBulletFireRate");
    const decreaseFireRate = document.getElementById("decreaseBulletFireRate");
    const fireRate = document.getElementById("bullet-firerate");
    const fireRateCost = document.getElementById("bullet-firerate-cost");

    this.canvas = canvas;
    this.score = score;
    this.player = player;
    this.enemyController = enemyController;
    this.bulletController = bulletController;
    this.updateModal(
      highscore,
      scoremodal,
      playerCash,
      bulletSpeedCost,
      bulletSpeed,
      bulletDamageCost,
      bulletDamage,
      bulletWidthCost,
      bulletWidth,
      fireRateCost,
      fireRate
    );
    this.showModal(modal);
    this.resetPlayerPosition();
    this.resetEnemySpawnRate();
    this.resetScore();

    span.onclick = function () {
      modal.style.display = "none";
      enemyController.enemies = [];
      bulletController.bullets = [];
      scoremodal.innerHTML = "0";
      collisionDetector.value = 0;
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        enemyController.enemies = [];
        bulletController.bullets = [];
        scoremodal.innerHTML = "0";
        collisionDetector.value = 0;
      }
    };

    increaseBulletSpeed.onclick = function () {
      if (player.cash >= player.bulletSpeedCurrentCost) {
        player.bulletSpeed += 1;
        player.cash -= player.bulletSpeedCurrentCost;
        player.bulletSpeedCurrentCost =
          player.bulletSpeedCurrentCost * (player.bulletSpeedCount + 1);
        bulletSpeedCost.innerHTML = `COST: ${player.bulletSpeedCurrentCost}`;
        bulletSpeed.innerHTML = `${player.bulletSpeed}`;
        highscore.innerHTML = `${player.highscore}`;
        playerCash.innerHTML = `$${player.cash}`;
      }
    };

    increaseBulletDamage.onclick = function () {
      if (player.cash >= player.bulletDamageCurrentCost) {
        player.bulletDamage += 1;
        player.cash -= player.bulletDamageCurrentCost;
        player.bulletDamageCurrentCost =
          player.bulletDamageCurrentCost * (player.bulletDamageCount + 1);
        bulletDamageCost.innerHTML = `COST: ${player.bulletDamageCurrentCost}`;
        bulletDamage.innerHTML = `${player.bulletDamage}`;
        highscore.innerHTML = `${player.highscore}`;
        playerCash.innerHTML = `$${player.cash}`;
      }
    };

    increaseFireRate.onclick = function () {
      if (player.cash >= player.fireRateCurrentCost) {
        player.fireRate -= 1;
        player.cash -= player.fireRateCurrentCost;
        player.fireRateCurrentCost =
          player.fireRateCurrentCost * (player.fireRateCount + 1);
        fireRateCost.innerHTML = `COST: ${player.fireRateCurrentCost}`;
        fireRate.innerHTML = `${10 - player.fireRate}`;
        highscore.innerHTML = `${player.highscore}`;
        playerCash.innerHTML = `$${player.cash}`;
      }
    };

    increaseBulletWidth.onclick = function () {
      if (player.cash >= player.bulletWidthCurrentCost) {
        player.bulletWidth += 1;
        player.cash -= player.bulletWidthCurrentCost;
        player.bulletWidthCurrentCost =
          player.bulletWidthCurrentCost * (player.bulletWidthCount + 1);
        bulletWidthCost.innerHTML = `COST: ${player.bulletWidthCurrentCost}`;
        bulletWidth.innerHTML = `${player.bulletWidth}`;
        highscore.innerHTML = `${player.highscore}`;
        playerCash.innerHTML = `$${player.cash}`;
      }
    };
  }

  showModal(modal) {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignContent = "center";
  }

  updateModal(
    highscore,
    scoremodal,
    playerCash,
    bulletSpeedCost,
    bulletSpeed,
    bulletDamageCost,
    bulletDamage,
    bulletWidthCost,
    bulletWidth,
    fireRateCost,
    fireRate
  ) {
    if (this.player.highscore < this.score.score) {
      this.player.highscore = this.score.score;
    }
    bulletSpeedCost.innerHTML = `COST: ${this.player.bulletSpeedCurrentCost}`;
    bulletSpeed.innerHTML = `${this.player.bulletSpeed}`;
    bulletDamageCost.innerHTML = `COST: ${this.player.bulletDamageCurrentCost}`;
    bulletDamage.innerHTML = `${this.player.bulletDamage}`;
    bulletWidthCost.innerHTML = `COST: ${this.player.bulletWidthCurrentCost}`;
    bulletWidth.innerHTML = `${this.player.bulletWidth}`;
    fireRateCost.innerHTML = `COST: ${this.player.fireRateCurrentCost}`;
    fireRate.innerHTML = `${10 - this.player.fireRate}`;
    highscore.innerHTML = `${this.player.highscore}`;
    scoremodal.innerHTML = `${this.score.score}`;
    playerCash.innerHTML = `$${this.player.cash}`;
  }

  resetPlayerPosition() {
    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight / 2;
  }

  resetScore() {
    this.score.score = 0;
  }

  resetEnemySpawnRate() {
    this.enemyController.enemySpawnRate = 100;
  }
}
