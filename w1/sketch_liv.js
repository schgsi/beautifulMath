function setup() {
  createCanvas(450, 450);
  background(255, 255, 255);
  angleMode(DEGREES);
  const versch = 225;
  for (j = -600; j <= 450; j++) {
    radius = j;
    for (i = 0; i < 360; i++) {
      point(cos(i) * radius + versch, sin(i) * radius + versch);
      radius++;
    }
  }
}
function draw() {
  angleMode(RADIANS);
  let radius = 1;
  const versch = 225;
  let c = color(255, 255, 255);
  for (i = 0; i < 1230; i++) {
    let x = 0.05 * i * cos(i);
    let y = 0.05 * i * sin(i);
    set(x + versch, y + versch, c);
  }
  updatePixels();
  // line(x1, y1, x2, y2)
  line(225, 25, 425, 225); // top - right
  line(425, 225, 225, 425); // bottom - right
  line(225, 425, 25, 225); // bottom - left
  line(25, 225, 225, 25); // top - left
  stroke(255, 255, 255);
  strokeWeight(2);
}