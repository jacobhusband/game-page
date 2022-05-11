export default class Score {
  constructor(canvas, ctx, width) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.score = 0;
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 30);
    this.ctx.font = "30px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: 0`, this.width / 2, 60);
  }

  update(score = this.score) {
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Score: ${score}`, this.width / 2, 60);
  }
}
