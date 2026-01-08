// Get canvas and 2D drawing context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Filled rectangle
ctx.fillStyle = '#4CAF50';        // green
ctx.fillRect(30, 40, 150, 80);    // x, y, width, height

// Filled circle
ctx.beginPath();
ctx.arc(350, 100, 50, 0, Math.PI * 2); // centerX, centerY, radius
ctx.fillStyle = '#2196F3';             // blue
ctx.fill();

// Straight line
ctx.beginPath();
ctx.moveTo(50, 200);     // start
ctx.lineTo(450, 250);    // end
ctx.strokeStyle = '#000000';
ctx.lineWidth = 3;
ctx.stroke();

// Text
ctx.fillStyle = '#000000';
ctx.font = '24px Arial';
ctx.fillText('HTML5 Canvas', 160, 170);
