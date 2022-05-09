import Player from "./Player.js";
import BulletController from "./BulletController.js";
import EnemyController from "./EnemyController.js";
import CollisionDetector from "./CollisionDetector.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionDetector = new CollisionDetector(canvas);
const enemyController = new EnemyController(canvas);
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
  enemyController.draw(ctx, player.x, player.y);
  console.log(`Bullets: ${bulletController.bullets}`);
  collisionDetector.detectEnemyHit(
    ctx,
    bulletController.bullets,
    enemyController.enemies
  );
  bulletController.draw(ctx);
  player.draw(ctx);
  collisionDetector.detectPlayerHit(ctx, enemyController.enemies, player);
}

function setCommonStyle() {
  ctx.shadowColor = "#c14953";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
