let particles = [];
let noiseScale = 0.01; // Scale for Perlin noise
let noisePlayer; // Noise player

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();

  // Initialize Tone.js noise generator
  noisePlayer = new Tone.Noise("white").toDestination();
  noisePlayer.volume.value = -10; // Adjust volume if needed
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lifespan = 60 + Math.random() * 40;
    this.maxLifespan = this.lifespan;
    this.size = random(4, 10);
    this.hue = random(360);
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
  }

  update() {
    this.lifespan--;

    let noiseX = noise(this.noiseOffsetX) * TWO_PI;
    let noiseY = noise(this.noiseOffsetY) * TWO_PI;

    let velocity = createVector(cos(noiseX), sin(noiseY));
    velocity.mult(0.5);
    this.position.add(velocity);

    this.noiseOffsetX += noiseScale;
    this.noiseOffsetY += noiseScale;

    this.size *= 1;
    this.hue += 1;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();

    colorMode(HSB, 360, 100, 100, 255);
    let alpha = map(this.lifespan, 0, this.maxLifespan, 0, 255);
    fill(this.hue % 360, 100, 100, alpha);

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
  background(0, 0, 0, 25);
  drawParticles();
}

function mouseClicked() {
  generateParticles(mouseX, mouseY);
  loop();

  // Start Tone.js if not already started
  Tone.start().then(() => {
    // Trigger noise on mouse click
    noisePlayer.start();
    // Stop the noise after a short duration
    setTimeout(() => {
      noisePlayer.stop();
    }, 100); // Adjust duration as needed
  });
}
