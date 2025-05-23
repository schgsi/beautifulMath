let angle = 0;
let length = 10;
let direction = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(angle);

  let step = direction % 4;

  switch (step) {
    case 0:
      line(0, 0, length, 0);
      translate(length, 0);
      break;
    case 1:
      line(0, 0, 0, -length);
      translate(0, -length);
      break;
    case 2:
      line(0, 0, -length, 0);
      translate(-length, 0);
      break;
    case 3:
      line(0, 0, 0, length);
      translate(0, length);
      break;
  }

  angle += radians(90);
  length *= sqrt(2);
  direction++;
}