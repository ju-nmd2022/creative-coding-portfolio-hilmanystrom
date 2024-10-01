let cols, rows;
let squareSize = 30;
let amplitude = 30;
let waveFrequency = 0.05;
let time = 0;

function setup() {
  createCanvas(1000, 800);
  cols = ceil(width / squareSize);
  rows = ceil(height / squareSize);
  noStroke();
}

function draw() {
  background(0);
  time += 0.02;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let depthOffset = sin(TWO_PI * (x * waveFrequency) + time) * amplitude;

      let blueValue = map(depthOffset, -amplitude, amplitude, 255, 50);
      let greenValue = map(y, 0, rows, 255, 100);

      let fillColor = color(0, greenValue, blueValue);

      let posX = x * squareSize;
      let posY = y * squareSize - depthOffset;

      fill(fillColor);
      rect(posX, posY, squareSize, squareSize);
    }
  }
}

// Took inspiration from the artpiece "Hours of dark by ruth & tim, and used the code provided on their website as help as well as ChatGPT"
