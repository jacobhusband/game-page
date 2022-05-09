export default class CollisionDetector {
    constructor(canvas) {
        this.canvas = canvas;
    }

    detectCollision(ctx, bullets, enemies) {
        bullets.forEach((bullet) => {
            bullet.cornerNodes.forEach((node) => {
                enemies.forEach((enemy) => {
                    let d = ((node[0]-enemy.x)**2 + (node[1] - enemy.y)**2)**(1/2);
                    if (d <= enemy.radius) {
                        enemy.hp -= bullet.damage;
                        enemy.radius -= bullet.damage;
                        enemy.radius <= 0 ? enemy.radius = 0 : enemy.radius = enemy.radius;
                        bullet.hp -= 1;
                    }                    
                })
            })
        })
    }
}