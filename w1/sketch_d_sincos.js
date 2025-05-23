var size_can = 800;
var margin = 50;

function setup() {
  let px_col = color(255);
  let bk_col = color(0)
  let rad = 50;

  createCanvas(size_can, size_can);
  background(bk_col);

  let mid_point = createVector(width/2,height/2);


  for (let a=0; a<=360; a++)
  {
      let x = rad*sin(radians(a))+mid_point.x;
      let y = rad*cos(radians(a))+mid_point.y;
      set(x,y,px_col);
  }
  updatePixels();
}