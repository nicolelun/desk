var imgCeiling;
var imgLamp;
var imgMug;
var imgPaperTowel;
var imgPen;
var imgPencil;
var imgCrumbs;
var imgInspireEnvy;
var imgBetOnYourself;

var myCeiling;
var myLamp;
var myMug;
var myPaperTowel;
var myPen;
var myPencil;
var myCrumbs;
var myInspireEnvy;
var myBetOnYourself;

// TEST
var testObject;
var testObject2;
var testObject3;
var testPara;
var myTest;

// GENERAL
var startTime;
var currentTime;
var dragging;

// VIDEO
var vidCeiling;
var button;
var playing = false;
var distanceFan;
var hoverOverFan;


function preload() {
	imgCeiling = loadImage("images/desk/ceiling2.jpg");
	imgLamp = loadImage("images/desk/IMG_2235_Lamp_368w.png");
	imgMug = loadImage("images/desk/IMG_2244_Mug_306w_NL.png");
	imgPaperTowel = loadImage("images/desk/IMG_2209_PaperTowel_378w.png");
	imgPen = loadImage("images/desk/IMG_2249_Pen_46w.png");
	imgPencil = loadImage("images/desk/IMG_2218_Pencil_30w.png");
	imgCrumbs = loadImage("images/desk/IMG_2247_ButterfingerCrumbs_575w.png");
	imgBetOnYourself = loadImage("images/desk/IMG_2222_BetOnYourself_122w.png");
	imgInspireEnvy = loadImage("images/desk/IMG_2222_InspireEnvy_55w.png");
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// Setup runs ONCE at the start of the sketch
function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	rectMode(CENTER);
	ellipseMode(CENTER);
	angleMode(DEGREES);

	startTime = millis();

	dragging = false;

	vidCeiling = createVideo('media/Ceiling.mov');
	vidCeiling.size(windowWidth, windowHeight);
	vidCeiling.position(0, 0);
	vidCeiling.style('z-index', -1);
  	// button = createButton('play');
  	// button.mousePressed(toggleVid); // attach button listener

	// object parameters: image, startX, startY, brakeX, brakeY, speed, rotate
	myLamp = new DeskObject(imgLamp, width + 300, 110, width - 200, 110, 10, 0);
	myMug = new DeskObject(imgMug, -300, height / 2, 50, height / 2, 10, 0);
	myPaperTowel = new DeskObject(imgPaperTowel, width * .4, -300, width * .4, 100, 10, 0);
	myPen = new DeskObject(imgPen, 0, height * .75, 200, height * .75, 10, -2); 
	myPencil = new DeskObject(imgPencil, 1000, 200, 500, 200, 10, 0);
	myCrumbs = new DeskObject(imgCrumbs, width / 2, height, width / 2, height *.75, 10, 0);
	myBetOnYourself = new DeskObject(imgBetOnYourself, width, 300, width - 30, 300, 10, 0);
	myInspireEnvy = new DeskObject(imgInspireEnvy, width, 300, width - 60, 300, 10, 0);

	// testObject = createImg("images/desk/IMG_2218_Pencil_30w.png");
	// testObject.style('transform','translate(' + 50 + 'px) rotate(' + 25 + 'deg)');
	// testObject.position(20, 20);
	// testObject.mouseOver(testOver);
	// testObject.mouseOut(testOut);
	// testObject.mousePressed(testClick);

	// testObject2 = createImg("images/desk/IMG_2244_Mug_306w_NL.png");
	// testObject2.position(100, 100);
	// testObject2.mouseOver(testOver);
	// testObject2.mouseOut(testOut);
	// testObject2.mousePressed(testClick);

	// testPara = createP("This is a test.")
	// testPara.mouseOver(testChangeBackground);
	// testPara.mouseOut(testRevertBackground);

	// testObject3 = select("#img-pencil");
	// testObject3.mouseOver(testOver);
	// testObject3.mouseOut(testOut);
	// testObject3.mousePressed(testClick);
	// // testObject3.drag(testDrag);
	// myTest = new TestDeskObject(testObject3, testObject3.elt.x, testObject3.elt.y);
	// console.log(testObject3.elt.x);
	// console.log(testObject3.elt.y);
}

// function testChangeBackground() {
// 	testPara.style('background-color', 'pink');
// 	cursor(HAND);
// }

// function testRevertBackground() {
// 	testPara.style('background-color', 'white');
// 	cursor(ARROW);
// }



// function testOut() {
// 	console.log("out");
// 	cursor(ARROW);
// }

// function testClick() {
// 	console.log("click");
// }

// function testDrag() {
// 	console.log("drag");
// }

