let grid = [];
let gridWidth;
let gridHeight;
let cellSize = 200;
let offs=0;

function setup() {
    createCanvas(600,600,WEBGL);
    createEasyCam();
    // colorMode(HSB,100)
    document.oncontextmenu = function() {
        return false;
    }
    
    document.onmousedown = function() {
        return false;
    }
    
    angleMode(RADIANS);
    gridWidth = width / cellSize;
    gridHeight = height / cellSize;
    frameRate(10);
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

    let topL = grid[x0][y0].dot(createVector(locX, locY));
    let topR = grid[x1][y0].dot(createVector(locX - 1, locY));
    
    let botL = grid[x0][y1].dot(createVector(locX, locY - 1));    
    let botR = grid[x1][y1].dot(createVector(locX - 1, locY - 1));    

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
    fillGrid();
    translate(-300,-300,-150);
    // orbitControl();
    background(0);
    beginShape();
    for (let i = 0; i < width; i+=10) {
        for (let j = 0; j < height; j+=10) {
            const perl = perlin2D(i/cellSize,j/cellSize) * 0.5 + 0.5;
            const col = color(perl*255, i/3, j/3);
            // const col = color(perl*120, 100, 100);    for hsb
            fill(col);
            stroke(col);
            strokeWeight(perl*perl*perl*10);
            translate(0,0, 80*perl)
            circle(i,j,perl*10);
            translate(0,0,-(80*perl))
        }     
    }
    endShape();
}

function keyPressed() {
    // this will download the first 4 seconds of the animation!
    if (key === 's') {
      save('perlin');
    }
    if (key === 'g') {
      saveGif('perlin', 4);
    }
}