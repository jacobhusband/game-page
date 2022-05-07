import Player from "./Player.js";
import BulletController from "./BulletController.js";

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let tickX = 145;
let tickY = 63;
let degree = 0;
const triangleWH = 10;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 550;
canvas.height = 600;

const bulletController = new BulletController(canvas);
const player = new Player(
  canvas.width / 2,
  canvas.height / 2,
  bulletController
);

function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
}

function setCommonStyle() {
  ctx.shadowColor = "#c14953";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);

// let bullet = {
//   x: tickX,
//   y: tickY,
//   dx: 0,
//   dy: 0,
// };

// let image = new Image();
// image.src = "./Sprites/Triangle.png";

// playButton.addEventListener("click", (event) => playGame(event));

// const playGame = function (event) {
//   // x: 145, y: 63 is the center of the screen
//   ctx.drawImage(image, 145, 63, 10, 10);
// };

// function drawRotation(degrees) {
//   let x = canvas.width / 2;
//   let y = canvas.height / 2;
//   let w = image.width / 30;
//   let h = image.height / 30;
//   let rads = (degrees * Math.PI) / 180;

//   ctx.translate(tickX, tickY);
//   ctx.rotate(rads);
//   ctx.drawImage(image, -w / 2, -h / 2, w, h);
//   ctx.rotate(-rads);
//   ctx.translate(-tickX, -tickY);
// }

// window.requestAnimationFrame(draw);
