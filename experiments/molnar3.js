let bounceOffset = 0;
let positions = [];

function setup() {
  createCanvas(1000, 1000);
  frameRate(30);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      positions.push({
        x: size / 2 + x * size,
        y: size / 2 + y * size,
        drawCircle: random(1) > 0.7,
      });
    }
  }
}

const size = 90;
const layers = 7;
const bounceAmplitude = 3;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(pos, bounce) {
  const variance = size / 30;

  let r = random(255);
  let g = random(200);
  let b = random(255);

  fill(r, g, b);
  noStroke();

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;

    if (pos.drawCircle) {
      ellipse(
        pos.x,
        pos.y + bounce,
        s + getRandomValue(0, variance),
        s + getRandomValue(0, variance)
      );
    } else {
      beginShape();
      vertex(
        getRandomValue(pos.x - half, variance),
        getRandomValue(pos.y - half, variance)
      );
      vertex(
        getRandomValue(pos.x + half, variance),
        getRandomValue(pos.y - half, variance)
      );
      vertex(
        getRandomValue(pos.x + half, variance),
        getRandomValue(pos.y + half, variance)
      );
      vertex(
        getRandomValue(pos.x - half, variance),
        getRandomValue(pos.y + half, variance)
      );
      endShape(CLOSE);
    }
  }
}

function draw() {
  background(255, 255, 255);

  bounceOffset += 0.05;
  const bounce = sin(bounceOffset) * bounceAmplitude;

  for (let i = 0; i < positions.length; i++) {
    drawLayers(positions[i], bounce);
  }
}

// took a little help from chat to figure out the base of the bounce effect :) //
