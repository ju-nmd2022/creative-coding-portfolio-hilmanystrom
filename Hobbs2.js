let flowerSize = 5;
let amount = 8;
let gap = 90;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(150);
  noLoop();
}

function flower() {
  noStroke();
  let petals = floor(random(5, 11));
  let petalColor = color(random(200, 250), random(80, 100), random(100, 160));

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      fill(petalColor);
      rect(0, 3, 8, 35);

      fill(135, 83, 63);
      ellipse(0, 0, 10, 9);

      fill(0);
      rect(x, 30, 4);

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
      tr