const width = 500;
const height = 700;


//mouseX mouseY find mouse position

function setup() {
  createCanvas(width, height);
  background(120,120,255);
  let black = color(0,0,0);
  let red = color(255,0,0);

  for (let i = 0; i < 700; i+=20) {
    circ(250,i,black);
    circ(250,i,red);
  }

  // for (let i = 0; i < 15; i++) {
  //   circ(0, 0, black);
  //   circ(500, 0, black);
  //   circ(0, 700, black);
  //   circ(500, 700, black);
  //   circ(250,350, black);
  // }
  // for (let j = 0; j < 15; j++) {
  //   circ(j*20,350,red);
    
  // }
  
  document.addEventListener("click", function(){mouseCirc()});

  updatePixels();
}

function mouseCirc(){
  let cx = 250;
  let cy = mouseY;
  let r  = 100;
  angleMode(DEGREES);

  for (let a = 0; a < 360; a+=0.5) {
    var x = r*cos(a) + cx;
    var y = r*sin(a) + cy;
    if(x < 0 || y < 0) continue;
    if(x > width || y > height) continue;
    set(x, y, 255);
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
  return Math.floor(Math.random() * (250-40) + 40);
}