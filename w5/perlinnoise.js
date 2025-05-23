let grid = [];
let gridWidth;
let gridHeight;
let cellSize = 50;

function setup() {
    createCanvas(600,600);
    angleMode(RADIANS);
    gridWidth = width / cellSize;
    gridHeight = height / cellSize;
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

function perlin2DOld(x, y) {
    let topL = grid[floor(x)][floor(y)];
    let topR = grid[floor(x) + 1][floor(y)];
    let botL = grid[floor(x)][floor(y) + 1];
    let botR = grid[floor(x) + 1][floor(y) + 1];
    let topLToP = createVector(x - floor(x), y - floor(y));
    let topRToP = topLToP.mult(- 1).add(createVector(1, 0));
    let botLToP = topLToP.mult(- 1).add(createVector(0, 1));
    let botRToP = botLToP.mult(- 1).add(createVector(1, 0));
    let dotProdTopL = topLToP.dot(topL);
    let dotProdTopR = topRToP.dot(topR);
    let dotProdBotL = botLToP.dot(botL);
    let dotProdBotR = botRToP.dot(botR);

    let localX = x - floor(x);
    let localY = y - floor(y);

    let top = lerpCosFunct(fade(localX), dotProdTopL, dotProdTopR);
    let bot = lerpCosFunct(fade(localX), dotProdBotL, dotProdBotR);
    return lerpCosFunct(fade(localY), top, bot);
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
    // loadPixels();
    background(0);
    for (let i = 0; i < width; i+=10) {
        for (let j = 0; j < height; j+=10) {
            let perl = perlin2D(i/cellSize,j/cellSize) * 0.5 + 0.5;
            const col = color((perl) * 255, i/3, j/3);
            fill(col)
            rect(i,j,perl*10);
        }     
    }
    // updatePixels();
}