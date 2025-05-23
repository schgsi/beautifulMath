let txt;
let myStrArr = [];
let words = {};
let probs = {};
let cx = 500;
let cy = 250;

//let font = "fonts/FiraSansMedium.woff"; // opentype.js font object
let fSize // font size
let ms // text to write
let pts = [] // store path data
let pts2 = [] // store path data
let path

function preload() {
    // txt = loadStrings("theSunIsAlsoAStar.txt");
    txt = loadStrings("theAlchemist.txt");
    // font = loadFont('Futurafuturisblackc.otf');
    font = loadFont('fonts/AnonymousPro-Regular.ttf');
}

function setup() {
    createCanvas(1000,800);
    getWords();
    analyseWords();
    getProbs();

    colorMode(HSB, 100);
    frameRate(12)
    
    fSize = 30
    textFont(font)
    textSize(fSize)
    msg = generateScentense('they', 10);
    console.log(msg)
    pts = font.textToPoints(msg, 0, -100, fSize, {
        sampleFactor: 0.4, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    })
    //console.log(pts) // { x, y, path angle }

}



function getWords() {
    console.log(txt[0]);
    for (let i = 0; i < txt.length; i++) {
        let tmp = splitTokens(txt[i], " ");
        for (let j = 0; j < tmp.length; j++) {
            if(tmp[j].endsWith(".")) {
                tmp[j] = tmp[j].replace(".", "");
            }
            myStrArr.push(tmp[j]);
        }
        //console.log(myStrArr);
    }
}

function analyseWords(){
    // need key 1st word
    // need value following word
    // need probability amount of following word is same
    // now how tf do i do that

    for (let i = 0; i < myStrArr.length -1; i++) {
        const curr = myStrArr[i];
        const next = myStrArr[i+1];

        if(!words.hasOwnProperty(curr)) {
            words[curr] = {};
        }
        if(!words[curr].hasOwnProperty(next)) {
            words[curr][next] = 1;
        }
        else {
            words[curr][next]++;
        }
    }
}

function getProbs() {
    for (const word in words) {
        if (Object.hasOwnProperty.call(words, word)) {
            let count = 0;
            const element = words[word];
            probs[word] = {};
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const amount = element[key];
                    count += amount;
                }
            }
            let cummulated = 0; 
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const amount = element[key];
                    
                    probs[word][key] = amount/count + cummulated;
                    cummulated = probs[word][key];
                }
            }
        }
    }
}

function getNextWord(curr) {
    let wordProbs = probs[curr];
    let tmp = {};

    for (const key in wordProbs) {
        if (Object.hasOwnProperty.call(wordProbs, key)) {
            const element = wordProbs[key];
            tmp[element] = key;
        }
    }
    let keysOnly = Object.keys(tmp);
    keysOnly.sort();
    var randomNum = Math.random();
    for (const key in keysOnly) {
        if (Object.hasOwnProperty.call(keysOnly, key)) {
            const element = keysOnly[key];
            if (randomNum <= element) return tmp[element];
        }
    }
}

function generateScentense(initial = null, length) {
    if (initial === null) {
        //todo pick random word if non specified
    }
    let gen = getNextWord(initial);
    console.log(initial);
    console.log(gen);
    if (length == 1) {
        return initial;
    }
    return initial + " " + generateScentense(gen, length - 1);
}

function parseAndAdd(text) {
    let currentWord = "";
    for (let i = 0; i < text.length; i++) {
        let currentLetter = text[i];
        let nextLetter = text[i];
        currentWord += currentLetter;

        if (nextLetter === " " || nextLetter === "\n" || nextLetter === "," || nextLetter === ".") {
            words.add(currentWord)
        }
    }
}

function getOffset() {
    return Math.floor(Math.random() * (200+150) - 150);
}
function getOffset2() {
    return Math.floor(Math.random() * (200+150) - 150);
}

function textLine() {
    let cx = 500;
    let cy = 400;
    let r;
    let texty = generateScentense("dream", 200);
    let textArr = texty.split("");
    print(textArr);
    angleMode(DEGREES);
    let j=0;
    for (let a = 0; a < 10; a++) {
        r = Math.floor(Math.random() * (80-30)+30); 
        textSize(r/2)
        for (let i = 0; i < 360; i+=10) {
            x = r * cos(i) + cx;
            y = r * sin(i) + cy; 
            fill(i/4, 100, 100)
            translate (500, 400);
            rotate(10);
            translate (-500, -400);
            text(textArr[j], x, y);
            j++;
        }
        cx = x-r;
        cy = y-r;
    }
}

function draw() {
    background(0)
    noLoop();
    textLine();

}