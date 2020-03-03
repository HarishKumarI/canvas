window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth;
    innerHeight = canvas.height = window.innerHeight;

    init();
})


let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(X, Y, radius) {
        this.x = X;
        this.y = Y;
        this.radius = radius;
        this.velocity = 0.05;
        this.radians = Math.random() * Math.PI * 2;
        this.distFromCenter = Math.random() * 70 + 50;
        this.lastPoint = { x: undefined, y: undefined };
        this.lastMouse = { x: X, y: Y };
        this.color = "rgb(" + [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)] + ")";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.radians += this.velocity;
        this.lastPoint = { x: this.x, y: this.y };

        //Drag Effect 
        this.lastMouse.x += (mouse.x- this.lastMouse.x)*0.05;
        this.lastMouse.y += (mouse.y- this.lastMouse.y)*0.05;

        // Circular Motion
        this.x = mouse.x + Math.cos(this.radians) * this.distFromCenter;
        this.y = mouse.y + Math.sin(this.radians) * this.distFromCenter;
    }
}

let particles = [];

function init() {
    particles = [];
    for (let i in [...Array(100)]) {
        let radius = Math.random() * 2 + 2;
        particles.push(new Particle(
            canvas.width / 2, canvas.height / 2, radius));
    }

}
init();

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach(particle => {
        particle.draw(ctx);
        particle.update();
    });

}

animate();
