let particles = [];
let mouseAttractionStrength = 0.02;
let gravity;

function setup() {
  createCanvas(innerWidth, innerHeight);
  gravity = createVector(0, 0.05);
  noLoop();
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(1, 3));
    this.lifespan = 100 + Math.random() * 50;
    this.maxLifespan = this.lifespan;
    this.size = random(6, 8);
    this.hue = random(360);
    this.burstFactor = random(1.1, 1.3);
  }

  update() {
    this.lifespan--;

    this.velocity.add(gravity);

    if (this.lifespan > this.maxLifespan * 0.8) {
      this.velocity.mult(this.burstFactor);
    }

    let mouse = createVector(mouseX, mouseY);
    let attractionForce = p5.Vector.sub(mouse, this.position);
    attractionForce.mult(mouseAttractionStrength);
    this.velocity.add(attractionForce);

    this.velocity.mult(0.98);
    this.position.add(this.velocity);

    this.size *= 0.97;

    this.hue += 1;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();

    colorMode(RGB, 255);
    let alpha = map(this.lifespan, 0, this.maxLifespan, 0, 255);
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
    const particle = new Particle(x, y);
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
  background(0, 0, 0, 50);
  drawParticles();
}

function mouseClicked() {
  generateParticles(mouseX, mouseY);
  loop();
}
