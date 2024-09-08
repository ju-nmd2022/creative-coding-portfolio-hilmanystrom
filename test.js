let particles = [];
let shapes = []; // Store shape positions and sizes

function setup() {
  createCanvas(1000, 1000);
  noLoop();
}

const size = 90;
const layers = 7;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

// Particle class to manage individual particles
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10); // Random particle size
    this.lifetime = 200; // How long the particle stays visible (fading out)
    this.speedX = random(-1, 1); // Horizontal movement speed
    this.speedY = random(-1, 1); // Vertical movement speed
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  // Update the particle (move and fade out)
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.lifetime -= 2; // Decrease lifetime (fade)
  }

  // Display the particle on the canvas
  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.lifetime); // Fade based on lifetime
    ellipse(this.x, this.y, this.size);
  }

  // Check if the particle is still alive
  isAlive() {
    return this.lifetime > 0;
  }
}

// Function to draw squares or circles and store their positions
function drawLayers(x, y, size, layers) {
  const variance = size / 20;

  // Generate random RGB values for a random color
  let r = random(255);
  let g = random(255);
  let b = random(255);

  // Set the fill color for each shape
  fill(r, g, b);
  noStroke();

  // Randomly decide whether to draw a rectangle (square) or an ellipse (circle)
  let drawCircle = random(1) > 0.5; // 50% chance to draw a circle or square

  // Store shape information for later click detection
  shapes.push({ x: x, y: y, size: size, isCircle: drawCircle });

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;

    if (drawCircle) {
      // Draw circles
      ellipse(
        x,
        y,
        s + getRandomValue(0, variance),
        s + getRandomValue(0, variance)
      );
    } else {
      // Draw squares
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

function draw() {
  background(255, 255, 255);

  // Clear shapes array before drawing them again
  shapes = [];

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  // Update and display each particle
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.display();

    // Remove the particle if its lifetime is over
    if (!particle.isAlive()) {
      particles.splice(i, 1); // Remove dead particle
    }
  }
}

// Detect mouse clicks and generate particles if clicked inside a shape
function mousePressed() {
  // Check if the mouse click is inside any of the shapes
  for (let shape of shapes) {
    let d = dist(mouseX, mouseY, shape.x, shape.y);

    if (shape.isCircle) {
      // If it's a circle, check distance from center
      if (d < shape.size / 2) {
        // Add particles if inside the circle
        for (let j = 0; j < 10; j++) {
          particles.push(new Particle(shape.x, shape.y));
        }
      }
    } else {
      // If it's a square, check if mouse is within the bounds of the square
      if (
        mouseX > shape.x - shape.size / 2 &&
        mouseX < shape.x + shape.size / 2 &&
        mouseY > shape.y - shape.size / 2 &&
        mouseY < shape.y + shape.size / 2
      ) {
        // Add particles if inside the square
        for (let j = 0; j < 10; j++) {
          particles.push(new Particle(shape.x, shape.y));
        }
      }
    }
  }

  // Redraw particles after clicking
  redraw();
}
