let particles = [];
let shapes = [];
const size = 90;
const layers = 7;

function setup() {
  createCanvas(innerWidth, innerHeight);
  drawLayersGrid();
  noLoop();
}

function drawLayersGrid() {
  background(255, 255, 255);

  shapes = [];

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
}

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;

  let r = random(255);
  let g = random(200);
  let b = random(255);

  fill(r, g, b);
  noStroke();

  let drawCircle = random(1) > 0.7;

  let shapeInfo = {
    type: drawCircle ? "circle" : "square",
    x: x,
    y: y,
    size: size / 2,
  };

  shapes.push(shapeInfo);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) continue;
    const s = (size / layers) * i;
    const half = s / 2;

    if (drawCircle) {
      ellipse(
        x,
        y,
        s + getRandomValue(0, variance),
        s + getRandomValue(0, variance)
      );
    } else {
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
}

function isInsideShape(x, y) {
  for (let shape of shapes) {
    if (shape.type === "circle") {
      let d = dist(x, y, shape.x, shape.y);
      if (d < shape.size) {
        return true;
      }
    } else if (shape.type === "square") {
      if (
        x > shape.x - shape.size &&
        x < shape.x + shape.size &&
        y > shape.y - shape.size &&
        y < shape.y + shape.size
      ) {
        return true;
      }
    }
  }
  return false;
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 10 + Math.random() * 4;
  }

  update() {
    this.lifespan--;
    this.velocity.mult(1.3);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    let r = random(255);
    let g = random(200);
    let b = random(255);
    const alpha = map(this.lifespan, 0, 10, 0, 255);
    fill(r, g, b, alpha);
    ellipse(0, 0, 6);
    pop();
  }

  isDead() {
    return this.lifespan <= 1;
  }
}

function generateParticles(x, y) {
  for (let i = 0; i < 100; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
}

function draw() {
  drawParticles();
}

function mouseClicked() {
  if (isInsideShape(mouseX, mouseY)) {
    generateParticles(mouseX, mouseY);
    loop();
  }
}

// For the "isInsideShape" function I took some help from chatGPT to make it work. I also used help from code examples from lectures, for Vera Molnars squares and the particles and then combined the two.
