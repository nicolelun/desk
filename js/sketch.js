var imgCeiling;
var imgLamp;
var imgMug;
var imgPaperTowel;
var imgPen;
var imgPencil;
var imgCrumbs;
var imgInspireEnvy;
var imgBetOnYourself;
var imgTin;
var imgPlant;
var imgGlass;
var imgBox;

// var myCeiling;
var myFan;
var myLamp;
var myMug;
var myPaperTowel;
var myPen;
var myPencil;
var myCrumbs;
var myInspireEnvy;
var myBetOnYourself;
var myTin;
var myPlant;
var myGlass;
var myBox;

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

var objects = [];

var angle1 = 0;
var angle2 = 0;
var scalar = 70;

p5.disableFriendlyErrors = true;

function preload() {
	imgCeiling = loadImage("images/ceiling2.jpg");
	imgLamp = loadImage("images/IMG_2235_Lamp_369x264.png");
	imgMug = loadImage("images/IMG_2244_Mug_306x259.png");
	imgPaperTowel = loadImage("images/IMG_2209_PaperTowel_378x401.png");
	imgPen = loadImage("images/IMG_2249_Pen_45x425.png");
	imgPencil = loadImage("images/IMG_2218_Pencil_30x529.png");
	imgCrumbs = loadImage("images/IMG_2247_ButterfingerCrumbs_575w.png");
	imgBetOnYourself = loadImage("images/IMG_2222_BetOnYourself_49x159.png");
	imgInspireEnvy = loadImage("images/IMG_2222_InspireEnvy_59x162.png");
	imgTin = loadImage("images/IMG_2192_PaperClipTin_139x137.png");
	imgBox = loadImage("images/IMG_2199_Box_449x295.png");
	imgPlant = loadImage("images/IMG_2204_Plant_423x387.png");
	imgGlass = loadImage("images/IMG_2221_Glass_262x212.png");
	imgHand = loadImage("images/hand_icon.svg");
}

// Setup runs ONCE at the start of the sketch
function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	imageMode(CENTER);
	rectMode(CENTER);
	ellipseMode(CENTER);
	angleMode(DEGREES);
	colorMode(RGB, 255);
	noTint();

	startTime = millis();

	dragging = false;

	vidCeiling = createVideo('media/Ceiling.mov');
	vidCeiling.size(windowWidth, windowHeight);
	vidCeiling.position(0, 0);
	vidCeiling.style('z-index', -1);
  	// button = createButton('play');
  	// button.mousePressed(toggleVid); // attach button listener

  	myFan = new Fan();
  	myWindow = new Window();

	// object parameters: image, startX, startY, brakeX, brakeY, speed, rotate
	// var originX = width/2;
	var originX = -100;
	var originXRight = width + 100;
	var originY = height/2;

	//LEFT SIDE
	myPencil = new DeskObject(imgPencil, originX, height * 0.5, width * 0.09, 0, 0, 1);
	myPen = new DeskObject(imgPen, originX, height * .75, width * 0.15, 0, 0, -2); 
	myTin = new DeskObject(imgTin, originX, height * 0.8, width * 0.15, 0, 0, 0);
	myMug = new DeskObject(imgMug, originX, height * 0.5, width * 0.30, 0, 0, 0);
	myPaperTowel = new DeskObject(imgPaperTowel, originX, height * 0.7, width * .5, 0, 10, 0);
	myCrumbs = new DeskObject(imgCrumbs, originX, height * 0.75, width * 0.5, 0, 0, 0);
	myBox = new DeskObject(imgBox, originX, height * 0.1, width * 0.3, 0, 0, 0);

	// RIGHT SIDE
	myLamp = new DeskObject(imgLamp, originX, 120, width * 0.6, 0, 0, 0);
	myPlant = new DeskObject(imgPlant, originX, height * 0.45, width * 0.9, 0, 0, 0);
	myGlass = new DeskObject(imgGlass, originX, height * 0.85, width * 0.8, 0, 0, 0);
	myBetOnYourself = new DeskObject(imgBetOnYourself, originX, height * 0.15, width * 0.9, 0, 0, 0);
	myInspireEnvy = new DeskObject(imgInspireEnvy, originX, height * 0.2, width * 0.85, 0, 0, 1);

	objects = [
		{id: 'box', obj: myBox},
		{id: 'mug', obj: myMug},
		{id: 'paperTowel', obj: myPaperTowel},
		{id: 'pen', obj: myPen},
		{id: 'pencil', obj: myPencil},
		{id: 'plant', obj: myPlant},
		{id: 'glass', obj: myGlass},
		{id: 'bet', obj: myBetOnYourself},
		{id: 'inspire', obj: myInspireEnvy},
		{id: 'tin', obj: myTin},
	];

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	myFan = new Fan();
	myWindow = new Window();
}

