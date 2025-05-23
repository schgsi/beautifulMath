let row = [0,0,0,1,1,0,1,0,1,0,0,1,0,0,1,1,1,1,1,0];
let cellW;
let cellH;
let offs = 0;

// const LOOKUP = {111:0, 110:1, 101:1, 100:0, 11:1, 10:1, 1:1, 000:0};
const LOOKUP = {111:1, 110:0, 101:1, 100:1, 11:0, 10:1, 1:1, 000:0}

function setup() {
    createCanvas(500,500);
    frameRate(20);
    row = generate1(100);
    cellW = width / row.length;
    cellH = cellW;
    background(255);
}

function getNormalisedIndex(index) {
    return (index + row.length) % row.length;
}

function generateRow(cells) {
    let genRow = [];
    for (let i = 0; i < cells; i++) {
        genRow[i] = floor(random(2));
    }
    return genRow;
}
function generate1(cells) {
    let genRow = [];
    for (let i = 0; i < cells; i++) {
        genRow[i] = 0;
    }
    genRow[floor(cells/2)] = 1;
    return genRow;
}

function getNextState(current) {
    let next = [];
    for (i = 0; i < current.length; i++) {
        let iLeft= getNormalisedIndex(i-1);
        let iRight = getNormalisedIndex(i+1);
        
        let value = (current[iLeft]*100) + (current[i] *10) + current[iRight];
        next[i] = LOOKUP[value];
        console.log(value)
    }
    console.log(next);
    return next;
}

function drawRow(state, yOffset) {
    for (let i = 0; i < state.length; i++) {
        const cell = state[i];
        if (cell == 1) {
            fill(0);
            // fill(i*5,offs/3,0);
            strokeWeight(0);
            rect(i*cellW,yOffset,cellW,cellH);
        }
        if (cell == 0) {
            fill(i*5,i*2,150+i);
            // fill(i*5,offs/3,0);
            strokeWeight(0);
            rect(i*cellW,yOffset,cellW,cellH);
        }
    }
}

function draw() {
    strokeWeight(0)
    drawRow(row,offs);
    row = getNextState(row);
    console.log(LOOKUP)
    offs+=cellH;
}

function keyPressed() {
    // this will download the first 2 seconds of the animation!
    if (key === 's') {
      saveGif('mySketch', 5);
    }
  }