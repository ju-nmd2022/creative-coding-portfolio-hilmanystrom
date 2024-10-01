// let lines = [];
// let rippleCount = 10; // Number of ripple waves

// function setup() {
//   createCanvas(800, 400);
//   // Create initial lines
//   for (let i = 0; i < height; i += 10) {
//     lines.push(new RippleLine(i));
//   }
// }

// function draw() {
//   background(255); // Clear background

//   // Update and display each line
//   for (let line of lines) {
//     line.update();
//     line.display();
//   }
// }

// function mousePressed() {
//   // Create ripples at the mouse position
//   for (let line of lines) {
//     line.ripple(mouseY);
//   }
// }

// class RippleLine {
//   constructor(y) {
//     this.y = y;
//     this.amplitude = 0; // Start with no ripple
//     this.ripples = [];
//   }

//   ripple(clickY) {
//     // If the mouse click is close to the line, start a ripple
//     if (abs(this.y - clickY) < 20) {
//       this.amplitude = 100; // Set initial amplitude for the ripple
//       this.ripples.push(new Ripple(this.y));
//     }
//   }

//   update() {
//     // Update ripples
//     for (let i = this.ripples.length - 1; i >= 0; i--) {
//       this.ripples[i].update();
//       if (this.ripples[i].isFinished()) {
//         this.ripples.splice(i, 1); // Remove finished ripples
//       }
//     }
//   }

//   display() {
//     stroke(0, 0, 255);
//     strokeWeight(1.2);
//     // Draw the line normally if no ripples
//     if (this.ripples.length === 0) {
//       line(0, this.y, width, this.y);
//     } else {
//       // Draw rippled line if ripples exist
//       for (let ripple of this.ripples) {
//         let waveLength = ripple.getWaveLength();
//         let startX = 0;
//         let endX = width;

//         beginShape();
//         for (let x = startX; x <= endX; x += 2) {
//           let y =
//             this.y +
//             sin(TWO_PI * waveLength * (x + ripple.offset)) * ripple.amplitude;
//           vertex(x, y);
//         }
//         endShape();
//       }
//     }
//   }
// }

// class Ripple {
//   constructor(y) {
//     this.y = y;
//     this.amplitude = 20; // Initial ripple amplitude
//     this.offset = 0; // Offset for wave movement
//   }

//   update() {
//     this.amplitude *= 0.95; // Reduce amplitude over time
//     this.offset += 2; // Increase offset for wave motion
//   }

//   isFinished() {
//     return this.amplitude < 1; // Check if the ripple has faded out
//   }

//   getWaveLength() {
//     return map(this.amplitude, 100, 0, 0.01, 0.1); // Map amplitude to wave length
//   }
// }

// let lines = [];
// let rippleCount = 5; // Number of ripple waves
// let synth; // Tone.js synth

// function setup() {
//   createCanvas(800, 400);

//   // Create initial lines
//   for (let i = 0; i < height; i += 40) {
//     lines.push(new RippleLine(i));
//   }

//   // Initialize Tone.js synth
//   synth = new Tone.Synth().toDestination();
// }

// function draw() {
//   background(255); // Clear background

//   // Update and display each line
//   for (let line of lines) {
//     line.update();
//     line.display();
//   }
// }

// function mousePressed() {
//   // Create ripples at the mouse position and play sound
//   for (let line of lines) {
//     line.ripple(mouseY);
//   }

//   // Play a sound when the mouse is pressed
//   playSound();
// }

// function playSound() {
//   // Set the note and duration to play
//   const note = "C4"; // You can change the note
//   synth.triggerAttackRelease(note, "8n"); // Play note for an eighth note duration
// }

// class RippleLine {
//   constructor(y) {
//     this.y = y;
//     this.amplitude = 0; // Start with no ripple
//     this.ripples = [];
//   }

//   ripple(clickY) {
//     // If the mouse click is close to the line, start a ripple
//     if (abs(this.y - clickY) < 20) {
//       this.amplitude = 100; // Set initial amplitude for the ripple
//       this.ripples.push(new Ripple(this.y));
//     }
//   }

//   update() {
//     // Update ripples
//     for (let i = this.ripples.length - 1; i >= 0; i--) {
//       this.ripples[i].update();
//       if (this.ripples[i].isFinished()) {
//         this.ripples.splice(i, 1); // Remove finished ripples
//       }
//     }
//   }

//   display() {
//     stroke(0);
//     strokeWeight(2);
//     // Draw the line normally if no ripples
//     if (this.ripples.length === 0) {
//       line(0, this.y, width, this.y);
//     } else {
//       // Draw rippled line if ripples exist
//       for (let ripple of this.ripples) {
//         let waveLength = ripple.getWaveLength();
//         let startX = 0;
//         let endX = width;

//         beginShape();
//         for (let x = startX; x <= endX; x += 5) {
//           let y =
//             this.y +
//             sin(TWO_PI * waveLength * (x + ripple.offset)) * ripple.amplitude;
//           vertex(x, y);
//         }
//         endShape();
//       }
//     }
//   }
// }

// class Ripple {
//   constructor(y) {
//     this.y = y;
//     this.amplitude = 100;
//     this.offset = 0;
//   }

//   update() {
//     this.amplitude *= 0.95;
//     this.offset += 5;
//   }

//   isFinished() {
//     return this.amplitude < 1;
//   }

//   getWaveLength() {
//     return map(this.amplitude, 100, 0, 0.01, 0.1);
//   }
// }
