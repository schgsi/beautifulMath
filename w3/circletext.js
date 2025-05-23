let width = 1000;
let height = 500;

function preload() {
    txt = loadStrings("theAlchemist.txt");
    font = loadFont('Futurafuturisblackc.otf');
    font = loadFont('Futurafuturisblackc.otf');
}

function setup() {
    createCanvas(1000,500);
    noLoop();
    colorMode(HSB, 100);
}

function circleLetter(rad) {
    let cx = width/2;
    let cy = height/2;
    let r  = rad;
    textSize(rad/5)
    angleMode(DEGREES);
    
    for (let a = 0; a < 360; a+=10) {
        let letter = randomChar();
        var x = r*cos(a) + cx;
        var y = r*sin(a) + cy;
        fill(a/Math.PI,100,100);
        text(letter, x, y);
    }
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


function draw() {
    background(0)
    textFont('Franklin Gothic')

    circleLetter(200);
    circleLetter(150)
    circleLetter(100)
}