let txt;
let myStrArr = [];
let words = {};
let probs = {};

let font = "fonts/FiraSansMedium.woff"; // opentype.js font object
let fSize // font size
let ms // text to write
let pts = [] // store path data
let pts2 = [] // store path data
let path

let width = 1000;
let height = 500;
let cx = width/2;
let cy = height/2;

function preload() {
    txt = loadStrings("theAlchemist.txt");
    font = loadFont('Futurafuturisblackc.otf');
}

function setup() {
    createCanvas(1000,500);
    dispSentence();
    noLoop();
    colorMode(HSB, 100);
}

function dispSentence() {
    fSize = 50
    textFont(font)
    textSize(fSize)
    msg2 = "can you still see clear?";
    pts2 = font.textToPoints(msg2, 0, 0, fSize, {
        sampleFactor: 0.4, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    })

}

function randomChar() {
    return randomString(1);
}

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;:.,!?#*&+%';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function getOffset() {
    return Math.floor(Math.random() * (250 + 250) - 250);
}

function letterQuads() {
    let x1;
    let y1;

    beginShape();
    for (let i = 0; i < 1000; i+=20) {
        let letter = randomChar();
        if (letter >= "a" && letter <= "z") {
            fill(1,0,i/5)
            text(letter, x1=800+getOffset(), y1=100+getOffset());
            noFill()
            stroke(1,0,10)
            vertex(x1,y1)
        }
        if (letter >= "A" && letter <= "Z") {
            fill(1,0,i/5)
            text(letter, x1=200+getOffset(), y1=400+getOffset());
            noFill()
            stroke(1,0,10)
            vertex(x1,y1)
        } 
        if (letter >= "0" && letter <= "9") {
            fill(1,0,i/5)
            text(letter, x1=200-getOffset(), y1=100+getOffset());
            noFill()
            stroke(1,0,10)
            vertex(x1,y1)
        } 
        if (letter < "0") {
            fill(1,0,i/5)
            text(letter, x1=800+getOffset(), y1=400+getOffset());
            noFill()
            stroke(1,0,10)
            vertex(x1,y1)
        }
    }
    endShape();
}

function sizeFromCenter() {
    let letter = randomChar();
    let x = getOffset(); 
    let y = getOffset();
    let size = cx/20 - x; 
    let col = cy/10 - y;

    textSize(size);
    fill(col,100,100);

    text(letter, cx-x, cy-y);
}

function draw() {
    background(0)
    textFont(font)
    stroke(255)
    strokeWeight(1)

    for (let i = 0; i < 100; i++) {
        sizeFromCenter();
    }

}

// -----------------------------------
// old draw
//
// push()
// translate(60, height*5/8)
// noFill()
// stroke(255)
// beginShape()
// for (let i = 0; i < pts2.length; i++) {
//     const p = pts2[i]
//     strokeWeight((i*0.01)+10);
//     stroke(i/10, 100, 100)
//     point(p.x, p.y);
// }
// for (let i = 0; i < pts2.length; i++) {
//     const p = pts2[i]
//     strokeWeight(2);
//     stroke(255)
//     vertex(p.x, p.y);
//     if (i % 25 === 0) {
//         vertex((p.x), (p.y)*-1);
//     }
// }
// endShape()
// pop()