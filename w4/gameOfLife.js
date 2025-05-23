let grid = [];
let cols;
let rows;
let resolution = 2;


function setup() {
    createCanvas(700,700);
    cols = width / resolution;
    rows = height / resolution;
    colorMode(HSB, 100);
    // frameRate(10);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    // createRandomShape();
    createRandomSymmetricalShape();
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);         
    }
    return arr;
}

function createGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i* resolution;
            let y = j* resolution;
            if (grid[i][j] == 1) {
                // for gradient in grid
                fill (50+j/8,20+i/8,100);
                strokeWeight(0)
                // stroke(20+j/8,20+i/8,100);
                rect(x,y,resolution,resolution);
            }
        }
    }
}

function draw() {
    background(65,100,15);
    
    createGrid();

    let next = make2DArray(cols, rows);    
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // neighbours 
            let sum = 0;
            let neighbors = countNeightbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

// ---------------side functions-------------------

function countNeightbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            
            sum += grid[col][row];
        }            
    }
    sum -= grid[x][y];
    return sum;
}

function createRandomSymmetricalShape() {
  for (let i = 0; i < 2500; i++) {
    let x = Math.floor(Math.random() * 155) + 20; // Random x coordinate between 100 and 300
    let y = Math.floor(Math.random() * 155) + 20; // Random y coordinate between 100 and 300
    grid[x][y] = 1;
    grid[x][rows-y] = 1;
    grid[cols-x][y] = 1;
    grid[cols-x][rows-y] = 1;
  }
}
function createRandomShape() {
  for (let i = 0; i < 10000; i++) {
    let x = Math.floor(Math.random() * cols); // Random x coordinate between 100 and 300
    let y = Math.floor(Math.random() * rows); // Random y coordinate between 100 and 300
    
    grid[x][y] = 1;
  }
}

function keyPressed() {
  // this will download the first 2 seconds of the animation!
    if (key === 'g') {
        saveGif('mySketch', 2);
    }

    if (key === 's') {
        save('gol');
    }

    if (key === 'v') {
        saveFrames('out', 'png', 1, 25, data => {
            print(data);});
    }

    if (key === "t") {
        if(mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)  {
            return;
        } else {
            let x = floor(mouseX/resolution);
            let y = floor(mouseY/resolution);
            createGlider(x, y);
        }
    }
}

function changeLoop() {
    if (isLooping()) {
        noLoop();
        return;
    }
    if (!isLooping()) {
        loop();
        return;
    }
}

//-----------unused functions-------------

function createGOL() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2))
        }
    }
}

function createGOL2() {
    for (let i = cols/2; i < cols; i++) {
        for (let j = cols/2; j < rows; j++) {
            grid[i][j] = floor(random(2))
        }
    }
}

// ----------random shapes to generate-----------g

function createGlider (x,y) {
    grid[x+0][y+1] = 1;
    grid[x+2][y+0] = 1;
    grid[x+2][y+1] = 1;
    grid[x+2][y+2] = 1;
    grid[x+1][y+2] = 1;
}

function createSmiley(x, y) {
    // Face
    grid[x - 2][y - 2] = 1;
    grid[x - 2][y + 2] = 1;
    grid[x + 2][y - 2] = 1;
    grid[x + 2][y + 2] = 1;
  
    // Eyes
    grid[x - 1][y - 1] = 1;
    grid[x - 1][y + 1] = 1;
    grid[x + 1][y - 1] = 1;
    grid[x + 1][y + 1] = 1;
  
    // Smile
    grid[x - 2][y] = 1;
    grid[x - 1][y - 1] = 1;
    grid[x - 1][y + 1] = 1;
    grid[x][y - 1] = 1;
    grid[x][y + 1] = 1;
    grid[x + 1][y - 1] = 1;
    grid[x + 1][y + 1] = 1;
    grid[x + 2][y] = 1;
  }


function createFlower(x, y) {
    // Inner petals
    grid[x][y - 2] = 1;
    grid[x][y - 1] = 1;
    grid[x][y] = 1;
    grid[x][y + 1] = 1;
    grid[x][y + 2] = 1;

    // Outer petals
    grid[x - 1][y - 2] = 1;
    grid[x - 1][y - 1] = 1;
    grid[x - 1][y] = 1;
    grid[x - 1][y + 1] = 1;
    grid[x - 1][y + 2] = 1;
    grid[x + 1][y - 2] = 1;
    grid[x + 1][y - 1] = 1;
    grid[x + 1][y] = 1;
    grid[x + 1][y + 1] = 1;
    grid[x + 1][y + 2] = 1;

    // Central petals
    grid[x - 2][y] = 1;
    grid[x + 2][y] = 1;
    grid[x - 1][y - 1] = 1;
    grid[x - 1][y + 1] = 1;
    grid[x + 1][y - 1] = 1;
    grid[x + 1][y + 1] = 1;

    // Leaves
    grid[x - 2][y - 2] = 1;
    grid[x - 2][y + 2] = 1;
    grid[x + 2][y - 2] = 1;
    grid[x + 2][y + 2] = 1;
}