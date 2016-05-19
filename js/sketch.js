function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  frameRate(8);
}

function draw() {
  if (mouseIsPressed) {
  	background("deepPink");
    fill(255,255,255);
    stroke(35,79,163);
      	var dist = 85;
    for (var i = 25; i < width; i+=dist) {
      for (var j = 25; j < height; j+=dist) {
        rectMode(CENTER);
        ellipse(i, j, random(30), random(20));
      }
    }
    fill(35,79,163);
    for (var i = 25; i < width; i+=dist) {
      for (var j = 25; j < height; j+=dist) {
        rectMode(CENTER);
        ellipse(i, j, random(10), random(20));
      }
    }
 } else {
 	background(31,247,183);
    fill(225, 255, 255);
    stroke(35,79,163);
    var dist = 85;
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        rectMode(CENTER);
        ellipse(i, j, 30, 14);
      }
    }
    fill(35,79,163);
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        var x1 = map(mouseX, 0, width, i-10, 10+i);
        var y1 = map(mouseY, 0, height, j-1, j+3);
        ellipse(x1, y1, 8, 8);
      }
    }
  }
}