// After setup is run, draw runs continuously at 60 fps
function draw() {

  	// *************************************
  	// LAMP, WINDOW, FAN
  	// *************************************
	
	myFan.displayFan();

	// myWindow.hoverOver();

	myLamp.drive();
	myLamp.createLampZone();
	myLamp.displayLamp();

    if (myLamp.lampOn == true) {
		myLamp.toggleLamp();
	}
	else if (myWindow.windowOn == true) {
		myWindow.toggleWindow();
	} else {
		noTint();
		colorMode(RGB, 255);
	}

	// *************************************
  	// HOVER HAND for BACKGROUND
  	// *************************************

	if (myLamp.hoverOver == true) {
		if (myLamp.lampOn == false) {
			myLamp.highlightLamp();
		}
		mouseOver();
	} else if (myWindow.hoverOver() == true) {
		if (myWindow.windowOn == false) {
			myWindow.highlightWindow();
		}
		mouseOver();
	} else if (myFan.hoverOver() == true && myLamp.lampOn == false && myWindow.windowOn == false) {
		if (myFan.fanOn == false) {
			myFan.highlightFan();
		}
		mouseOver();
	}

	// *************************************
  	// OBJECT ARRAY
  	// *************************************

  	for (var i = 0; i < objects.length; i++) {
  		if (objects[i].obj.enter == true) {
	  		objects[i].obj.drive();
	  	} else {
	  	// } else if (myLamp.lampOn == false && myWindow.windowOn == false && myFan.fanOn == false) {
	  		objects[i].obj.drift();
	  	}
  		objects[i].obj.createZone();
  		objects[i].obj.displayObject();
  		// objects[i].obj.hoverDisplayHand();
  		objects[i].obj.hoverResetDrift();

  	}

	// *************************************
  	// CRUMBS - enters bottom to top
  	// *************************************

	if (myCrumbs.enter == true) {
		myCrumbs.drive();  
	} else {
		myCrumbs.drift();
	}
	myCrumbs.createCrumbZone();
	myCrumbs.displayCrumbs();
	myCrumbs.hoverResetDrift();


}

function Fan() {

	// FAN HEAD
	this.x = windowWidth * 0.98;
	this.y = windowHeight * 0.76;
	this.width = 145;
	this.height = 145;

	// FAN VIDEO
	this.fanOn = false;

	this.displayFan = function() {

		push();

			imageMode(CORNER);

			if (this.fanOn == true) {
				image(vidCeiling, 0, 0, windowWidth, windowHeight);
			    vidCeiling.play();
			} else {
				image(imgCeiling, 0, 0, windowWidth, windowHeight);
			    vidCeiling.pause();
			}
			
		pop();
		
	}

	// hover over fan head
	this.hoverOver = function() {

		// get distance between mouse and circle
		this.distance = dist(mouseX, mouseY, this.x, this.y); 
		  
		// if the distance is less than the circle's radius
		if (this.distance < this.width/2) {
		    return(true);
		} else {
		    return(false);
		}
	}

	this.highlightFan = function() {
		push();
			noStroke();
			fill('rgba(255,20,147,0.1)');
			ellipse(this.x, this.y, this.width, this.height);
		pop();
	}
}

