export default class EndGame {
  constructor(canvas, player, score) {
    this.canvas = canvas;
    this.score = score;
    this.player = player;
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const highscore = document.getElementById("highscore");
    const scoremodal = document.getElementById("round-score");
    this.updateScore(highscore, scoremodal);
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignContent = "center";
    span.onclick = function () {
      modal.style.display = "none";
      this.restartGame();
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        this.restartGame();
      }
    };
  }

  updateScore(highscore, scoremodal) {
    if (this.player.highscore < this.score.score) {
      this.player.highscore = this.score.score;
    }
    highscore.innerHTML = `Highscore: ${this.player.highscore}`;
    scoremodal.innerHTML = `Score: ${this.score.score}`;
  }

  restartGame() {
    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight / 2;
    this.score.score = 0;
  }
}
