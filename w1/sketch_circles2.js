const width = 700;
const height = 700;
let locX = 100;
let locY = 100;


//mouseX mouseY find mouse position

function setup() {
  createCanvas(width, height);
  // circ(200,150,255);
  // updatePixels();
}

function drawLine(x1, y1, x2, y2, col) {
  stroke(col);
  line(x1,y1,x2,y2);
}

function mouseCirc(){
  let cx = mouseX;
  let cy = mouseY;
  let r  = 100;
  angleMode(DEGREES);

  for (let a = 0; a < 360; a+=2) {
    var x = r*cos(a) + cx;
    var y = r*sin(a) + cy;
    if(x < 0 || y < 0) continue;
    if(x > width || y > height) continue;
    set(x, y, red);
  }
  updatePixels();
}

function circ(centerX, centerY, strokeCol) {
  let cx = centerX;
  let cy = centerY;
  let r  = getRandomR();
  // let black = color(0);
  angleMode(DEGREES);

  for (let a = 0; a < 360; a++) {
    var x = r*cos(a) + cx;
    var y = r*sin(a) + cy;
    if(x < 0 || y < 0) continue;
    if(x > width || y >height) continue;

    set(x, y, strokeCol);
  }
}

function getRandomR(){
  return Math.floor(Math.random() * (150-60) + 60);
}

function draw() {
  background(200,100,255);
  let black = color(0,0,0);
  let red = color(255,0,0);
  angleMode(DEGREES);
  
    fill(100,50,125);
    stroke(100,50,125);
    rect(0,350,700,350,0,0,0,0);
  
  for (let i = 0; i < 200; i+=20) {    
    drawLine(100,100,200,300+i,255);
  }

  fill(255);
  stroke(255);
  circle(0+locX,350+locY,100);

  locY++;
  locX++;

  if (locX >= 100) {
    locX++;
  }
  if (locY > 800) {
    locY = -100;
  }

}