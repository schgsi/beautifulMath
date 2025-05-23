const width = 700;
const height = 700;

function setup() {
  createCanvas(width, height);
  // background(0);
  background(255, 225, 255);


  
  for (let i = 0; i < 5; i++) {    
    logSpiral(350, 350, getRandomRLog(), 0.2);
  }
  arcSpiral(350, 350, 0.1);
  arcSpiral(350, 350, 0.101);
  arcSpiral(350, 350, 0.102);
  arcSpiral(350, 350, 0.103);
  arcSpiral(350, 350, 0.104);
  arcSpiral(350, 350, 0.105);

  document.addEventListener("click", function () { mouseCirc() });

  updatePixels();
}


function logSpiral(cx, cy, rad, exp) {
  for (let i = 0; i < 2000; i+=0.02) {
    let r = rad * Math.exp(exp*i);
    let x = r * Math.cos(i) + cx;
    let y = r * Math.sin(i) + cy;
    
    if(x < 0 || y < 0) continue;
    if(x > width || y >height) continue;
    
    set(x, y, 0);
  }
}

function arcSpiral(centerX, centerY, dis) {
  let cx = centerX;
  let cy = centerY;
  let r = dis;
  let red = color(255,0,255);
  angleMode(DEGREES);
  
  for (let a = 0; a < 2000; a+=2) {
    r = a * dis;
    var x = r * cos(a) + cx;
    var y = r * sin(a) + cy;
    
    set(x, y, red);
  }
}

function eliptical(centerX, centerY) {
  let cx = centerX;
  let cy = centerY;
  let r = getRandomR();
  let black = color(0);
  angleMode(DEGREES);

  for (let a = 0; a < 2000; a++) {
    var x = r * cos(a) *(a*0.01)+ cx;
    var y = r * sin(a) *(a*0.01)+ cy;
    if(x < 0 || y < 0) continue;
    if(x > width || y >height) continue;

    set(x, y, black);
  }
}
function eliptical2(centerX, centerY) {
  let cx = centerX;
  let cy = centerY;
  let r = getRandomR();
  let gray = color(randomGray());
  angleMode(DEGREES);

  for (let a = 0; a < 1000; a++) {
    var x = r * cos(a) + cx + a;
    var y = r * sin(a) + cy - a;
    // if(x < 0 || y < 0) continue;
    // if(x > width || y >height) continue;

    set(x, y, gray);
  }
}

// function eliptical3(centerX, centerY, dis) {
//   let cx = centerX;
//   let cy = centerY;
//   let r = dis;
//   let red = color(255);
//   angleMode(DEGREES);

//   for (let a = 0; a < 2000; a+=2) {
//     r = a * dis;
//     var x = r * cos(a) + cx;
//     var y = r * sin(a) + cy;

//     set(x, y, red);
//   }
// }

function getRandomR() {
  return Math.floor(Math.random() * (50 - 10) + 10);
}

function getRandomRLog() {
  return Math.random() * (3 -1) +1;
}
function getRandomRArc() {
  return Math.random() * (0.08 -0.03) +0.03;
}

function randomGray() {
  return Math.floor(Math.random() * (255 - 20) + 20);
}