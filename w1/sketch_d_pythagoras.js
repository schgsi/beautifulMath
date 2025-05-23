var size = 800;
var margin = 50;
var rad = 350;

function setup() {
  var bck_col = color(0);
  var txt_col = color(255, 204, 0);
  var px_col = color(255);

  // put setup code here
  createCanvas(size, size);
  background(bck_col);
  
  var mid_point = createVector(width/2, height/2);
  
  let x=0;
  let y=0;
  
  for(y=-rad;y<=rad;y++)
  {

    let x = sqrt(sq(rad)-sq(y));
    
    set(x+mid_point.x,y+mid_point.y, px_col);
    set(-x+mid_point.x,y+mid_point.y, px_col);
    
  }
  
  updatePixels();

}