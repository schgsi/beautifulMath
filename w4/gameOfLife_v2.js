let cols = 40;
let rows = 40;
let board = [];
let data = [];
let running;

function makeBoard(force) {
    if (running || force) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                board[i][j].style.background = (data[i][j] ? "black" : "white");
            }
        }
    }
}

function clearBoard() {
    if (!running) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                data[i][j] = false;
            } 
            makeBoard(true);         
        }
    }
}

function init() {
    let row;
    let xCenter = Math.round(cols/2);
    let yCenter = Math.round(rows/2);
    tbody = document.getElementById("board");
    for (let i = 0; i < cols; i++) {
        row = tbody.appendChild(document.createElement("tr"));
        board[i] = [];
        data[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i][j] = row.appendChild(document.createElement("td"));
            board[i][j].addEventListener('click', callbackGenerator(i,j));
        }
    }

    // anfangsmuster here
    data[yCenter-1][xCenter] = true;

    setInterval( function() { update(); makeBoard();}, 300);
}

function update() {
    var i, j, k, l, neighbors;

    if(running) {
        for (i = 0; i < cols; i++) {
            for (j = 0; j < rows; j++) {
                neighbors = 0;
                for (k = i - 1; k <= i+1; k++) {
                    for (l = j-1; l <= j+1; l++) {
                        if (k != i || l != j){
                            if(board[k] && board[k][l] && board[k][l].style.background.indexOf("black") != -1) {
                                neighbors++;

                            }
                        }
                    }
                }
                if (neighbors == 3) {
                    data[i][j] = true;
                } else if (neighbors != 2) {
                    data[i][j] = false;
                }
            }
        }
    }
}

function callbackGenerator(i,j) {
    return function () {
        if (!running) {
            data[i][j] = (board[i][j].style.background.indexOf("black") == -1);
            makeBoard(true);
        }
    }
}