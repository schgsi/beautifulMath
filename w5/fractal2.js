let vals = [];
let vals2 = [];
let vals3 = [];
let vals4 = [];

function setup() {
    createCanvas(800,800);
    // orbitControl();
    background(255);
    noLoop()
    noFill()

    // vals = getVals(0,800,20,20);
    // vals2 = getVals(0,800,50,100);
}

function lerpCosFunct(t, y0, y1) {
    t = 1/2 * (1 - cos(t*PI));
    let y = (1 - t) * y0 + t * y1;
    return y;
}


function getVals(start, end, stepSize, ) {
    let result = [];
    for (let i = start; i <= end; i+=stepSize) {
        result.push({x: i, y: random()*max});
    }
    return result;
}

function getLine(values) {
    let result = [];
    for (let i = 1; i < values.length; i++) {
        let p0 = values[i-1];
        let p1 = values[i];
        for (let j = p0.x; j < p1.x; j++) {
            let t = (j - p0.x) / (p1.x - p0.x);
            result.push({x:j, y:lerpCosFunct(t, p0.y, p1.y)});                                
        }
    }
    //console.log(result);
    return result;
}

function drawNoise(offset) {
    // beginShape();
    stroke(0)
    strokeWeight(0.1);
    for (let i = 0; i < noise1.length; i++) {
        circle(i, (noise1[i].y)+offset,2);
    }
    // endShape();
}

function draw() {
    background(255)
}

function getRandomOffs() {
    vals = getVals();
    let val = random()*8-4;
    // console.log(val);
    return val;
}

// ------------------unused--------------------