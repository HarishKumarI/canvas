window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth;
    innerHeight = canvas.height = window.innerHeight;
})

let gravity = 2;
let friction = 0.9;

let colors = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "##2980B9"];


class Ball {
    constructor(X, Y, radius) {
        this.x = X;
        this.y = Y;
        this.radius = radius;
        this.dy = 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }

    update() {

        if (this.y + this.radius + this.dy + friction + 1 > innerHeight) {
            this.dy = - this.dy * friction;
        }
        else {
            this.dy += gravity;
        }

        this.y += this.dy;
    }

}


let balls = [];

function init() {
    balls = [];
    for (let i in [...Array(500)]) {
        let radius = Math.random() * 30 + 2.5;
        balls.push(new Ball(
            Math.random() * (innerWidth - 2 * radius) + radius,
            Math.random() * (innerHeight - 2 * radius) + radius,
            radius));
    }

}
init();

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    balls.forEach(ball => {
        ball.update();
        ball.draw(ctx);
    });
    requestAnimationFrame(animate);
}

animate();