// After setup is run, draw runs continuously at 60 fps
function draw() {

	currentTime = millis();

	// clear background
	// clear();
	push();
		imageMode(CORNER);
		if(playing) {
			image(vidCeiling, 0, 0, windowWidth, windowHeight);
		} else {
			image(imgCeiling, 0, 0, windowWidth, windowHeight);
		}
		ellipseMode(CENTER);
		noStroke();
		// fill(200);
		noFill();
		var fanX = windowWidth - 40;
		var fanY = windowHeight - 200;
		var fanWidth = 150;
		var fanHeight = 150;
		ellipse(fanX, fanY, fanWidth, fanHeight);
    		
		// get distance between mouse and circle
		distanceFan = dist(mouseX, mouseY, fanX, fanY); 
		  
		// if the distance is less than the circle's radius
		if (distanceFan < fanWidth/2) {
		    hoverOverFan = true;
		} else {
		    hoverOverFan = false;
		}
	pop();

  	// *************************************
  	// TEST
  	// *************************************
	  
	// myTest.display();

  	// *************************************
  	// LAMP - enters right to left
  	// *************************************

	if (myLamp.x < myLamp.brakeX) {
	    myLamp.brake();
	} 
	  
	myLamp.drive();
	  
	myLamp.displayLamp();


	// *************************************
  	// MUG - enters left to right
  	// *************************************

	if (myMug.x > myMug.brakeX) {
	    myMug.brake();
	} 
	  
	myMug.drive();
	  
	myMug.displayPush(); 

	// *************************************
  	// PAPER TOWEL - enters top to bottom
  	// *************************************

	if (myPaperTowel.y > myPaperTowel.brakeY) {
	    myPaperTowel.brake();
	} 
	  
	myPaperTowel.drive();
	  
	myPaperTowel.displayPush();

	// *************************************
  	// PEN - enters left to right
  	// *************************************

	if (myPen.x > myPen.brakeX) {
	    myPen.brake();
	} 
	  
	myPen.drive();
	  
	myPen.displayPush();

	// *************************************
  	// PENCIL - enters left to right
  	// *************************************

	// if (myPencil.x > myPencil.brakeX) {
	//     myPencil.brake();
	// } 
	  
	// myPencil.drive();
	  
	// myPencil.displayPush();

	// *************************************
  	// CRUMBS - enters bottom to top
  	// *************************************

	if (myCrumbs.y < myCrumbs.brakeY) {
	    myCrumbs.brake();
	} 
	  
	myCrumbs.drive();
	  
	myCrumbs.displayCrumbs();

	// *************************************
  	// LOZENGES - enters right to left
  	// *************************************

	if (myBetOnYourself.x < myBetOnYourself.brakeX) {
		myBetOnYourself.brake();
	}

	myBetOnYourself.drive();

	myBetOnYourself.displayPush();

	if (myInspireEnvy.x < myInspireEnvy.brakeX) {
		myInspireEnvy.brake();
	}

	myInspireEnvy.drive();

	myInspireEnvy.displayPush();


	if (hoverOverFan == true) {
	// cursor(HAND);
		testOver();
	} 
	else if (myLamp.hoverOver == true) {
	    // cursor(HAND);
	    testOver();
	} 
	else if (myPaperTowel.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myMug.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myPen.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myPencil.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myCrumbs.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myBetOnYourself.hoverOver == true) {
		cursor(HAND);
	} 
	else if (myInspireEnvy.hoverOver == true) {
		cursor(HAND);
	}
	else {
		cursor(ARROW);
	}

}

function testOver() {
	console.log("over");
	cursor(HAND);
	push();
		noStroke();
		fill('rgba(0,255,0, 0.25)');
		ellipse(mouseX, mouseY, 10, 10);
	pop();
}

function mouseDragged() {
	if (myBetOnYourself.hoverOver == true) {
		myBetOnYourself.drag();
 	}
 	else if (myInspireEnvy.hoverOver == true) {
		myInspireEnvy.drag();
 	}
	else if (myPen.hoverOver == true) {
		myPen.drag();
 	}
 	else if (myPencil.hoverOver == true) {
		myPencil.drag();
 	}
  	else if (myPaperTowel.hoverOver == true) {
  		myPaperTowel.drag();		  	
 	}
 	else if (myMug.hoverOver == true) {
 		myMug.drag();
 	}
 	else if (myCrumbs.hoverOver == true) {
		myCrumbs.drag();
 	}
 	
}

