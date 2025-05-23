// copied code to see what is possible

var circleXArray = [];
var circleYArray = [];
var cycloidXArray = [];
var cycloidYArray = [];
k = 50;
c = 700;

function setup() {
  createCanvas(c, c);
  noStroke();
  fill(0,0,0);
  for (i = 0; i < TWO_PI; i += TWO_PI / 690) {
    x = (c / 2) + cos(i) * k
    y = (c / 2) + sin(i) * k
    circle(x, y, 2)
    circleXArray.push(x);
    circleYArray.push(y);
  }
  cycloidR = 200
  for (tick = 0; tick < circleXArray.length; tick++) {
    radTick = (tick / circleXArray.length) * TWO_PI
    cycle = 10;
    x2 = circleXArray[tick] + cos(radTick * cycle) * cycloidR;
    y2 = circleYArray[tick] + sin(radTick * cycle) * cycloidR;
    cycloidXArray.push(x2);
    cycloidYArray.push(y2);
  }
}

function draw() {
  buzzMin = random(0, 20);
  // translate(-10, -40);
  background(0,0,200);
  fill(255,255,255);
  for (i = 0; i < cycloidXArray.length; i++) {
    offset = 0;
    // abs(random(c - cycloidYArray[i])) * 0.14
    if (offset < buzzMin) { offset = 1;
      // random(buzzMin, abs(random(c - cycloidYArray[i])) * 0.14) 
    }
    x3 = cycloidXArray[i]
    y3 = cycloidYArray[i]
    fill("0,0,"+255 - (((distance(x3, y3, c / 2, c / 2)) ** 2) / c));
    circle(x3, y3 + offset, 3, 3);
  }
}

function distance(x1, y1, x2, y2) {
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2);
}