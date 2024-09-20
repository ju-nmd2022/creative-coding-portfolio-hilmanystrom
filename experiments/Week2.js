let particles = [];
let noiseScale = 0.02;
let mouseAttractionStrength = 0.05;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lifespan = 200 + Math.random() * 100;
    this.maxLifespan = this.lifespan;
    this.size = random(10, 20);
    this.hue = random(255);
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.velocity = createVector(0, 0);
  }

  update() {
    this.lifespan--;

    let noiseX = noise(this.noiseOffsetX) * TWO_PI;
    let noiseY = noise(this.noiseOffsetY) * TWO_PI;
    let noiseVelocity = createVector(cos(noiseX), sin(noiseY));
    noiseVelocity.mult(0.5);
    this.position.add(noiseVelocity);

    this.noiseOffsetX += noiseScale;
    this.noiseOffsetY += noiseScale;

    let mouse = createVector(mouseX, mouseY);
    let attractionForce = p5.Vector.sub(mouse, this.position);
    attractionForce.mult(mouseAttractionStrength);
    this.position.add(attractionForce);

    this.size *= 1;

    this.hue += 1;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();

    let r = map(sin(this.hue * 0.1), -1, 1, 50, 255);
    let g = map(cos(this.hue * 0.1), -1, 1, 50, 255);
    let b = map(sin(this.hue * 0.2), -1, 1, 50, 255);

    fill(r, g, b, alpha);

    ellipse(0, 0, this.size);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
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

  if (particles.length === 0) {
    noLoop();
  }
}

function draw() {
  background(0, 0, 0, 35);
  drawParticles();
}

function mouseClicked() {
  generateParticles(mouseX, mouseY);
  loop();
}