function Window() {

	this.x = width * .05;
	// this.x = width * .2;
	this.y = height/2;
	this.width = 200;
	this.height = height * .9;
	this.windowOn = false;

	this.hoverOver = function() {
		this.zoneLeft = this.x - this.width/2;
		this.zoneRight = this.x + this.width/2;
		this.zoneTop = this.y - this.height/2;
		this.zoneBottom = this.y + this.height/2;

		// click zone
		this.clickPadding = 0;
		this.clickZoneLeft = this.zoneLeft - this.clickPadding;
		this.clickZoneRight = this.zoneRight + this.clickPadding;
		this.clickZoneTop = this.zoneTop + this.clickPadding;
		this.clickZoneBottom = this.zoneBottom - this.clickPadding;

		// if mouse inside click zone
		if (mouseX >= this.clickZoneLeft && // inside left side
			mouseX <= this.clickZoneRight &&  // inside right side
		    mouseY >= this.clickZoneTop &&  // inside top
		    mouseY <= this.clickZoneBottom) // inside bottom
			{
		    return(true);			    
		} 
		// if mouse outside click zone
		else {
		    return(false);
		}
	}

	this.highlightWindow = function() {
		var x1 = 0;
		var y1 = 0;
		var x2 = width * .13;
		var y2 = height * .18;
		var x3 = x2;
		var y3 = height;
		var x4 = x1;
		var y4 = height;

		push();
			noStroke();
			fill('rgba(255,20,147,0.1)');
			// rect(this.x, this.y, this.width, this.height);
			quad(x1,y1,x2,y2,x3,y3,x4,y4);
		pop();
	}

	this.toggleWindow = function() {

		// turn window light on/off
	    if (this.windowOn == true) {
			colorMode(HSB, 360, 100, 100, 1);
			this.hue = map(mouseX, 0, width, 0, 70);
			tint(this.hue, 50, 100, 50);
		} else {
			colorMode(RGB, 255);
			noTint();
		}
	}
}

function mouseOver() {
	image(imgHand, mouseX, mouseY, 30, 44.96377);
}

function toggleTint() {
	if (myLamp.lampOn == true) {
		myLamp.toggleLamp();
	}
	else if (myWindow.windowOn == true) {
		myWindow.toggleWindow();
	} else {
		noTint();
		colorMode(RGB, 255);
	}
}

function mousePressed() {
 	
 	// turn fan on/off
 	if (myFan.hoverOver() == true) {
 		// turn fan on, if lamp and window are off
 		if (myFan.fanOn == false && myLamp.lampOn == false && myWindow.windowOn == false) {
 			myFan.fanOn = true
 		} 
 		// turn fan off
 		else if (myFan.fanOn == true) {
 			myFan.fanOn = false;
 		}
	}

	// turn lamp on/off
	if (myLamp.hoverOver == true) {
		// turn lamp on
		if (myLamp.lampOn == false) {
   			myLamp.lampOn = true;
   			myWindow.windowOn = false;
			myFan.fanOn = false;
		} 
		// turn lamp off
		else if (myLamp.lampOn == true) {
    		myLamp.lampOn = false;
		}
 	} 
 	// turn window on/off
 	else if (myWindow.hoverOver() == true) {
 		// turn window on
 		if (myWindow.windowOn == false) {
   			myWindow.windowOn = true;
   			myLamp.lampOn = false;
			myFan.fanOn = false;
		} 
		// turn window off
		else if (myWindow.windowOn == true) {
    		myWindow.windowOn = false;
		}
 	}

 	// calculate distance to allow drag of object
 	for (var i = 0; i < objects.length; i++) {
		if (objects[i].obj.hoverOver == true) {
			objects[i].obj.calcDistance();
		}
	}
}

function mouseDragged() {
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].obj.hoverOver == true) {
			objects[i].obj.drag();
		}
	}
}

