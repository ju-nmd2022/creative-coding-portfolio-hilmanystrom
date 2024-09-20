let cols, rows;
let scale = 20;
let noiseScale = 0.1;
let particles = [];

function setup() {
  createCanvas(800, 800);
  cols = floor(width / scale);
  rows = floor(height / scale);

  for (let i = 0; i < 200; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(255, 50);

  strokeWeight(2);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = noise(x * noiseScale, y * noiseScale) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      stroke(0, 20);
      push();
      translate(x * scale, y * scale);
      line(0, 0, v.x * scale * 0.5, v.y * scale * 0.5);
      pop();
    }
  }

  for (let p of particles) {
    let col = floor(p.x / scale);
    let row = floor(p.y / scale);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      let angle = noise(col * noiseScale, row * noiseScale) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      let speed = 1;

      p.add(v);
    }

    if (p.x < 0) p.x = width;
    p.x += random(-1, 1);
    if (p.x > width) p.x = 0;
    p.x += random(-1, 1);
    if (p.y < 0) p.y = height;
    p.y += random(-1, 1);
    if (p.y > height) p.y = 0;
    p.y += random(-1, 1);

    stroke(map(p.x, 0, width, 0, 255), 100, 200);
    strokeWeight(6);
    point(p.x, p.y);
  }
}
