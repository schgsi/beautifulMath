let font = "fonts/FiraSansMedium.woff"; // opentype.js font object
let fSize = 20;// font size
let msg// text to write
let pts = [] // store path data
let path

function preload() {
    font = loadFont('Futurafuturisblackc.otf')
}

function setup() {
    createCanvas(1000, 500)
    
    fSize = 200
    textFont(font)
    textSize(fSize)
    msg = 'its crazy'
    pts = font.textToPoints(msg, 0, 0, fSize, {
        sampleFactor: 0.2, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    })
    console.log(pts) // { x, y, path angle }

    stroke(255)
    strokeWeight(2)
    noFill();
}

function draw() {
    background(0)

    const d = 10 + tan(frameCount/50.) * 50
    const angle = frameCount/100.

    push()
    translate(60, height*5/8)

    for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        push()
        translate(p.x, p.y)
        rotate(angle)
        line(-d, -d, +d, +d)
        pop()
    }
    pop()
}