function mousePressed() {
 	if (hoverOverFan == true) {
	 	if (!playing) {
		    vidCeiling.play();
		    // vidCeiling.time((mouseX/width) * vidCeiling.duration());
		    playing = true;
		    console.log("click fan " + playing);
		}
		else {
		    vidCeiling.pause();
		    playing = false;
		}
	}

	if (myLamp.hoverOver == true) {
		if (myLamp.lampOn == false) {
   			myLamp.lampOn = true;
    		// if (playing == true) {
    		// 	vidCeiling.pause();
    		// 	playing = false;
    		// }
		} else if (myLamp.lampOn == true) {
    		myLamp.lampOn = false;
		}
 	}
	else if (myBetOnYourself.hoverOver == true) {
	 	myBetOnYourself.clickOn();
	}
	else if (myInspireEnvy.hoverOver == true) {
		myInspireEnvy.clickOn();
	}
	else if (myPen.hoverOver == true) {
		myPen.clickOn();
	}
	else if (myPencil.hoverOver == true) {
		myPencil.clickOn();
	}
	else if (myPaperTowel.hoverOver == true) {
		myPaperTowel.clickOn();
	}
	else if (myMug.hoverOver == true) {
		myMug.clickOn();
	}
	else if (myCrumbs.hoverOver == true) {
		myCrumbs.clickOn();
	}
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    vidCeiling.pause();
    button.html('play');
  } else {
    vidCeiling.loop();
    button.html('pause');
  }
  playing = !playing;
}

function TestDeskObject(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;

	this.display = function() {
	   	image(this.img, this.x, this.y);
	   	console.log("test desk object");
	}

}

