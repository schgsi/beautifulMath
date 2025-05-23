// useless fcking bitch 
let W = 20;
const L = 80; 
let F = 0.8;
const S = [0,0];

let a; // aktueller winkel
let d; // aktuelle länge
let p;// aktuelle position
let M = []; // array
let k; // speicherindex

let axiom = "F";
// let rule = "-F++F-";
// let rule = "|[---F][+++F]|[--F][++F]|F"
// let ruleF = "[+F][+G--G----F]"
// let ruleG = "-G++G-"
// let rule = "|[+F]|[-F]+F"
// let rule = "FF+[+F-F-F]-[-F+F+F]"
let rule = "|[+F]|[-F]+F"


// could use charAt()

function setup() {
    createCanvas(600,600);
    angleMode(DEGREES);

    d = L;
    k = 0;

    for (let i = 0; i < 8; i++) {      
        // axiom = axiom.replace(/G/g, ruleG);
        // axiom = axiom.replace(/F/g, ruleF);
        axiom = axiom.replace(/F/g, rule);
    }
    
    noLoop();
}


function applyRules() {
    let chars = axiom.split('');
    
    for(let i = 0; i < chars.length; i++) {
        // W = W+random(0,3);
        let sym = chars[i];

        switch (sym) {
            case "F":
                // drawLine(pX, pY, d);
                // stroke(200-i/1000,i/900,i%12*200)
                

                line(0,0,d,0)
                translate(d,0);
                break;
            case "G":
                // drawLine(pX, pY, d);
                // line(0,0,d,0)
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
                d = d*F;  
                line(0,0,d,0);
                translate(d,0);
                break;
        }
        // W = 20;
    }
}

function draw() {
    background(0)
    translate(300, 400)
    stroke(200)
    console.log(axiom)
    rotate(270)
    // stroke(255)

    applyRules()
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