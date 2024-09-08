function setup() {
  createCanvas(1000, 1000);
}

const size = 90;
const layers = 7;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  // const half = size / 2;
  const variance = size / 20;

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

    // let drawCircle = random(1) > 0.5; // 50% chance to draw a circle or square

    // for (let i = 0; i < layers; i++) {
    //   if (Math.random() > 0.8) {
    //     continue;
    //   }
    //   const s = (size / layers) * i;
    //   const half = s / 2;

    //   if (drawCircle) {
    //     // Draw circles
    //     ellipse(
    //       x,
    //       y,
    //       s + getRandomValue(0, variance),
    //       s + getRandomValue(0, variance)
    //     );
    //   } else {
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(255, 255, 255);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  noLoop();
}
