let words = markov();

let fileReader = new FileReader();
let sentenceLenField;
let textField;
let sentenceLength = 5;

window.onload = function() {
    textField = document.getElementById("markov-text");
    sentenceLenField = document.getElementById("lengthInput");
    sentenceLenField.addEventListener("change", function (event) {
        sentenceLength = parseInt(sentenceLenField.value);
    });
}

function setup() {
    // createCanvas(400, 400);
}

function setupFileUpload() {
    document.getElementById('fileUpload').addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (!file) {
            console.log('No file selected.');
            return;
        }

        fileReader.onload = function (e) {
            console.log('File content:', e.target.result);
        };
        fileReader.readAsText(file);
    });
}

function draw() {

}

function markov() {
    return {
        _add: function (current, next) {
            if (!this.hasOwnProperty(current) || typeof this[current] !== 'object' || this[current] === null) {
                this[current] = {};
            }
            let sublist = this[current];
            if (sublist.hasOwnProperty(next)) {
                sublist[next]++;
            } else {
                sublist[next] = 1;
            }
            return this;
        },
        _convert: function () {
            let result = {};
            for (const key in this) {
                if (key.startsWith("_")) continue;
                if (!this.hasOwnProperty(key) || typeof this[key] !== 'object' || this[key] === null) {
                    console.log(key + " has no words in data structure");
                    continue;
                }
                result[key] = {};
                let totalCount = 0;
                for (const word in this[key]) {
                    totalCount += this[key][word];
                }
                for (const word in this[key]) {
                    result[key][word] = this[key][word] / totalCount;
                }
            }
            return result;
        }
    };
}

function upload() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file!');
        return;
    }

    const reader = new FileReader();

    //tokenize
    reader.onload = function(e) {
        const text = e.target.result;
        parseAndAdd(text);
    };

    reader.readAsText(file);
}

function generate() {
    let result = generateSentence(".", sentenceLength);
    while (!(/^[a-zA-Z]$/.test(result[0]))) {
        result = result.slice(1);
    }
    textField.innerText = result;
}

function parseAndAdd(text) {
    let previous = null;
    let currentWord = "";
    for (let i = 0; i < text.length-1; i++) {
        let currentLetter = text[i];
        let nextLetter = text[i+1];

        if (currentLetter === " " || currentLetter === "\n") continue;

        currentWord += currentLetter;

        // finish word;
        if (
            nextLetter === " " ||
            nextLetter === "\n" ||
            nextLetter === "," ||
            nextLetter === "." ||
            nextLetter === ";" ||
            nextLetter === "?" ||
            nextLetter === "\"" ||
            nextLetter === "!" ||
            nextLetter === "\'" ||
            nextLetter === "-" ||
            currentLetter === "\'" ||
            currentLetter === "." ||
            currentLetter === "-" ||
            currentLetter === "\"" ||
            currentLetter === "!"
    ) {

            if (previous === null) {
                previous = currentWord;
                continue;
            }
            words._add(previous, currentWord);
            previous = currentWord;
            currentWord = "";
        }
    }
    console.log("done");
}

function getNextWord(curr) {
    let wordProbabilities = propsForWord(curr);
    let tmp = {};
    for (const key in wordProbabilities) {
        if (Object.hasOwnProperty.call(wordProbabilities, key)) {
            const element = wordProbabilities[key];
            tmp[element] = key;
        }
    }
    let keysOnly = Object.keys(tmp);
    keysOnly.sort();
    let randomNum = Math.random();
    for (const key in keysOnly) {
        if (Object.hasOwnProperty.call(keysOnly, key)) {
            const element = keysOnly[key];
            if (randomNum <= element) return tmp[element];
        }
    }
}

function propsForWord(word) {
    let result = {};
    let nextWords = words[word];
    let count = 0;
    for (const nextWordKey in nextWords) {
        let nextWordCount = nextWords[nextWordKey];
        count += nextWordCount;
    }
    let last = 0;
    for (const nextWordKey in nextWords) {
        result[nextWordKey] = last + nextWords[nextWordKey] / count;
        last = result[nextWordKey];
    }
    return result;
}

function generateSentence(initial, length) {
    if (length === 1) {
        return initial;
    }
    let gen = getNextWord(initial);
    let recResult = generateSentence(gen, length - 1);
    let space = " ";
    if (recResult.startsWith(".") || recResult.startsWith(",") || recResult.startsWith("!") || recResult.startsWith("?") || recResult.startsWith(";")) {
        space = "";
    }
    return `${initial}${space}${recResult}`;
}
