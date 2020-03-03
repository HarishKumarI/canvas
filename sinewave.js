const dat = require('dat.gui')
const gui = new dat.GUI({hideable : true})

const wave = {
    y: innerHeight / 2,
    length: -0.004,
    amplitude: 106,
    frequency: 0.774
}

const strokeColor = {
    h: 0,
    s: 50,
    l: 50
}

const fillColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}

const WaveFolder = gui.addFolder('wave')
WaveFolder.add(wave, 'y', 0, innerHeight)
WaveFolder.add(wave, 'length', -0.01, 0.01)
WaveFolder.add(wave, 'amplitude', -300, 300)
WaveFolder.add(wave, 'frequency', -0.01, 1)

const StrokeFolder = gui.addFolder('stroke')
StrokeFolder.add(strokeColor, 'h', 0, 255)
StrokeFolder.add(strokeColor, 's', 0, 100)
StrokeFolder.add(strokeColor, 'l', 0, 100)

const FillFolder = gui.addFolder('fill')
FillFolder.add(fillColor, 'r', 0, 255)
FillFolder.add(fillColor, 'g', 0, 255)
FillFolder.add(fillColor, 'b', 0, 255)
FillFolder.add(fillColor, 'a', 0, 1)

let increment = wave.frequency

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = `rgba(${fillColor.r},${fillColor.g},${fillColor.b},${fillColor.a})`
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    ctx.beginPath()
    ctx.moveTo(0, innerHeight / 2)
    for (let i = 0; i < innerWidth; i++) {
        ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) *
            wave.amplitude /i* 100)
    }

    ctx.strokeStyle = `hsl(${strokeColor.h},${strokeColor.s}%,${strokeColor.l}%)`
    ctx.stroke()
    ctx.closePath()
    increment += wave.frequency
    strokeColor.h = Math.random()*255
    strokeColor.s = Math.random()*100
}

animate()