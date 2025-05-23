// 3d perlin printing text

let grid = [];
let gridWidth;
let gridHeight;
let cellSize = 80;
let offs = 0;
let font;


function setup() {
    font = loadFont('Futurafuturisblackc.otf');
    createCanvas(800,800,WEBGL);
    createEasyCam();
    normalMaterial();
    // colorMode(HSB,100)
    document.oncontextmenu = function() {
        return false;
    }
    
    document.onmousedown = function() {
        return false;
    }
    
    angleMode(RADIANS);
    gridWidth = (width / cellSize)*2;
    gridHeight = height / cellSize;
    frameRate(8);
    fillGrid();
    
}

function fillGrid() {
    for (let i = 0; i <= gridWidth; i++) {
        grid[i] = [];
        for (let j = 0; j <= gridHeight; j++) {
            let angle = random() * 2 * PI;
            grid[i][j] = createVector(cos(angle),sin(angle));
        }    
    }
    // console.log(grid)
}

function perlin2D(x, y) {
    let x0 = floor(x);
    let x1 = x0 + 1;
    let y0 = floor(y);
    let y1 = y0 + 1;
    
    let locX = x - x0;
    let locY = y - y0;

    let topL = grid[x0 % gridWidth][y0 % gridHeight].dot(createVector(locX, locY));
    let topR = grid[x1 % gridWidth][y0 % gridHeight].dot(createVector(locX - 1, locY));
    
    let botL = grid[x0 % gridWidth][y1 % gridHeight].dot(createVector(locX, locY - 1));    
    let botR = grid[x1 % gridWidth][y1 % gridHeight].dot(createVector(locX - 1, locY - 1));    

    let top = lerpy(fade(locX), topL, topR);
    let bot = lerpy(fade(locX), botL, botR);

    return lerpy(fade(locY), top, bot);
}

function lerpy(t, a, b) {
    return a + t * (b - a);
}

function fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

function draw() {
    textFont(font)
    // fillGrid();
    translate(-400,-400,-200);
    // orbitControl();
    background(255);
    // pointLight(250, 0, 250, 100, 100, 50);
    beginShape();
    for (let i = 0; i < width; i+=10) {
        for (let j = 0; j < height; j+=10) {
            translate(i,j,0);
            const perl = perlin2D(i/cellSize + offs,j/cellSize + (2*offs)) * 0.5 + 0.5;
            const col = color(perl*255, i/PI, j/PI);
            // const col = color(perl*120, 100, 100);    for hsb
            fill(col);
            // fill(perl*1000 % j,perl*1000 % i,i*j%800); --> funny
            // stroke(0);
            // strokeWeight(2);
            translate(0,0, 100*perl*perl)
            // sphere(perl*10);
            textSize(perl*20)
            text(randomChar(perl), i/3, j/3);
            // box(perl*30, perl*30, perl*80);
            translate(0,0,-(100*perl*perl))
            translate(-i,-j,0);
        }     
    }
    endShape();
    // move same grid over framerate
    // offs+=0.1;
}

// --------------------------------

function keyPressed() {
    // this will download the first 4 seconds of the animation!
    if (key === 's') {
      save('perlin');
    }
    if (key === 'g') {
      saveGif('perlin', 4);
    }
}

function randomChar(num) {
    console.log(num)
    return randomString(1, num);
}

function randomString(len, perl) {
    let charSet;
    if (perl >= 0.5) {
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } 
    if (perl < 0.5){
        charSet = 'abcdefghijklmnopqrstuvwxyz';
    }
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}