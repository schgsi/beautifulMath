function preload() {
    // Load the font file (replace 'your-font-file.ttf' with the path to your font file)

}

function setup() {
    createCanvas(800, 600, WEBGL);
    angleMode(DEGREES);
    // noLoop();
}

function draw() {
    background(220);
    orbitControl();

    // do stuff here

    // tStrip(-100, 0, 20, 30);
    // cCylinder(0, 0, 50, 10, 50);
    donut(0, 0, 90, 20, 50, 9);

    // to here

}

function keyPressed() {
    promptSaveCanvas();
}

function tStrip(x, y, tHeight, tWidth) {
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < 20; i++) {
        let y1 = y;
        if (i % 2 === 0) y1 = y + tHeight;
        vertex(x + i * (tWidth / 2), y1);
    }
    endShape();
}

function createCircle(centerX, centerY, radius, steps, offset = 0) {
    let result = [];
    for (let i = offset; i < 360 + offset; i += 360 / steps) {
        result.push(
            {
                "x": cos(i) * radius + centerX,
                "y": sin(i) * radius + centerY, color
            }
        );
    }
    return result;
}

function cCylinder(centerX, centerY, radius, steps, height) {

    let border1 = createCircle(centerX, centerY, radius, steps);
    let border2 = createCircle(centerX, centerY, radius, steps, 0.1);

    beginShape(TRIANGLE_STRIP);

    for (let i = 0; i < steps; i++) {
        vertex(border1[i].x, border1[i].y, -height / 2);
        vertex(border2[i].x, border2[i].y, height / 2);
    }
    vertex(border1[0].x, border1[0].y, -height / 2);
    vertex(border2[0].x, border2[0].y, height / 2);

    endShape(CLOSE);
}

function donut(centerX, centerY, radiusOuter, stepsOuter, radiusInner, stepsInner) {
    // center pointer circle
    let centerPoints = createCircle(centerX, centerY, radiusOuter, stepsOuter);
    // stroke(color("green"));
    // for (let i = 0; i < centerPoints.length; i++) {
    //     point(centerPoints[i].x, centerPoints[i].y, 1);
    // }
    stroke(color("red"));

    // circles around center point
    let circles = [];
    for (const i in centerPoints) {
        let c = createCircle(centerPoints[i].x, centerPoints[i].y, radiusInner, stepsInner)
        for (let i = 0; i < c.length; i++) {
            c[i].z = 1;
        }
        circles.push(c);
    }

    // rotate the circles
    for (let i = 0; i < circles.length; i++) {
        circles[i] = rotateT(circles[i], 90, rotX, centerPoints[i].x, centerPoints[i].y);
    }

    // rotate the circles
    for (let i = 0, angle = 0; angle < 360; angle += 360 / centerPoints.length, i++) {
        circles[i] = rotateT(circles[i], angle, rotZ, centerPoints[i].x, centerPoints[i].y);
    }

    //draw circles
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = 0; j < circles[0].length; j++) {
            vertex(circles[i][j].x, circles[i][j].y, circles[i][j].z);
            vertex(circles[i + 1][j].x, circles[i + 1][j].y, circles[i + 1][j].z);
        }
    }
    for (let j = 0; j < circles[0].length; j++) {
        vertex(circles[circles.length - 1][j].x, circles[circles.length - 1][j].y, circles[circles.length - 1][j].z);
        vertex(circles[0][j].x, circles[0][j].y, circles[0][j].z);
    }
    // vertex(circles[circles.length-1][circles[0].length-1].x,circles[circles.length-1][circles[0].length-1].y,circles[circles.length-1][circles[0].length-1].z);
    vertex(circles[0][0].x, circles[0][0].y, circles[0][0].z);
    vertex(circles[1][0].x, circles[1][0].y, circles[1][0].z);

    endShape(CLOSE);
}

function rotateT(vertices, angle, rMatrixF, centerOffsetX = 0, centerOffsetY = 0) {
    let result = [];
    const rMatrix = rMatrixF(angle);
    for (let i = 0; i < vertices.length; i++) {
        const point = [vertices[i].x - centerOffsetX, vertices[i].y - centerOffsetY, vertices[i].z];
        const tmp = multiplyMatrixVector(rMatrix, point);
        result.push({"x": tmp[0] + centerOffsetX, "y": tmp[1] + centerOffsetY, "z": tmp[2]});
    }
    return result;
}
function constrainedSet(x, y, color) {
    if (x > width || x < -1 || y > height || y < 0) {
        return;
    }
    set(x, y, color);
}

function getRandomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function promptSaveCanvas() {
    if (key === 's' || key === 'S') {
        saveCanvas(getTimeStamp(), "png");
    }
}

function getTimeStamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function multiplyMatrixVector(matrix, vector) {
    // Ensure the matrix is not empty
    if (matrix.length === 0 || matrix[0].length === 0) {
        throw new Error('Matrix is empty');
    }

    // Ensure the matrix dimensions match the vector length
    if (matrix[0].length !== vector.length) {
        throw new Error('Matrix dimensions do not match vector length');
    }

    let result = new Array(matrix.length).fill(0);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < vector.length; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }

    return result;
}

const rotZ = function (angle) {
    return [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1],
    ]
}

const rotY = function (angle) {
    return [
        [cos(angle), 0, sin(angle)],
        [0, 1, 0],
        [-sin(angle), 0, cos(angle)],
    ];
}

const rotX = function (angle) {
    return [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle), cos(angle)],
    ];
}
