let lines = [];
let rippleCount = 10;
let synth;

function setup() {
  createCanvas(3000, 1000);

  for (let i = 0; i < height; i += 40) {
    lines.push(new RippleLine(i));
  }

  synth = new Tone.Synth().toDestination();
}

function draw() {
  background(250, 218, 221);

  for (let line of lines) {
    line.update();
    line.display();
  }
}

function mousePressed() {
  for (let line of lines) {
    line.ripple(mouseY);
  }
}

function playSound(lineY) {
  const minY = 0;
  const maxY = height;
  const mappedFreq = map(lineY, minY, maxY, 800, 100);

  synth.triggerAttackRelease(mappedFreq, "8n");
}

class RippleLine {
  constructor(y) {
    this.y = y;
    this.amplitude = 0;
    this.ripples = [];
  }

  ripple(clickY) {
    if (abs(this.y - clickY) < 20) {
      this.amplitude = 100;
      this.ripples.push(new Ripple(this.y));

      playSound(this.y);
    }
  }

  update() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      this.ripples[i].update();
      if (this.ripples[i].isFinished()) {
        this.ripples.splice(i, 1);
      }
    }
  }

  display() {
    stroke(0, 0, 100);
    strokeWeight(1.5);

    if (this.ripples.length === 0) {
      line(0, this.y, width, this.y);
    } else {
      for (let ripple of this.ripples) {
        let waveLength = ripple.getWaveLength();
        let startX = 0;
        let endX = width;

        beginShape();
        for (let x = startX; x <= endX; x += 5) {
          let y =
            this.y +
            sin(TWO_PI * waveLength * (x + ripple.offset)) * ripple.amplitude;
          vertex(x, y);
        }
        endShape();
      }
    }
  }
}

class Ripple {
  constructor(y) {
    this.y = y;
    this.amplitude = 40;
    this.offset = 0;
  }

  update() {
    this.amplitude *= 0.95;
    this.offset += 5;
  }

  isFinished() {
    return this.amplitude < 1;
  }

  getWaveLength() {
    return map(this.amplitude, 100, 0, 0.01, 0.1);
  }
}
