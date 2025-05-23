// code von chat gpt 
// funktioniert nicht so ganz



// Permutation table
const permutation = [
    151, 160, 137, 91, 90, 1, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174,
    20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
    220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118,
    126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163,
    70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246,
    97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181,
    199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 1, 20, 3, 45, 16, 21,
    125, 239, 5, 244, 79
]  

// Canvas setup
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Grid size and pixel dimensions
const gridSize = 100;
const pixelSize = 5;
const canvasSize = gridSize * pixelSize;

canvas.width = canvasSize;
canvas.height = canvasSize;

function setup() {
  // Set the fill style for rendering the pixels
  ctx.fillStyle = '#000000';
}

function draw() {
  // Generate Perlin noise values and render pixels on the canvas
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      // Calculate the normalized grid position (between 0 and 1)
      const u = x / gridSize;
      const v = y / gridSize;

      // Determine the grid cell coordinates
      const x0 = Math.floor(u * gridSize);
      const x1 = (x0 + 1) % gridSize;
      const y0 = Math.floor(v * gridSize);
      const y1 = (y0 + 1) % gridSize;

      // Calculate the interpolation factors
      const tx = u * gridSize - x0;
      const ty = v * gridSize - y0;

      // Sample the four corners of the grid cell
      const c00 = perlin2D(x0 / gridSize, y0 / gridSize);
      const c01 = perlin2D(x0 / gridSize, y1 / gridSize);
      const c10 = perlin2D(x1 / gridSize, y0 / gridSize);
      const c11 = perlin2D(x1 / gridSize, y1 / gridSize);

      // Interpolate the noise values
      const noiseValue = interpolate(
        interpolate(c00, c10, tx),
        interpolate(c01, c11, tx),
        ty
      );

      // Scale the noise value to the range [0, 255]
      const scaledValue = Math.floor((noiseValue + 1) * 0.5 * 255);

      // Set the pixel color based on the noise value
      ctx.fillStyle = `rgb(${scaledValue}, ${scaledValue}, ${scaledValue})`;

      // Render the pixel on the canvas
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}


function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function interpolate(a, b, t) {
  return a + smoothstep(t) * (b - a);
}

setup()
draw()

function fade(t) {
return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerpy(t, a, b) {
return a + t * (b - a);
}

function grad(hash, x, y) {
const h = hash & 7;
const u = h < 4 ? x : y;
const v = h < 4 ? y : x;
return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function perlin2D(x, y) {
const X = Math.floor(x) & 255;
const Y = Math.floor(y) & 255;

const xi = x - Math.floor(x);
const yi = y - Math.floor(y);

const u = fade(xi);
const v = fade(yi);

const A = permutation[X] + Y;
const B = permutation[X + 1] + Y;

const AA = permutation[A];
const AB = permutation[A + 1];
const BA = permutation[B];
const BB = permutation[B + 1];

const g00 = grad(permutation[AA], xi, yi);
const g01 = grad(permutation[AB], xi, yi - 1);
const g10 = grad(permutation[BA], xi - 1, yi);
const g11 = grad(permutation[BB], xi - 1, yi - 1);

const n00 = g00 * (xi) + g01 * (xi) * (yi - 1);
const n01 = g10 * (xi - 1) + g11 * (xi - 1) * (yi - 1);
const n10 = g00 * (xi) + g10 * (xi - 1) * (yi);
const n11 = g01 * (xi) * (yi - 1) + g11 * (xi - 1) * (yi - 1);

return lerpy(v, lerpy(u, n00, n10), lerpy(u, n01, n11));
}