let canvas = document.querySelector('#gamePlace');

let innerWidth = canvas.width = window.innerWidth;
let innerHeight = canvas.height = window.innerHeight - 6;
let ctx = canvas.getContext('2d');

let noOfTowers = 3;
let noOfDiscs = 3;
let discHeight = 20;
let discWidth = 35;
let towerHeight = 20;
let towerWidth = (noOfDiscs + 1) * discWidth + 40;

let isDragging = false;
let mouse = { x: undefined, y: undefined };
let movableDisc = undefined;
let tempX = undefined;
let tempY = undefined;
let ismovePerfect = false;
let previousTower = 0;

let towers = [];
let discs = [];
let discsInTowers = [[], [], []];

function rearrangeDiscs() {

    let tempDiscs = [];
    let tempdiscsInTower = [[], [], []];

    discsInTowers.forEach((towerdiscs, towerNo) => {
        const tempfactor = (towerNo !== 1) ? (towerNo - 1) * 40 : 0;
        towerdiscs.reverse().forEach((disc, discNo) => {
            const newdisc = new Disc((towerNo + 1) * (innerWidth / 4) + tempfactor,
                towers[towerNo].y - towerHeight / 2 - towerdiscs.length * discHeight + (discNo) * (discHeight + 3),
                disc.width, disc.height, color = disc.color);
            tempDiscs.push(newdisc);
            tempdiscsInTower[towerNo].push(newdisc);
        });
    });
    discs = tempDiscs;
    discsInTowers = [];
    tempdiscsInTower.forEach(tower => discsInTowers.push(tower.reverse()));
}


window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth;
    innerHeight = canvas.height = window.innerHeight - 6;

    towers = [];

    [...Array(noOfTowers).keys()].forEach(towerNo => {
        const tempfactor = (towerNo !== 1) ? (towerNo - 1) * 40 : 0;
        towers.push(new Tower((towerNo + 1) * (innerWidth / 4) + tempfactor, innerHeight - 30, towerWidth, towerHeight, 0));
    });

    rearrangeDiscs();
})

canvas.onmousemove = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if (isDragging && movableDisc) {
        movableDisc.x = e.x;
        movableDisc.y = e.y;
    }
};
canvas.onmousedown = (e) => {
    if (isDragging && movableDisc) {
        towers.every((tower, index) => {
            if ((movableDisc.x >= tower.x - 15 && movableDisc.x <= tower.x + 15) &&
                (movableDisc.y <= tower.y && movableDisc.y >= tower.y - tower.poleHeight)) {
                ismovePerfect = true;
                discsInTowers[previousTower] = discsInTowers[previousTower].slice(0, discsInTowers[previousTower].length - 1);
                discsInTowers[index].push(movableDisc);
                return false;
            }
            else
                return true;
        });

        if (!ismovePerfect) {
            movableDisc.x = tempX;
            movableDisc.y = tempY;
        }

        // rearrangeDiscs();
        movableDisc = undefined;
        ismovePerfect = false;
        tempX = undefined;
        tempY = undefined;
    }
    isDragging = !isDragging;
};


class Tower {
    constructor(X, Y, width, height, towerNo) {
        this.x = X;
        this.y = Y;
        this.width = width;
        this.height = height;
        this.poleHeight = 60 + noOfDiscs * discHeight;
        this.poleWidth = 10;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.rect(this.x - this.poleWidth / 2, this.y - this.poleHeight, this.poleWidth, this.poleHeight);
        ctx.fillStyle = "#f58b54";
        ctx.fill();
        ctx.closePath();
    }

}

class Disc {
    constructor(X, Y, width, height, color = "rgb(" + [Math.random() * 256, Math.random() * 256, Math.random() * 256] + ")") {
        this.x = X;
        this.y = Y;
        this.width = width;
        this.height = height;
        this.tempWidth = width;
        this.tempHeight = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x - this.width / 2, this.y, this.height / 2, 0, 2 * Math.PI);
        ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.arc(this.x + this.width / 2, this.y, this.height / 2, 2 * Math.PI, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(ctx) {
        discsInTowers.forEach((towerDiscs, towerNo) => {
            if (towerDiscs[towerDiscs.length - 1] === this) {

                let leftArc = { x: this.x - this.width / 2, y: this.y };
                let rightArc = { x: this.x + this.width / 2, y: this.y };

                let leftDist = Math.sqrt(Math.pow(mouse.x - leftArc.x, 2) + Math.pow(mouse.y - leftArc.y, 2));
                let rightDist = Math.sqrt(Math.pow(mouse.x - rightArc.x, 2) + Math.pow(mouse.y - rightArc.y, 2));

                if (((leftDist <= this.height / 2) || (rightDist <= this.height / 2)) ||
                    (mouse.x >= this.x - this.width / 2 && mouse.x <= this.x + this.width / 2) &&
                    (mouse.y >= this.y - this.height / 2 && mouse.y <= this.y + this.height / 2)) {
                    this.width = this.tempWidth + 10;
                    this.height = this.tempHeight + 10;

                    if (isDragging && movableDisc === undefined) {
                        movableDisc = this;
                        previousTower = towerNo;
                        tempX = this.x;
                        tempY = this.y;
                    }
                }
                else {
                    this.width = this.tempWidth;
                    this.height = this.tempHeight;
                    if (!isDragging) { movableDisc = undefined; };
                }
            }
        });
    }
}


[...Array(noOfTowers).keys()].forEach(towerNo => {
    const tempfactor = (towerNo !== 1) ? (towerNo - 1) * 40 : 0;
    towers.push(new Tower((towerNo + 1) * (innerWidth / 4) + tempfactor, innerHeight - 30, towerWidth, towerHeight, 0));
});


[...Array(noOfDiscs).keys()].reverse().forEach(discNo => {
    discs.push(new Disc(innerWidth / 4 - 40, towers[0].y - towerHeight / 2 - noOfDiscs * discHeight + (discNo) * (discHeight + 3), (discNo + 1) * discWidth, discHeight));
});

discsInTowers[0] = discs;

function game() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    towers.forEach(tower => tower.draw(ctx));
    discs.forEach(disc => {
        disc.draw(ctx);
        disc.update();
    });
    requestAnimationFrame(game);
}

game();