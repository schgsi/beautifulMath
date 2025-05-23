// Felisha Leutwiler

// the gifts of alph
// Der heilige Fluss Alph fliesst ins Unbekannte. Die Elemente des Flusses, des fruchtbaren Bodens und der unbekannten Höhlen werden bei meinem "Kurzprojekt" vereint.
// Da ich während des Moduls unglaublich viel Spass an Perlin Noise hatte, wollte ich diesen auch hier wieder verwenden.
// Meine Idee war es die visuellen Elemente des Gedichts zu vereinen und in 3D darzustellen. 
// Dazu habe ich die Landschaft und den Fluss mit Perlin Noise, einerseits bewegend, wie auch still, umgesetzt und einige Bäume mit p5 Shapes kreiert.
// Der Fluss endet in meiner Darstellung in einer Art Höhle, die von der Form her auch an den "Stone Henge" erinnert, was das Heilige des Flusses symbolisch darstellen könnte.

//

let grid = [];          // array for grid
let gridWidth;          // defined in setup, width/cellsize
let gridHeight;         // defined in setup, height/cellsize
let cellSize = 100;     // how far apart vectors for the perlin noise are set
let offs = 0;           // for moving perlin noise, to use in draw function


function setup() {
    createCanvas(500,500,WEBGL); // for 3D space
    angleMode(RADIANS);
    gridWidth = width / cellSize;
    gridHeight = height / cellSize;
    frameRate(10);
    fillGrid();         // calls function to set vectors (here so the noise is not redefined again later)

    // for camera in 3D
    createEasyCam();
    document.oncontextmenu = function() {   return false;   }
    document.onmousedown = function()   {   return false;   }
    
}

// fills points of grid with random vectors
function fillGrid() {
    for (let i = 0; i <= gridWidth; i++) {
        grid[i] = [];
        for (let j = 0; j <= gridHeight; j++) {
            let angle = random() * 2 * PI;
            grid[i][j] = createVector(cos(angle),sin(angle));
        }    
    }
}

// perlin function that will calculate values for every pixel
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

// interpolation function
function lerpy(t, a, b) {
    return a + t * (b - a);
}

// fade function
function fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

// visually places perlin in 3D using offset so that it moves
function placeMovingPerlin(xOffs, yOffs, perlH, perlW) {
    translate(-(xOffs),-(yOffs),0);     //to center the 3D grid
    for (let i = 0; i < perlW; i+=5) {
        for (let j = 0; j < perlH; j+=5) {
            const perl = perlin2D(i/cellSize + offs,j/cellSize + (2*offs)) * 0.5 + 0.5;
            const col = color(0,0, 100+perl*200);
            fill(col);
            translate(i,j,100*perl*perl);       // to place in the right place of the grid (and lift to height)
            box(10,10,10);
            translate(-i,-j,-(100*perl*perl));  // to place back to "normal"
        }     
    }
    translate(xOffs,yOffs,0);     //to center the 3D grid
}

// visually places still perlin
function placeStillPerlin(xOffs, yOffs, perlH, perlW) {
    translate(-(xOffs),-(yOffs),0);     //to center the 3D grid
    for (let i = 0; i < perlW; i+=10) {
        for (let j = 0; j < perlH; j+=10) {
            const perl = perlin2D(i/cellSize,j/cellSize) * 0.5 + 0.5;
            const col = color(80,80+perl*255, 80);
            fill(col);
            translate(i,j,100*perl*perl);       // to place in the right place of the grid (and lift to height)
            box(10,10,80);
            translate(-i,-j,-(100*perl*perl));  // to place back to "normal"
        }     
    }
    translate(xOffs,yOffs,0);     //to center the 3D grid
}

// places 3D shapes for visual tree
function placeTree(x,y) {
    translate(x,y,100);

    fill(180,120,20);
    box(10,10,100);

    translate(0,0,90);
    fill(0,150,0)
    sphere(50);
    translate(0,0,-90);

    translate(-x,-y,-100);
}

// places 3D shapes for visual cave
function placeCave(x,y) {
    translate(x,y,100);
    fill(20,20,20); // dark box
    box(200,100,300);
    translate(200,50,0);
    fill(150,150,150); // lighter boxes
    box(200,100,300);
    translate(-400,0,0);
    box(200,100,300); 
    translate(200,0,200);
    box(500,100,100);
    translate(-x,-y-50,-100);
}

function draw() {
    translate(0,0,-400)
    rotateX(70)
    stroke(0)
    background(150,150,255);
    placeMovingPerlin(125, 250, 800, 200);
    placeStillPerlin(630, 250, 800, 500);
    placeStillPerlin(-80, 250, 800, 500);
    placeTree(-250,100);
    placeTree(200,0);
    placeTree(-300,300);
    placeTree(400,100);
    placeTree(125,-100);
    placeCave(-25,-300);
    // move same grid over framerate
    offs+=0.02;
}


//-----------function to save gifs and pngs------------

function keyPressed() {
    // when s is pressed, this will download a png of the frame
    if (key === 's') {
        save('perlin');
    }
    // when g is pressed, this will download a gif of the first 4 seconds of the animation
    if (key === 'g') {
      saveGif('perlin', 4);
    }
}