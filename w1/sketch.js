const width = 700;
const height = 700;

function setup() {
  createCanvas(width, height);
  // background(0);
  background(50, 20, 50);

  for (let i = 0; i < 10; i++) {
  }

  eliptical(350, 350, 200, 50, 9, 125);
  eliptical(350, 350, 200, 50, 9, 50);
  eliptical(350, 350, 200, 50, 9, 200);
  eliptical(350, 350, 100, 10, 9, 0);
  eliptical(350, 350, 300, 15, 9, 0);
  eliptical(350, 350, 18, 20, 18, 0);
  eliptical(350, 350, 18, 20, 18, 1);
  eliptical(350, 350, 18, 20, 18, 2);
  eliptical(350, 350, 70, 10, 300, 0);
  eliptical(350, 350, 70, 20, 300, 60);
  
  document.addEventListener("click", function () { mouseCirc() });

  updatePixels();
}

function eliptical(centerX, centerY, r_1, r_2, rat, offset) {
  let cx = centerX;
  let cy = centerY;
  let r = r_1;
  let r2 = r_2;
  let ratio = rat;
  let offs = offset;
  let black = color(255);
  angleMode(DEGREES);

  for (let a = 0; a < 360; a+=0.5) {
    var x = cx + r * cos(a+offs) + (r2) * cos(a*ratio);
    var y = cy + r * sin(a+offs) + (r2) * sin(a*ratio);

    set(x, y, black);
  }
}
function eliptical2(centerX, centerY, rat) {
  let cx = centerX;
  let cy = centerY;
  let r = getRandomR();
  let r2 = getRandomR();
  let ratio = rat;
  let black = color(0);
  angleMode(DEGREES);

  for (let a = 0; a < 360; a+=0.4) {
    var x = cx + r * cos(a) + (r2) *cos(a*ratio);
    var y = cy + r * sin(a) + (r2) *sin(a*ratio);

    set(x, y, black);
  }
}


function getRandomR() {
  return Math.floor(Math.random() * (150 - 120) + 120);
}

function randomGray() {
  return Math.floor(Math.random() * (255 - 20) + 20);
}

// function randomColor() {
//   var r = Math.random(255).toString();
//   var g = Math.random(255).toString();
//   var b = Math.random(255).toString();
//   var a = Math.random(255).toString();
//   return r, g, b;
// }