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

// does not really work
function lerpSmoothStepFunct(x, min, max) {
    let t = Math.max(0, Math.min(1, (x-min) / (max - min)));
    let y = (6*Math.pow(t,5)) - (15*Math.pow(t,4)) + (10*Math.pow(t,3));
    t = t*t*(3-2*t); 
    return y;
}

function getVals(start, end, stepSize, max) {
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
            // result.push({x:j, y:lerpCosFunct(t, p0.y, p1.y)});                                
        }
    }
    //console.log(result);
    return result;
}

function drawNoise4(offset) {
    let noise1 = getLine(vals);
    let noise2 = getLine(vals2);
    let noise3 = getLine(vals3);
    let noise4 = getLine(vals4);
    beginShape();
    stroke(0)
    strokeWeight(0.2);
    for (let i = 0; i < noise1.length; i++) {
        vertex(i, (noise1[i].y + noise2[i].y +noise3[i].y + noise4[i].y)+offset);
    }
    endShape();
}
function drawNoise1(offset) {
    let noise1 = getLine(vals);
    beginShape();
    stroke(0)
    strokeWeight(0.3);
    for (let i = 0; i < noise1.length; i++) {
        vertex(i, (noise1[i].y)+offset);
    }
    endShape();
}

function draw() {
    // for(let i=-100 ; i< 800; i++){
        vals = getVals(0,800,5,10);
        vals2 = getVals(0,800,200,300);
        vals3 = getVals(0,800,100,120);
        vals4 = getVals(0,800,20,60);
    //     drawNoise4(i);
    // }

    for (let i = 0.2; i < 800; i+=i*0.1) {
        drawNoise4(i)
    }

}

function getRandomOffs() {
    let val = random()*8-4;
    // console.log(val);
    return val;
}

// ------------------unused--------------------