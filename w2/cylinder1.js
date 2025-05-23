function setup() {
    createCanvas(400, 400,WEBGL);
    //normalMaterial();
    createEasyCam();
  
    angleMode(DEGREES);
    
      document.oncontextmenu = function() {
      return false;
    }
    
    document.onmousedown = function() {
      return false;
    }
  }
  
  
  function triangleStrip(offs){
    let offset = offs;
    
    beginShape(TRIANGLE_STRIP);
    vertex(100,100,0);
    vertex(110,120,0);
    vertex(120,100,0);
    vertex(130,120,0);
    vertex(140,100,0);
    vertex(150,100,0);
    endShape();
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
  
  function spiraly(cenX, cenY, rad, h, expo) {
    
    beginShape(POINTS);
    for (let i = 0; i < 1000; i+=10) {
      let r = rad * exp(expo*i);
      let x = r*cos(i) + cenX;
      let y = r*sin(i) + cenY;
      point(x,y,r);
      point(x,y,r);
    }
    endShape();
  }
  
  
  
  function draw() {
    background(220);
      
    triangleZyl(100,0,0, 50,100);  
    spiraly(0,0,1,10,0.008);
  }