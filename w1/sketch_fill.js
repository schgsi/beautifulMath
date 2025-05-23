const width = 700;
const height = 700;

function setup() {
  createCanvas(width, height);
  // background(0);
  background(250, 220, 250);
  fill(20,20,20);

  document.addEventListener("click", function(){mouseLine()});

  for (let i = 0; i < 10; i++) {
  }

  updatePixels();
}

function mouseLine() {
  let cx = 350;
  let cy = 350;
  let x = mouseX;
  let y = mouseY;
 
  line(cx, cy, x, y);
}