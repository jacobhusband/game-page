export default class Score {
  constructor(canvas, ctx, width) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.score = 0;
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "white";
    this.textAlign = "center";
    this.ctx.fillText(`Score: 0`, (this.width - 80) / 2, 30);
  }

  update() {
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, (this.width - 80) / 2, 30);
  }
}
