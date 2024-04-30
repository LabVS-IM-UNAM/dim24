let startX, startY;
let endX, endY;
let selecting = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (selecting) {
    let w = endX - startX;
    let h = endY - startY;
    rect(startX, startY, w, h);
  }
}

function mousePressed() {
  startX = mouseX;
  startY = mouseY;
  selecting = true;
}

function mouseReleased() {
  endX = mouseX;
  endY = mouseY;
  selecting = false;
}