function DeskObject(img, startX, startY, brakeX, brakeY, speed, rotation) {
	this.img = img;
	this.startX = startX;
	this.startY = startY;
	this.brakeX = brakeX;
	this.brakeY = brakeY;
	this.rotation = rotation;
	this.x = startX;
	this.y = startY;

	// DRIVE (INITIAL ENTRY)
	this.enter = true;
	this.xrateChange;
	this.xrateMultiplier = 3;
	this.stopX = brakeX;
	this.stopY = brakeY;

	// PUSH, CLICK, HOVER, DRAG
	this.hoverOver = false;
	this.dx;
	this.dy;
	this.distance;
	this.angle1 = 0,
	this.pushZoneRadius = this.img.width/2;
	this.zoneOffsetX = 0;
	this.zoneOffsetY = 0;
	
	// DRIFT	
	this.angleA = 0;
	this.angleB = 0;
	this.angleAStep = random(-20,20);
	this.angleBStep = random(-15,15);
	this.scalarA = random(50,70);
	this.scalarB = random(50,200);
	this.updateStopX = false;
	this.scaleMax = 1;
	this.scaleMin = random(0.85, 0.95);
	this.scaleSize = this.scaleMax;
	this.scaleStep = 0.0005;
	this.scaleMultiplier = 0.7;
	this.pauseX;
	this.pauseY;

	// LAMP VARIABLE
	this.lampOn = false;

  	// DRIVE (INITIAL ENTRY)
  	this.drive = function() {

  		// HORIZONTAL MOVEMENT
		// speed change is log of absolute value of difference between current x and brakeX
		this.xrateChange = log(abs(this.x - this.brakeX)) * this.xrateMultiplier;

		// if moving in positive direction left to right
		if (this.brakeX > this.startX && this.xrateChange > 0) {
			this.x = this.x + this.xrateChange;
		}
		// if moving in negative direction from right to left
		else if (this.brakeX < this.startX && this.xrateChange > 0) {
			this.x = this.x - this.xrateChange;
		}
		// if ready to stop
		else {
			this.xrateChange = 0;
			this.enter = false;
			this.stopX = this.x;
			this.stopY = this.y;
		}

		// if (this.brakeX > this.startX) {
		// 	if (this.x >= this.brakeX && this.speed > 0) {
		// 		this.speed = this.speed - this.xrateChange;
		// 	} else if (this.speed < 0) {
		// 		this.speed = 0;
		// 	}
		// } 
		// else if (this.brakeX < this.startX) {
		// 	if (this.x <= this.brakeX && this.speed < 0) {
		// 		this.speed = this.speed + this.xrateChange;
		// 	} else if (this.speed > 0) {
		// 		this.speed = 0;
		// 	}
		// } 

  	}

  	// CONTINUOUS DRIFT
  	this.drift = function() {

  		// allow drift if mouse not hovering over object
  		if (this.hoverOver == false) {

  			// set angle to radians
  			this.ang1 = radians(this.angleA);
			this.ang2 = radians(this.angleB);

			this.x = (this.stopX - this.scalarA) + (this.scalarA * cos(this.ang1));
			this.y = this.stopY + (this.scalarB * sin(this.ang2));

			this.angleA += this.angleAStep;
			this.angleB += this.angleBStep;
  		}
  	}

	this.hoverDisplayHand = function() {
		if (this.hoverOver == true) {
			image(imgHand, mouseX, mouseY);
		} 
	}

	this.hoverResetDrift = function() {
		if (this.hoverOver == true) {
			this.updateStopX = true;
		} 
		if (this.hoverOver == false && this.updateStopX == true) {
			// capture current location of object 
			this.stopX = this.x;
			this.stopY = this.y;

			// reset angles for drift calculation
			this.angleA = 0;
			this.angleB = 0;

			// reset flag
			this.updateStopX = false;
		}
	}

	this.intersects = function(other) {
		var d = (this.x, this.y, other.x, other.y);
		if (d < this.r + other.r) {
			return true;
		} else {
			return false;
		}
	}

	this.calcDistance = function() {
		// capture difference between mouse and center of object
	  	this.dx = mouseX - this.x;
		this.dy = mouseY - this.y;
	}

	this.drag = function() {
		// update position of object
		this.x = mouseX - this.dx - this.zoneOffsetX;
		this.y = mouseY - this.dy - this.zoneOffsetY;
	}

	this.createZone = function() {
		
		// if elongated object, create rectangular zone
		if (this.img.height/this.img.width >= 2 || this.img.width/this.img.height >= 2) {

			this.zoneLeft = this.x - this.img.width/2;
			this.zoneRight = this.x + this.img.width/2;
			this.zoneTop = this.y - this.img.height/2;
			this.zoneBottom = this.y + this.img.height/2;

			// click zone
			this.clickPadding = 0;
			this.clickZoneLeft = this.zoneLeft - this.clickPadding;
			this.clickZoneRight = this.zoneRight + this.clickPadding;
			this.clickZoneTop = this.zoneTop + this.clickPadding;
			this.clickZoneBottom = this.zoneBottom - this.clickPadding;

			// push zone
			this.pushPadding = -10;
			this.pushZoneLeft = this.zoneLeft - this.pushPadding;
			this.pushZoneRight = this.zoneRight + this.pushPadding;
			this.pushZoneTop = this.zoneTop - this.pushPadding;
			this.pushZoneBottom = this.zoneBottom + this.pushPadding;

			// if mouse inside click zone
			if (mouseX >= this.clickZoneLeft && // inside left side
				mouseX <= this.clickZoneRight &&  // inside right side
			    mouseY >= this.clickZoneTop &&  // inside top
			    mouseY <= this.clickZoneBottom) // inside bottom
				{

			    this.hoverOver = true;			    

			    // if mouse inside push zone
				// if mouse on left side
			 	if (mouseX < this.pushZoneLeft) {
					this.x = mouseX + (this.img.width/2);
				} 
			    // if mouse on right side
				else if (mouseX > this.pushZoneRight) {
					this.x = mouseX - (this.img.width/2);
				} 
				// if mouse on top side
				// else if (mouseY > this.pushZoneTop) {
				// 	this.y = mouseY - (this.img.height/2);
				// } 
				// if mouse on bottom side
				// else if (mouseY < this.pushZoneBottom) {
				// 	this.y = mouseY + (this.img.height/2);
				// }

			} 
			// if mouse outside click zone
			else {
			    this.hoverOver = false;
			}

		}	

		// if equal-sided object, create circular zone
		else {

			this.angle1 = 0;
			this.clickZonePadding = 0;
			// this.pushZonePadding = 0 - (this.img.width * .15);
			this.pushZonePadding = -20;

			// assign size of click zone
			this.clickZoneRadius = this.img.width/2 + this.clickZonePadding;
			// assign size of push zone
			this.pushZoneRadius = this.img.width/2 + this.pushZonePadding;
			
	  		// calculate angle between mouse and center of image
		  	this.dx = mouseX - this.x;
		  	this.dy = mouseY - this.y;
		  	this.angle1 = atan2(this.dy, this.dx);

		  	// calculate distance between mouse and center of image
			this.distance = dist(mouseX, mouseY, this.x, this.y);

			// if mouse inside click zone, then allow click and drag
			if (this.distance < this.clickZoneRadius) {
				
				this.hoverOver = true;

				// if mouse inside push zone, then push image
			  	if (this.distance < this.pushZoneRadius) {
			  		this.x = mouseX - (cos(this.angle1) * this.pushZoneRadius);
			  		this.y = mouseY - (sin(this.angle1) * this.pushZoneRadius);
			  	}
			} 
			// if mouse outside click zone
			else {
				this.hoverOver = false;
			}
		}
	}

  	this.displayObject = function() {
		push();
	  		rotate(this.rotation);
			scale(this.scaleSize);
	  		image(this.img, this.x, this.y);
	  	pop();
	}

	this.createLampZone = function() {
		// create lamp head
	    this.headX = this.x - this.img.width * 0.38;
		this.headY = this.y + this.img.height * 0.35;
		this.widthHead = 80;
		this.heightHead = 80;
    		
		// get distance between mouse and circle
		this.distance = dist(mouseX, mouseY, this.headX, this.headY); 
		  
		// if the distance is less than the circle's radius
		if (this.distance < this.widthHead/2) {
		    this.hoverOver = true;
		} else {
		    this.hoverOver = false;
		}
	}

	this.toggleLamp = function() {
		this.radiusMultiplier = 1;

		// turn lamp light on/off
	    if (this.lampOn == true) {
					
			colorMode(RGB, 255);
			
			// create light
			noStroke();
			push();
				fill(255, 255, 255, 2);
				for (var radiusGlow = 20; radiusGlow <= 650; radiusGlow += 8) {
					this.radiusMultiplier = this.radiusMultiplier + 0.0001;
					r = radiusGlow * this.radiusMultiplier;
					ellipse(mouseX, mouseY, r, r);
				}
			pop();
			// tint scene
			tint(0, 153, 204, 126);

		} else {
			noTint();
		}
	}

	// display lamp
	this.displayLamp = function() {
   		image(this.img, this.x, this.y);
	}

	this.highlightLamp = function() {
		push();
  			noStroke();
			fill('rgba(255,20,147,0.1)');
		  	ellipse(this.headX, this.headY, this.widthHead, this.heightHead);
		pop();
	}

	this.createCrumbZone = function() {
		
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
	  		this.x = (mouseX - this.zoneOffsetX) - (cos(this.angle1) * this.pushZoneRadius);
	  		this.y = (mouseY - this.zoneOffsetY) - (sin(this.angle1) * this.pushZoneRadius);
	  	}

	  	// if mouse inside click zone, then allow click and drag
		if (this.distance < this.clickZoneRadius) {
			this.hoverOver = true;
		} else {
			this.hoverOver = false;
		}
	}

	this.displayCrumbs = function() {
		
		// fill(200);
		// ellipse(this.pushZoneX, this.pushZoneY, this.pushZoneRadius * 2);
		// fill(100);
		// ellipse(this.x, this.y, this.pushZoneRadius * 2);
		image(this.img, this.x, this.y);

	}

}