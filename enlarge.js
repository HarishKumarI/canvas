let canvas = document.querySelector('canvas');

let innerWidth = canvas.width = window.innerWidth ;
let innerHeight = canvas.height = window.innerHeight - 6;

let ctx = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth ;
    innerHeight = canvas.height = window.innerHeight - 6;

    init();
})

let colors = ["#f79b65", "#595959", "#dbdbdb","#627c85"];

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
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

        this.x += this.dx;
        this.y += this.dy;

        //interact
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40)   // maximum radius
                this.radius += 1;
        }
        else if (this.radius > 5)   // minimum radius
            this.radius -= 1;

    }

}

let circles = [];

function init() {
    circles = [];
    for (let i in [...Array(1000)]) {
        let radius = Math.random() * 3 + 0.5;
        circles.push(new Circle(Math.random() * (innerWidth - radius * 2) + radius,
            Math.random() * (innerHeight - 2 * radius) + radius,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            radius));
    }

}
init();

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    circles.forEach(circle => {
        circle.draw();
        circle.update();
    });
}


animate();