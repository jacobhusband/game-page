export default class EndGame {
  constructor(canvas, enemies, score) {
    this.canvas = canvas;
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignContent = "center";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    score.score = 0;
  }
}
