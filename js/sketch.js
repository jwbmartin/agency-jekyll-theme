//OpenProcessing Tweak of http://www.openprocessing.org/sketch/70750 written by Jordan Whitney Martin

var bg = $('#bg');

function setup() {
 var canvas = createCanvas(bg.width(), bg.height());
  canvas.parent('bg');
  smooth();
  frameRate(13);

}

function draw() {
 	background(243,243,243);
    fill(243, 243, 243);
    stroke(30,247,183);
    strokeWeight(1);
    var dist = 65;
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        rectMode(CENTER);
        ellipse(i, j, 30, 14);
      }
    }
    fill(30,247,183);
    strokeWeight (2);
    for (var i = 25; i < width; i+=dist) 
    {
      for (var j = 25; j < height; j+=dist) 
      {
        var x1 = map(mouseX || touchX, 0, width, i-10, 10+i);
        var y1 = map(mouseY || touchY, 0, height, j-2, j+2);
        ellipse(x1, y1, 8, 8);
      }
    }
  }
 