function DeskObject(img, startX, startY, brakeX, brakeY, speed, rotation) {
	this.img = img;
	this.startX = startX;
	this.startY = startY;
	this.brakeX = brakeX;
	this.brakeY = brakeY;
	this.speed = speed;
	this.rotation = rotation;
	this.x = startX;
	this.y = startY;
	// this.totalDuration = duration;
	// this.brakeDuration = 60;
	// this.steadyDuration = 0;
	this.xrateChange = 0.2;
	this.yrateChange = 0.2;
	this.hoverOver = false;
	this.distance;
	this.dx;
	this.dy;
	this.angle1 = 0.0,
	this.pushZoneRadius = this.img.width/2;
	this.zoneOffsetX = 0;
	this.zoneOffsetY = 0;
	
	// LAMP VARIABLE
	this.lampOn = false;

	// drive method
  	this.drive = function() {

  		// HORIZONTAL MOVEMENT
  		// if moving left to right
  		if (this.brakeX > this.startX) { 
    		this.x = this.x + this.speed;
    	}
    	// if moving right to left
  		else if (this.brakeX < this.startX) {
    		this.x = this.x - this.speed;
  		}

  		// VERTICAL MOVEMENT
  		// if moving top to bottom
  		if (this.brakeY > this.startY) { 
    		this.y = this.y + this.speed;
    	}
    	// if moving bottom to top
  		else if (this.brakeY < this.startY) { 
    		this.y = this.y - this.speed;
  		}
  	}
 
  	// brake method
  	this.brake = function() {

  		// HORIZONTAL MOVEMENT
		if (this.speed > 0) {
   			this.speed = this.speed - this.xrateChange;
    	} else {
      		this.speed = 0;
    	}  
  
  		// VERTICAL MOVEMENT
		if (this.speed > 0) {
   			this.speed = this.speed - this.yrateChange;
    	} else {
      		this.speed = 0;
    	}  
  		     
  	}

	this.clickOn = function() {

		// when mouse pressed, calculate difference between mouse and center of image
	  	this.dx = mouseX - this.x;
		this.dy = mouseY - this.y;

	}

	this.drag = function() {

		// when dragging, update position of image
		this.x = mouseX - this.dx - this.zoneOffsetX;
		this.y = mouseY - this.dy - this.zoneOffsetY;

	}

  	
  	// GENERAL display method (unique objects have separate display methods)
  	this.display = function() {
  		
  		push();

  			// this.rotation = 0;
  			rotate(this.rotation);
	   		image(this.img, this.x, this.y);

	   		// if image is long/narrow, then use rectangle as click zone
	   		// otherwise use circle as click zone
	   		if (this.img.height/this.img.width >= 2 || this.img.width/this.img.height >= 2) {
			    
			    fill(200);
				ellipse(this.x - this.img.width/2, this.y - this.img.height/2, 10, 10); // upper left
				ellipse(this.x + this.img.width/2, this.y - this.img.height/2, 10, 10); // upper right
				ellipse(this.x - this.img.width/2, this.y + this.img.height/2, 10, 10); // bottom left
				ellipse(this.x + this.img.width/2, this.y + this.img.height/2, 10, 10); // bottom right

				if (mouseX >= this.x - this.img.width/2 // left edge
			    	&& mouseX <= this.x + this.img.width/2 // right edge
					&& mouseY >= this.y - this.img.height/2 // top edge 
					&& mouseY <= this.y + this.img.height/2 // bottom edge
					) 
				{
					this.hoverOver = true;

				} else {
					this.hoverOver = false;
				}

	   		} else {
				// get distance between mouse and image
				this.distance = dist(mouseX, mouseY, this.x, this.y); 
				  
				// if the distance is less than the image
				if (this.distance < this.img.width/2) {
				    this.hoverOver = true;
				} else {
				    this.hoverOver = false;
				}
	   		}

	    pop();

	}

	// LAMP display method
	this.displayLamp = function() {

   		image(this.img, this.x, this.y);

   		// LAMP HEAD VARIABLES
	    this.headX = this.x - this.img.width * 0.38;
		this.headY = this.y + this.img.height * 0.35;
		this.radiusMultiplier = 1;
		this.widthHead = 80;
		this.heightHead = 80;

	    // turn on lamp
	    if (this.lampOn == true) {
			noStroke();
			fill(255, 255, 255, 2);
			for (var radiusGlow = 20; radiusGlow <= 650; radiusGlow += 8) {
				this.radiusMultiplier = this.radiusMultiplier + 0.0001;
				r = radiusGlow * this.radiusMultiplier;
				ellipse(mouseX, mouseY, r, r);
			}
			tint(0, 153, 204, 126);
		} else {
			noTint();
		}
    		
		// get distance between mouse and circle
		this.distance = dist(mouseX, mouseY, this.headX, this.headY); 
		  
		// if the distance is less than the circle's radius
		if (this.distance < this.widthHead/2) {
		    this.hoverOver = true;
		} else {
		    this.hoverOver = false;
		}

	    // draw a circle
	 	// 	push();
		// 	stroke(100);
		// 	strokeWeight(10);
		// 	if (this.hoverOver == true) {
		// 	    fill(100);
		// 	} else {
		// 	    fill(200); 
		// 	}
		// 	ellipse(this.headX, this.headY, this.widthHead, this.heightHead);
		// pop();
	}

	// PUSH display method
  	this.displayPush = function() {

		this.angle1 = 0.0,

		// assign size of push zone
		this.pushZoneRadius = this.img.width/2;
		// assign size of click zone
		this.clickZoneRadius = this.pushZoneRadius + 10;

  		// calculate angle between mouse and center of image
	  	this.dx = mouseX - this.x;
	  	this.dy = mouseY - this.y;
	  	this.angle1 = atan2(this.dy, this.dx);

	  	// calculate distance between mouse and center of image
		this.distance = dist(mouseX, mouseY, this.x, this.y);

		// if mouse inside push zone, then push image
	  	if (this.distance < this.pushZoneRadius) {
	  		this.x = mouseX - (cos(this.angle1) * this.pushZoneRadius);
	  		this.y = mouseY - (sin(this.angle1) * this.pushZoneRadius);
	  	}

		// if mouse inside click zone, then allow click and drag
		if (this.distance < this.clickZoneRadius) {
			this.hoverOver = true;
		} else {
			this.hoverOver = false;
		}

	  	image(this.img, this.x, this.y);

	}

	// CRUMBS display method
	this.displayCrumbs = function() {
		
		this.angle1 = 0.0,

		// assign radius size different from image
		this.pushZoneRadius = 50;

		this.clickZoneRadius = this.pushZoneRadius + 10;

		// assign center of push zone
	    this.pushZoneX = this.x - this.img.width * 0.25;
		this.pushZoneY = this.y + this.img.height * 0.05;
		// difference between center of push zone and center of image
		this.zoneOffsetX = this.pushZoneX - this.x;
		this.zoneOffsetY = this.pushZoneY - this.y;

  		// calculate angle between mouse and center of push zone
	  	this.dx = mouseX - this.pushZoneX;
	  	this.dy = mouseY - this.pushZoneY;
	  	this.angle1 = atan2(this.dy, this.dx);

	  	// calculate distance between mouse and center of push zone
		this.distance = dist(mouseX, mouseY, this.pushZoneX, this.pushZoneY);

		// if mouse inside push zone, then push
	  	if (this.distance < this.pushZoneRadius) {
	  		this.x = (mouseX - this.zoneOffsetX) - (cos(this.angle1) * this.pushZoneRadius) ;
	  		this.y = (mouseY - this.zoneOffsetY) - (sin(this.angle1) * this.pushZoneRadius) ;
	  	}

	  	// if mouse inside click zone, then allow click and drag
		if (this.distance < this.clickZoneRadius) {
			this.hoverOver = true;
		} else {
			this.hoverOver = false;
		}

		// fill(200);
		// ellipse(this.pushZoneX, this.pushZoneY, this.pushZoneRadius * 2);
		// fill(100);
		// ellipse(this.x, this.y, this.pushZoneRadius * 2);
		image(this.img, this.x, this.y);
	}

}