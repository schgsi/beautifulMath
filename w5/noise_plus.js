let vals = [];
let vals2 = [];

function setup() {
    createCanvas(800,300)
    background(255);

    vals = getVals(0,800,50);
    vals2 = getVals(0,800,50);
}

function lerpFunct(t, y0, y1) {
    let y = (1 - t) * y0 + t * y1;
    return y;
}
function lerpCosFunct(t, y0, y1) {
    t = 1/2 * (1 - cos(t*PI));
    let y = (1 - t) * y0 + t * y1;
    return y;
}

function getVals(start, end, stepSize) {
    let result = [];
    for (let i = start; i <= end; i+=stepSize) {
        result.push({x: i, y: random(120 -20)+20});
    }
    return result;
}

function draw() {

    beginShape(LINES);
    // stroke(0)
    strokeWeight(1);
    for (let i = 1; i < vals.length; i++) {
        let p0 = vals[i-1];
        let p1 = vals[i];
        let q0 = vals2[i-1];
        let q1 = vals2[i];
        for (let j = p0.x; j < p1.x; j++) {
            stroke(j/10,i*10,40+j/8)
            let t = (j - p0.x) / (p1.x - p0.x);
            let t2 = (j - q0.x) / (q1.x - q0.x);
            vertex(0.5*j, 80+lerpCosFunct(t, p0.y, p1.y));            
            vertex(j, lerpCosFunct(t2, q0.y, q1.y));            
            // vertex(j, lerpFunct(t, p0.y, p1.y));            
        }
    }
    endShape();
}

// ------------------unused--------------------