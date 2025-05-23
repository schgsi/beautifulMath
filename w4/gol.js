let state;
let cellSize;
let running = false;

const cellsW = 50;
const cellsH = 50;

function setup() {
    frameRate(3);
    createCanvas(500,500);
    cellSize = width / cellsW;
    state = createEmptyGrid();
}

function createEmptyGrid() {
    let grid = [];
    for (let i = 0; i < cellsH; i++) {
        grid[i] = [];
        for (let j = 0; j < cellsW; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

function drawGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if( cell == 1) {
                fill(0);
                rect(i*cellSize,j*cellSize,cellSize,cellSize);
            }
            if( cell == 0) {
                fill(255);
                rect(i*cellSize,j*cellSize,cellSize,cellSize);
            }
        }
        
    }
}

function simulate(current) {
    let next = [];
    for (let i = 0; i < current.length; i++) {
        const row = current[i];
        next[i] = [];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            let neighbors = getNeightbors(current,i,j);
            if (neighbors < 2 || neighbors > 3) {
                next[i][j] = 0;
            } else if (neighbors == 3) {
                next[i][j] = 1;
            } else {
                next[i][j] = cell;
            }
        }
        
    }
    return next;
}

function getNeightbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + cellsW) % cellsW;
            let row = (y + j + cellsH) % cellsH;

            sum += grid[col][row];
        }            
    }
    sum -= grid[x][y];
    return sum;
}

function draw() {
    if (running) {
        state = simulate(state);
    }
    drawGrid(state);
}

function keyPressed() {
    // this will download the first 4 seconds of the animation!
    if (key === 's') {
      saveGif('gol', 4);
    }

    if(key === 'l') {
        running = true;
    }
    if(key === 'n') {
        running = false;
    }
  }

function mousePressed() {
    if(mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)  return;
    let x = floor(mouseX/cellSize);
    let y = floor(mouseY/cellSize);

    state[x][y] = 1;
    console.log("pressed")
}