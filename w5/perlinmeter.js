// https://www.deconbatch.com/2021/08/tips-perlin-parameter.html

const w = 600;
const h = 600;
const wDiv = 600;
const hDiv = 600;
const nStep = 0.01;

function setup() {
  createCanvas(w, h);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
}

function draw() {

  let cellW = w / wDiv;
  let cellH = h / hDiv;
  let baseHue = random(360);

  background(0, 0, 0, 100);
  noStroke();

  for (let x = 0; x < w; x += cellW) {
    let nX = x * nStep;
    for (let y = 0; y < h; y += cellH) {
      let nY = y * nStep;

      let d = dist(x, y, w * 0.8, h * 0.8);
      let dx = cos(PI * d / w) * w;
      let dy = sin(PI * d / h) * h;
      let nP = dist(x, y, dx, dy) * nStep * 4;

      let nValH = noise(10 + nP, nX, nY);
      let nValS = noise(30 + nP, nX, nY);
      let nValB = noise(40 + nP, nX, nY);
      let nHue = (baseHue + nValH * 240) % 360;
      let nSat = 30 + 60 * nValS;
      let nBri = 20 + 80 * nValB;

      fill(nHue, nSat, nBri, 100);
      rect(x, y, cellW, cellH);
    }
  }

}

function mouseClicked() {
  let dt = new Date();
  noiseSeed(dt.getTime());
  redraw();
}