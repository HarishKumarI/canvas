
let mouse = {
    x: undefined,
    y: undefined
}
let mouseRadius = 50;

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth;
    innerHeight = canvas.height = window.innerHeight - 6;
    init();
})



let colors = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "##2980B9"];

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // this.color = "rgb("+ [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]+ ")";
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {

        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0)
            this.dx = - this.dx;

        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0)
            this.dy = - this.dy;

        // interact

        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + mouseRadius) {
            this.dx = -this.dx;
            this.dy = -this.dy;
            if (distance - this.radius <= mouseRadius) {
                this.x = (this.x < mouse.x) ? this.x - this.radius / 4 : this.x + this.radius / 4;
                this.y = (this.y < mouse.y) ? this.y - this.radius / 4 : this.y + this.radius / 4;
            }
            else {
                this.x = (this.x < mouse.x) ? this.x - 1 : this.x + 1;
                this.y = (this.y < mouse.y) ? this.y - 1 : this.y + 1;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) this.x += 2 * mouse.x;
        if (this.y < 0) this.y += 2 * mouse.y;
        if (this.x > innerWidth) this.x -= 2 * mouse.x;
        if (this.y > innerHeight) this.y -= 2 * mouse.y;
    }

}

let circles = [];

function init() {
    circles = [];
    for (let i in [...Array(2000)]) {
        let radius = Math.random() * 30 + 0.5;
        circles.push(new Circle(Math.random() * (innerWidth - radius * 2) + radius,
            Math.random() * (innerHeight - 2 * radius) + radius,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            radius));
    }

}
init();

const mouseArcColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    // mouse circle
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouseRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgb(" + mouseArcColor + ")";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();


    circles.forEach(circle => {
        circle.draw();
        circle.update();
    });
}


animate();