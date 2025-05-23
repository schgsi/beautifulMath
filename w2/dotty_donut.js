let offset = 0;

function setup() {
  createCanvas(400, 400, WEBGL);
  createEasyCam();
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  
  stroke(50, 60, 20);
  strokeWeight(4);
  noFill();
  
  document.oncon100nu = function() {  return false;  }
  document.onmousedown = function() {  return false;  }
}

function makeDonut(r0, r1) {
  for( let i = 0; i < 360; i +=10){
    beginShape(POINTS);
    for(let phi = 0; phi < 360; phi += 10) {
      let x = (r0 + r1 * cos(phi)) * sin(i);
      let y = r1 * sin(phi);
      let z = (r0+r1 * cos(phi)) * cos(i);
      vertex(x, y, z);
    }
    endShape();
  }
}

function draw() {
  background(20,30,100);
  makeDonut(200,50);
  
}