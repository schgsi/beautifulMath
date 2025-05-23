let offset = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  createEasyCam();
  angleMode(DEGREES);
  //normalMaterial();
  colorMode(HSB, 360, 100, 100);

  
  fill(100,100,30);
  stroke(360, 0, 100);
  strokeWeight(0.3);
  
  document.oncon100nu = function() {  return false;  }
  document.onmousedown = function() {  return false;  }
}

function makeDonut2(r0, r1) {
  let adds = 0;
  let moves = 0;
  for (let i = 0; i < 500; i += 20) {    
    beginShape(TRIANGLE_STRIP);
    for(let phi = 0; phi < 380; phi += 20) {
      let x = (r0 + r1 * cos(phi)) * sin(i);
      let y = r1 * sin(phi);
      let z = (r0+r1 * cos(phi)) * cos(i);
      
      let x2 = ((r0+1) + (r1+2) * cos(phi+20)) * sin(i+20);
      let y2 = (r1+2) * sin(phi+20);
      let z2 = ((r0+1)+(r1+2) * cos(phi+20)) * cos(i+20);
      vertex(x, y+moves, z+adds);
      vertex(x2, y2+moves+5, z2+adds+2);
    }
    adds+=2;
    r0+=1;
    r1+=2;
    moves+=5;
    endShape(CLOSE);  
  }
}

function donutSnail(r0, r1, offs1, offs2, moving, adding, inc0, inc1) {
  let adds = 0;
  let moves = 0;
  for (let i = 0; i < (1000+offs1); i += offs1) {    
    beginShape(TRIANGLE_STRIP);
    for(let phi = 0; phi < (360+offs2); phi += offs2) {
      let x = (r0 + r1 * cos(phi)) * sin(i);
      let y = r1 * sin(phi);
      let z = (r0+r1 * cos(phi)) * cos(i);
      
      let x2 = ((r0+inc0) + (r1+inc1) * cos(phi+offs2)) * sin(i+offs1);
      let y2 = (r1+inc1) * sin(phi+offs2);
      let z2 = ((r0+inc0)+(r1+inc1) * cos(phi+offs2)) * cos(i+offs1);
      vertex(x, y+moves, z+adds);
      vertex(x2, y2+moves+moving, z2+adds+adding);
      fill(i/3,100,100);
    }
    adds+=adding;
    r0+=inc0;
    r1+=inc1;
    moves+=moving;
    endShape();  
  }
}

function draw() {
  background(280,10,0);
  //makeDonut2(10,0);
  //donutSnail(r0, r1, offs1, offs2, moving, adding, inc0, inc1)
  donutSnail(0,0, 20,20, 2.5,0, 0.8,0.8);
  donutSnail(0,0, 20,20, -1.5,0, -0.8,-0.8);
}
