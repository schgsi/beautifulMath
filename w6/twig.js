// useless fcking bitch 
let W = 30;
const L = 80; 
let F = 0.7;
const S = [0,0];

let a; // aktueller winkel
let d; // aktuelle länge
let p;// aktuelle position
let M = []; // array
let k; // speicherindex

let axiom = "F";
let rule = "|[-F][+F]"


// could use charAt()

function setup() {
    createCanvas(500,500);
    angleMode(DEGREES);

    d = L;
    a = 0;
    pX = S[0];
    pY = S[1];
    k = 0;

    for (let i = 0; i < 10; i++) {      
        axiom = axiom.replace(/F/g, rule);
    }
    noLoop();
}

function drawLine(startX,startY, len) {
    let endX = startX + (cos(a)*len);
    let endY = startY + (sin(a)*len);
    console.log(d)
    line(startX,startY,endX,endY);
    pX = endX;
    pY = endY; 
}

function applyRules() {
    let chars = axiom.split('');
    
    for(let i = 0; i < chars.length; i++) {
        // W = W+random(0,3);
        let sym = chars[i];

        switch (sym) {
            case "F":
                // drawLine(pX, pY, d);
                line(0,0,d,0)
                translate(d,0);
                break;
            case "-":
                rotate(-W);
                              
                break;
            case "+":
                rotate(W);
                
                break;
            case "[":
                push();
                k++
                M[k] = d;
                break;
            case "]":
                pop();
                d = M[k];
                k--
                break;
            case "|":
                // drawLine(pX, pY, d);
                line(0,0,d,0);
                translate(d,0);
                d = d*F;  
                break;
        }
        // W = 20;
    }
}

function draw() {
    background(0)
    translate(200, 100)
    
    console.log(axiom)
    d = L;
    // rotate(270)
    for (let i = 0; i < 12; i++) { 
        d = L;
        // F = random(0.3,0.7);
        stroke(random(50,255),random(50,255),random(50,255))  
        applyRules();
        rotate(30) 
    }
    // W = W+1;
}

function keyPressed() {
    // this will download the first 4 seconds of the animation!
    if (key === 's') {
      save('lsys');
    }
    if (key === 'g') {
      saveGif('lsys', 4);
    }
}