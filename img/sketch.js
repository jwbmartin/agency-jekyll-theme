function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
}

function draw() {
  if (mouseIsPressed) {
  	background(237,34,93);
    fill(255,255,255);
    stroke(35,79,163);
    strokeWeight(1.5);
      	var dist = 90;
    for (var i = 25; i < width; i+=dist) {
      for (var j = 25; j < height; j+=dist) {
        rectMode(CENTER);
        ellipse(i, j, random(40), random(25));
      }
    }
    fill(35,79,163);
    for (var i = 25; i < width; i+=dist) {
      for (var j = 25; j < height; j+=dist) {
        rectMode(CENTER);
        ellipse(i, j, random(1), random(20));
      }
    }
 } else {
 	background(31,247,183);
    fill(225, 255, 255);
    stroke(35,79,163);
    strokeWeight(1.5);
    var dist = 90;
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        rectMode(CENTER);
        ellipse(i, j, 40, 20);
      }
    }
    fill(35,79,163);
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        var x1 = map(mouseX, 0, width, i-11.5, 11.5+i);
        var y1 = map(mouseY, 0, height, j-3.2, j+3);
        ellipse(x1, y1, 14, 14);
      }
    }
  }
}