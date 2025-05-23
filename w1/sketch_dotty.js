const width = 500;
const height = 500;


//mouseX mouseY find mouse position

function setup() {
  createCanvas(width, height);
}

function randomDots() {
  for (let i = 0; i < 100; i++) {
    set(randomNum(), randomNum(),randomColor());   
  }
}
function randomDotsPlus() {
  for (let i = 0; i < 100; i++) {
    let x = randomNum();
    let y = randomNum();
    if (x/y < 1) {
      set(x,y,randomGray());   
    }else if (x/y >=1) {
      set(x,y,randomColor()); 
    }else{
      continue;
    }
  }
}

function circ(centerX, centerY, strokeCol) {
  let cx = centerX;
  let cy = centerY;
  let r  = getRandomR();
  // let black = color(0);
  angleMode(DEGREES);
  
  for (let a = 0; a < 2000; a++) {
    offset = Math.floor(Math.random() * (50+30) - 30);
    offset2 = Math.floor(Math.random() * (50-30) + 30);
    var x = (r)*cos(a) + cx;
    var y = (r)*sin(a) + cy;
    var x2 = (r+offset)*cos(a) + cx;
    var y2 = (r-offset2)*sin(a) + cy;
    if(x < 0 || y < 0) continue;
    if(x > width || y >height) continue;

    set(x, y, 255);
    set(x2, y2, 255);
  }
}

function randomGray() {
  return Math.floor(Math.random() * (255-50)+50);
}
function randomColor() {
  return [randomGray(), 0, randomGray(), 255];
}

function randomNum() {
  return Math.floor(Math.random() * (480-20)+20);
}

function getRandomR(){
  return Math.floor(Math.random() * (50-40) + 40);
}

function draw() {
  background(0);
  let black = color(0,0,0);
  let red = color(255,0,0);
  
  for (let i = 0; i < 5; i++) {
    randomDotsPlus();
  }

  // circ(100,100,randomColor())
  
  updatePixels();
}