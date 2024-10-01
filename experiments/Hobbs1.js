let flowerSize = 5;
let amount = 8;
let gap = 90;

function setup() {
  createCanvas(1000, 800);
  background(173, 216, 230);
  noLoop();
}

function flower() {
  noStroke();
  let petals = floor(random(5, 11));

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      fill(254, 219, 100);
      ellipse(0, 3, 10, 80);

      fill(135, 83, 63);
      ellipse(0, 0, 10, 9);

      rotate(TWO_PI / petals); //Used ChatGPT to help me figure out the "TWO_PI" to make the petals smaller and variate more in size //
    }
  }
}

function draw() {
  let y = (height - flowerSize + amount - gap * (amount - 1)) / 2;
  for (let i = 0; i < amount; i++) {
    let x = (height - flowerSize + amount - gap * (amount - 1)) / 2;
    for (let j = 0; j < amount; j++) {
      push();
      translate(x, y);
      flower();

      pop();
      x += flowerSize + gap;
    }
    y += flowerSize + gap;
  }
}

// I used the code example we got in the workshop with Bassima on the 28/8 to help me get started //
