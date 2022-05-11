export default class EndGame {
  constructor(canvas, player, score, collisionDetector, enemyController) {
    this.canvas = canvas;
    this.score = score;
    this.player = player;
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const highscore = document.getElementById("highscore");
    const scoremodal = document.getElementById("round-score");
    const playerCash = document.getElementById("cash");
    this.updateScore(highscore, scoremodal, playerCash);

    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignContent = "center";

    span.onclick = function () {
      modal.style.display = "none";
      enemyController.enemies = [];
      scoremodal.innerHTML = "0";
      collisionDetector.value = 0;
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        enemyController.enemies = [];
        scoremodal.innerHTML = "0";
        collisionDetector.value = 0;
      }
    };
  }

  updateScore(highscore, scoremodal, playerCash) {
    if (this.player.highscore < this.score.score) {
      this.player.highscore = this.score.score;
    }
    highscore.innerHTML = `${this.player.highscore}`;
    scoremodal.innerHTML = `${this.score.score}`;
    playerCash.innerHTML = `$${this.player.cash}`;
    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight / 2;
    this.score.score = 0;
  }

  restartGame() {
    modal.style.display = "none";
    enemyController.enemies = [];
    scoremodal.innerHTML = "0";
    collisionDetector.value = 0;
  }
}
