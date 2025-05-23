function setup() {
    createCanvas(400, 400,WEBGL);
    //normalMaterial();
    createEasyCam();
  
    angleMode(DEGREES);
    
    document.oncontextmenu = function() {  return false;  }
    document.onmousedown = function() {  return false;  }
  }
  
  function triangleZyl(r, cenX, cenY, zBottom, h) {
    let z1 = zBottom; 
    let z2 = zBottom + h;
    var x;
    var y;
    
    beginShape(TRIANGLE_STRIP)
    for(let i = 0; i < 360 ; i+=20) {
      x = r*cos(i) + cenX;
      y = r*sin(i) + cenY;
      vertex(x,y,z1);
      vertex(x,y,z2);
    }
    x = r+cenX;
    y = cenY;
    vertex(x,y,z1);
    vertex(x,y,z2);
    endShape();
  }
  
  function spiraly2(cenX, cenY, rad, h, expo) {
    noFill();
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < 500; i+=20) {
      let r = rad * exp(expo*i);
      let x = r*cos(i) + cenX;
      let y = r*sin(i) + cenY;
      vertex(x,y,r+h);
      vertex(x,y,r+10-h);
    }
    endShape();
  }
  
  function circ(cenX,cenY,r, rot) {
    noFill();
    beginShape(POINTS);
    for (let i = 0; i < 360; i+=20) {
      let x = r*cos(i) + cenX;
      let y = r*sin(i) + cenY;
      rotateX(rot);
      point(x,y,0);
    }
    endShape();
  }
  
  function donut(cenX, cenY, r1, r2) {
    for(let i = 0; i < 360; i+=30) {
      beginShape(POINTS);
      let x = r1*cos(i) + cenX;
      let y = r1*sin(i) + cenY;
      point(x,y,0);        
      endShape();
      
      circ(y,x, r2,r2);
    }
  }
  
  
  function draw() {
    background(255,100,255);
      
    donut(0,0,100,20);
    
    //triangleZyl(100,0,0, 50,100);  
    //spiraly2(0,0,2,10,0.005);
    //circ(0,0,100);
  }