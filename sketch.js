var capture;
var myImage1;
var myImage2;
var dance;

function preload(){
  // put preload code here
  myImage1 = loadImage('assets/star1.png');
  myImage2 = loadImage('assets/star2.png');
  dance = loadImage('assets/dance.png');
}

var balls = [];

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);

  mic = new p5.AudioIn();
  mic.start();

	capture = createCapture(VIDEO);
	capture.size(640, 480);
	capture.hide();


var starNumber1 = 50;
for(var i = 0; i < starNumber1; i++) {

  var myStar1 = new Ball(random(width), random(height), myImage1);
  balls.push(myStar1);
}

var starNumber2 = 100;
for(var i = 0; i < starNumber2; i++) {

  var myStar2 = new Ball(random(width), random(height), myImage2);
  balls.push(myStar2);
}
}

function draw() {
  // put drawing code here
  background('#ffffff')
  var myImage = capture.loadPixels();
  imageMode(CENTER)
  image(myImage, width/2, height/6,200,200);
  image(dance,width/2,height/2, dance.width, dance.height);
//image(capture, 0, 0, width, width * capture.height / capture.width);

var myText= "let's sing and dance";
textFont('Pattaya');
textAlign(CENTER);
textSize(50);
fill('#A9A9A9');
text(myText,width/2,height/2);
     for(var j = 0; j < balls.length; j++) {
   		balls[j].move();
   		balls[j].display();
   	}
}


function Ball(_x, _y,_img) {
	// Properties defined by constructor

	this.x = _x;
	this.y = _y;
  this.image=_img
	// Hardcoded properties
	this.color = 'black';

	this.speed = 2;
  this.text=14;
  this.font='Baloo Bhaijaan'

	this.yDir = 1;
	this.xDir = 1;
  this.move = function() {
		this.x += this.speed * this.xDir;
		this.y += this.speed * this.yDir;

		if (this.y >= height || this.y <= 0) {
			// if 1, set to -1, if -1, set to 1
			this.yDir *= -1;
		}

		if (this.x >= width || this.x <= 0) {
			this.xDir *= -1;
		}
	}

	this.display = function() {
   var vol = mic.getLevel();
    image(this.image,this.x, this.y,vol*300,vol*300);
    
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)

}
