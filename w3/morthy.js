let grotesk;
let x, y;
let firstLetter = [];
let secondLetter = [];
let fontSize = 350;

function preload() {
  grotesk = loadFont('AnonymousPro-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);

  x = width / 2 - 120;
  y = height / 2 + 120;

  textFont(grotesk);
  firstLetter = grotesk.textToPoints('A', x, y, fontSize, 
  {
    sampleFactor: 0.1
  });
  secondLetter = grotesk.textToPoints('V', x, y, fontSize, {
    sampleFactor: 0.113
  });

  print(firstLetter.length, secondLetter.length); // prints 168, 168
}

function letterMorph() {
    let speed=1;
    beginShape();
    for (let i = 0; i < firstLetter.length; i++) {
  
      vertex(firstLetter[i].x, firstLetter[i].y);
  
      if (firstLetter[i].x <= secondLetter[i].x) {
        firstLetter[i].x += speed;
      }
  
      if (firstLetter[i].x >= secondLetter[i].x) {
        firstLetter[i].x -= speed;
      }
  
      if (firstLetter[i].y <= secondLetter[i].y) {
        firstLetter[i].y += speed;
      }
  
      if (firstLetter[i].y >= secondLetter[i].y) {
        firstLetter[i].y -= speed;
      }
    }
    endShape(CLOSE);
}


function draw() {
    letterMorph();
}