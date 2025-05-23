var SizeCanvas = 800;

function setup() {
  let BkCol = color("black");
  let PxCol = color("white");
  let PxWeight = 1;

  createCanvas(SizeCanvas, SizeCanvas);
  background(BkCol);

  let MidPoint = createVector(width / 2, height / 2);

  var Radius = 350;
  var Step = 1;

  stroke(PxCol);
  strokeWeight(PxWeight);

  let x = Radius;
  let y = 0;

  while (x > y) {
    paintQuadrants(MidPoint, x, y);
    paintQuadrants(MidPoint, y, -x);
    y += Step;

    // middle pixel
    let PxMidX = x - Step / 2;

    Test = sq(PxMidX) + sq(y) - sq(Radius);
    if (Test > 0) {
      x = x - Step;
    }
  }
}

function paintQuadrants(MidPoint, x, y) {
  point(MidPoint.x + x, MidPoint.y + y);
  point(MidPoint.x - x, MidPoint.y - y);
  point(MidPoint.x + y, MidPoint.y + x);
  point(MidPoint.x - y, MidPoint.y - x);
}