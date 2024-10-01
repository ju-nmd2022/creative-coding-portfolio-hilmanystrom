let flowerSize = 5;
let amount = 8;
let gap = 90;
let flowers = [];

function setup() {
  createCanvas(1000, 800);
  background(173, 216, 230);

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      flowers.push({
        x:
          (height - flowerSize + amount - gap * (amount - 1)) / 2 +
          j * (flowerSize + gap),
        y:
          (height - flowerSize + amount - gap * (amount - 1)) / 2 +
          i * (flowerSize + gap),
        petals: floor(random(5, 11)),
        angle: 0,
        growthRate: 0.02,
      });
    }
  }
}

function flower(x, y, petals, angle) {
  push();
  translate(x, y);
  rotate(angle);
  noStroke();

  for (let yPetal = 0; yPetal < petals; yPetal++) {
    fill(254, 219, 100);
    ellipse(0, 3, 10, 80);

    fill(135, 83, 63);
    ellipse(0, 0, 10, 9);

    rotate(TWO_PI / petals);
  }
  pop();
}

function draw() {
  background(173, 216, 230);

  for (let flowerData of flowers) {
    flower(flowerData.x, flowerData.y, flowerData.petals, flowerData.angle);

    flowerData.angle += radians(0.5);

    if (flowerData.petals > 15) {
      flowerData.petals = 15;
    }
  }
}

// Asked ChatGPT for help to establish the rotating effect
