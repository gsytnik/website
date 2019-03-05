var score = 0;

var nearbyPlatform = false;

var start = true;

var platforms = [];

var rpd;

var g = 1;
var b = 2;
var r = 3;

var maxHeight;

/*
game start, finish, death, win variables
*/
var title = true;
var leftLegR;
var rightLegR;
var leftLegDown = false;
var rightLegDown = true;



var gameStart = false;
var win = false;
var dead = false;
var restart = false;
var deathX;
var deathTimer = 0;
var blood = [];

var endr = 0;
var endscreeny = 0;
//=====================================

/*
scene 1 variables
*/
var tailR = 0;
var tailDown = false;
var s1liney = 0;
var scene1g = 20;


/*
scene 2 variables
*/
var mountain;

/*
scene 3 variables
*/
var s3liney = 600;
var s3r= 0;
var airplanePoint = [];
var vx = [];

/*
scene 4 variables
*/
var space;

//sceneHeights
var scene1y,scene2y,scene3y,scene4y;

function preload() {
  space = loadImage('./javaScript/1space.jpg');
  mountain = loadImage('./javaScript/1mountain.jpg');
}

function setup() {


	createCanvas(500,600);

	player = new Player(width*2/3,height*4/5);

	maxHeight = height/2 - player.h;

	rpd = random(20,40);

	for(var i = 0; i < 12; i++) {

    	let pX = random(width-50);
    	let pY = random(45*i-1,50*i - 1);

    	platforms.push(new Platform(pX,pY,50,diceRoll(),10));
	}

	//starting platform
	platforms.push(new Platform(0,height-30,width,1,30));

	//title frog
	leftLegR = PI/20;
    rightLegR = -PI/20;

	//scene height setup
	scene1y = 0;
	scene2y = -height;
	scene3y = -2*height;
	scene4y = -3*height;

	//scene 3 setup
	for (var i = 0; i < 7; i++)
	{

    	airplanePoint[i] = createVector(random(600, 800),random(0,200));
    
    	vx[i] = random(-4,-2);
	}


}

function draw() {

    if(title) {
    	drawTitle();
    }



    if(gameStart) {
		drawScene();
		scrollScene();
	    
		
	    
		showPlatforms();

		playerMaxHeight();

		player.show();

		playerMovement();

		player.update();

		playerDeath();

		if(deathTimer == 120) {
			gameStart = false;
			restart = true;
		}



		scorePoints();
	    
		fill(255);
		textSize(24);
		text("Score: " + score,200,50);
    }

    if(restart) {
    	deathScreen();
    }

}


/*
death function
*/
function playerDeath() {


	if(player.getY() > height && !dead) {
		deathX = player.getX();
		dead = true;

	}

	if(dead) {
		deathTimer++; 

		for(var i = 0; i < 20; i++) {

			blood.push(new Particle(deathX,height));


		}

		for(var i = blood.length-1; i > 0; i--) {
			blood[i].show();
			blood[i].update();

			if(blood[i].life <= 0) {
				blood.splice(i,1);
			}
		}

	}

}

/*
screen after player death
*/
function deathScreen() {


	

	noStroke();
	while(endscreeny < 600)
	{
		endr += .4;
		endscreeny += 1;
		strokeWeight(2);
		stroke(endr, 0, 0);
		line(0, endscreeny, width, endscreeny);
	
	}
	endscreeny = 0;
	endr = 0;

	fill(0);
	textSize(65);
	textFont("Georgia");
	text("FROGGY",120, 175);
	text("DIED", 170, 250);

	fill(200);
	rect(180,350,150,75,10);

	fill(0);
	textSize(30);
	text("Start Over", 187, 395);

	fill(255);
	textSize(24);
	text("Score: " + score,200,50);

	strokeWeight(1);




}
/*
title screen
*/
function drawTitle() {
	background(255);

	strokeWeight(0); 

	fill(30, 120, 30);
   	textSize(50);
   	textFont("Impact");
   	text("Froggy Jump", 125, 80);
   	fill(0);
   	textSize(20);
   	text("Help the frog jump to space!", 139, 115);
   	textSize(15);
   	text("Instructions:", 220, 175);
   	text("Good Luck!", 220, 265);
   	textSize(12);
   	text("Use the arrow keys to move the frog to the left and right", 120, 195);
   	text("Bounce on the platforms to move up", 120, 215);
   	text("If the frog falls below the platforms it will die", 120, 235);
   	textSize(25);

   	text("Click to Start", 190, 350);

   	strokeWeight(1);

   	drawFrog(width/2,height*4/5,1);

}

/*
user controls with mouse
*/
function mouseClicked() {
	if(title) {
		title = false;
		gameStart = true;
	}

	if(restart && (mouseX < 330 && mouseX > 180 && mouseY < 425 && mouseY > 350)) {
		resetGame();
		restart = false;
		title = true;
		gameStart = false;

	}

}

function resetGame() {

	player.transfer(width*2/3,height*4/5);
	player.setVelocity(0);

	score = 0;
  
  scene1y = 0;
  scene2y = -height;
  scene3y = -2*height;
  scene4y = -3*height;

	dead = false;
	deathTimer = 0;

	//removes old platforms
	for(var i = platforms.length-1; i > 0; i--) {
		platforms.splice(i,1);
	}

	//removes blood
	for(var i = blood.length-1; i > 0; i--) {
		blood.splice(i,1);
	}

	for(var i = 0; i < 12; i++) {

    	let pX = random(width-50);
    	let pY = random(45*i-1,50*i - 1);

    	platforms.push(new Platform(pX,pY,50,diceRoll(),10));
	}

	//starting platform
	platforms.push(new Platform(0,height-30,width,1,30));
}


/*
creats a platform if there is no platform nearby every 70 points
*/
function makePlatform() {
	console.log(rpd);
	if(score%round(rpd) == 0) {

    	let pX = random(width - 50);


    	if (!platformNear(0)) {
        	platforms.push(new Platform(pX,0,50,diceRoll(),10));
        	rpd = random(20,40);

    	}

	}


}

/*
	checks to see if a platform is within 70 pixels of the given location

*/
function platformNear(y) {

	for(var i = platforms.length-1; i > 0; i-- ) {

    	if(y <= platforms[i].getY() + rpd && y >= platforms[i].getY() - rpd) {
        	nearbyPlatform = true;
        	break;
    	} else {
        	nearbyPlatform = false;
    	}


	}

	return(nearbyPlatform);
}



/*
shows platforms and moves them.

*/
function showPlatforms() {

	for(var i = platforms.length - 1; i > 0; i--) {

   	 
   	 
   	 

    	if(scroll()) {
        	platforms[i].addY(-player.getVelocity());

    	}




    	platforms[i].show();


    	/*
    	removes platforms if they are off the bottom of the screen.
    	must be at the end of the for loop
    	*/
    	if(platforms[i].getY() >= height) {

        	platforms.splice(i,1);

    	}

	}

}


/*
	controls all aspects of player movement


*/
function playerMovement() {


	if ( keyIsDown(RIGHT_ARROW)  ) {

    	player.moveRight();


	} else if ( keyIsDown(LEFT_ARROW) ) {
    	player.moveLeft();
	} else {
    	player.standStill();
	}


	/*
    	transfers player to opposite side
    	if he goes past edges of screen
	*/
	if (player.getX() > width ) {

    	player.transfer(0,player.getY());

	}

	if (player.getX() + player.w < 0 ) {

    	player.transfer(width,player.getY());
	}

    
	for(var i = platforms.length - 1; i > 0; i--) {

    	if(checkCollision(platforms[i].getX(), platforms[i].getY(), platforms[i].w, platforms[i].thickness) && player.isFalling()) {

        	if (platforms[i].classification == 1) {


            	player.setVelocity(-12);
        	} else if (platforms[i].classification == 2) {
            	player.setVelocity(-30);
        	} else if (platforms[i].classification == 3) {
            	player.setVelocity(-12);
            	platforms.splice(i,1);
        	}
    	}


	}

}


/*
	if the player is inside a given rectangle
	with the parameters x,y,w,h - returns true.

	else returns false.
*/
function checkCollision(objectX,objectY,objectW,objectH) {

	if (player.getY() + player.h >= objectY &&
    	player.getY() + player.h <= objectY + objectH &&
    	player.getX() + player.w >= objectX &&
    	player.getX() - player.w <= objectX + objectW) {

   	 
    	return(true);

	} else {
   	 
    	return(false);
	}
}

/*
	draw background scene

*/

/*
	selects type of platform
*/
function diceRoll() {

	let dice = random(100);

	if (dice <= 70 - score/300 ) {

    	return(g);
	} else if (dice > 70 - score/300 && dice < 90) {

    	return(r);

	} else if (dice >= 90) {

    	return(b);
	}


}

/*
whether or not the background is scrolling
*/
function scroll() {

	if (!player.movement) {

    	return(true);
	} else {

    	return(false);
	}


}

/*
scores points based on background movement
*/
function scorePoints() {
	if (scroll()) {

    	let tempScore = score - player.getVelocity();

    	while(score < tempScore) {
       	 
        	score++;


        	makePlatform();
    	}

   	 
	}


}
 
 /*
	if the player is above the max height, the player stops moving and the scene scrolls
	instead of the player
    
 */
function playerMaxHeight() {
	if (player.getY() < maxHeight && !player.isFalling()) {
    	player.setMovement(false);

	} else {
    	player.setMovement(true);
	}

}

function scrollScene() {

	if (scene4y <= 0) {
    	if(scroll()) {
            	scene1y -= player.getVelocity()*(.07);
            	scene2y -= player.getVelocity()*(.07);
            	scene3y -= player.getVelocity()*(.07);
            	scene4y -= player.getVelocity()*(.07);


    	}
	}

}

function drawScene()
{
	background(0);
	if(scene1y >= -10 && scene1y < height){
		scene1();
    }
    if(scene2y >= -height-10 && scene2y < height){
		scene2();
    }
    if(scene3y >= -height-10 && scene3y < height){
		scene3();
    }
    if(scene4y >= -height-10 && scene4y < height){
		scene4();
    }


}

//======================================Scene 1====================================================

function scene1()
{


	push();
    	translate(0, scene1y);
    	fill(40, 40, 200);
    	rect(0, 0, width, height);

    	strokeWeight(.5);
    	drawFish1(250,300);
    	drawFish2(90,140);
    	drawFish1(430,540);
    	drawFish2(190,400);
    	moveFish();
	pop();


}

function distance (x0, y0, x1, y1)
{
	return sqrt(pow(x0-x1, 2) + pow(y0-y1, 2));
}

function drawFish1(x,y)
{
	push();
    	stroke(0);
    	translate(x,y);
    	scale(1.5);

    	push();
        	rotate(tailR);
        	fill(0,110,60);
        	ellipse(20,0,25,15);   	 
        	fill(0,200,100);
        	ellipse(20,0,20,7);
    	pop();

    	fill(0,110,60);
    	ellipse(0,0,25,20);   	 
    	fill(200);
    	ellipse(-5,-2,7);
    	fill(0);
    	ellipse(-5,-2,2);

	pop();
	noStroke();

}

function drawFish2(x,y)
{
	push();
    	stroke(0);
    	translate(x,y);
    	scale(1.5);

    	push();
        	rotate(tailR);
        	fill(0,110,60);
        	ellipse(-20,0,25,15);   	 
        	fill(0,200,100);
        	ellipse(-20,0,20,7);
    	pop();

    	fill(0,110,60);
    	ellipse(0,0,25,20);   	 
    	fill(200);
    	ellipse(5,-2,7);
    	fill(0);
    	ellipse(5,-2,2);

	pop();
	noStroke();

}

function moveFish()
{
	if (tailR < -PI/20)
   {
  	tailDown = false;
   }
   if (tailR > PI/20)
   {
  	tailDown = true;
   }

   // dependinscene1g on which way we need to rotate, do so
   if (tailDown == true)
   {
  	tailR -= PI/300;
   }
   else
   {
  	tailR += PI/300;
   }
}

//======================================================Scene 2============================================


function scene2()
{
	image(mountain,0,scene2y,width,height);
}

//====================================================================Scene 3==========================================================

function scene3()
{
	push();
    	translate(0,scene3y);

    	while(s3liney > 0)
     	{
        	s3r+= .37;
        	s3liney -= 2;
        	strokeWeight(3);
        	stroke(s3r, 20, 200);
        	line(0, s3liney, 600, s3liney);
   	 
    	}
    	s3liney = 600;
    	s3r= 0;
    	makeStars();
    	updatePlane();
	pop();  
   	 
}

function makeStars() //makes stars
{    
	push();
    	translate(0,0);
    	scale(0.7);

    	stroke(255);
    	strokeWeight(5);

    	point(600 ,200);
    	point(500 ,305);
    	point(300 ,100);
    	point(555 ,70);
    	point(480 ,220);
    	point(400 ,125);
    	point(150 ,300);
    	point(70 , 225);
    	point(165 ,160);
    	point(30 ,30);
    	point(680 ,340);
    	point(50 ,375);
    	point(340 ,40);
    	point(670 ,140);

	pop();


}


function airplanes(x,y)
{
	noStroke();
	fill(255);
	push();
	scale(2);
	translate(x,y);
	beginShape();
	curveVertex(0,12);
	curveVertex(1,11);
	curveVertex(2,10);
	curveVertex(5,8.2);
	curveVertex(8,8);
	curveVertex(12,8);
	curveVertex(16,4);
	curveVertex(18,2);
	curveVertex(23,2);
	curveVertex(20,8);
	curveVertex(26,8);
	curveVertex(28,8);
	curveVertex(30,6);
	curveVertex(32,2);
	curveVertex(35,2);
	curveVertex(33.8,8);
	curveVertex(34.7,8.8);
	curveVertex(35.3,9.6);
	curveVertex(34.7,10.4);
	curveVertex(33.8,11.2);
	curveVertex(35,14);
	curveVertex(33,14);
	curveVertex(30,12);
	curveVertex(27,12.5);
	curveVertex(24,13);
	curveVertex(22,14);
	curveVertex(29,26);
	curveVertex(24,26);
	curveVertex(10,14);
	curveVertex(9,13.75);
	curveVertex(8,13.5);
	curveVertex(4,13.7);
	curveVertex(1,12.5);
	curveVertex(0,12);
	endShape();

	noFill();
	strokeWeight(.2);
	stroke(0);
	ellipse(12,11,1);
	ellipse(14,11,1);
	ellipse(16,11,1);
	ellipse(18,11,1);
	ellipse(20,11,1);

	pop();

}

function updatePlane()
{

	if (airplanePoint.length < 7) {
    	airplanePoint.push(createVector(random(600,800),random(0,200)));
    	vx.push(random(-4,-2));

	}

	for (var i = airplanePoint.length - 1; i > 0; i--)
	{
    	fill(230);
    	airplanes(airplanePoint[i].x, airplanePoint[i].y);
    	airplanePoint[i].x += vx[i];
    	if (airplanePoint[i].x + 35.3 <= 0)
    	{
        	airplanePoint.splice(i,1);
        	vx.splice(i,1);
    	}
	}    
}



function scene4()
{
	image(space, 0, scene4y, 500, 600);

    
}

function drawFrog(fx,fy,sc) {
	stroke(0);

    push();
   	 //ENTIRE FROG
   	 translate(fx, fy);
   	 scale(sc);

   	 //left arm
   	 fill(70, 200, 70);
   	 push();
   		 translate(-20, 5);
   		 quad(0, 0, 0, -10, -15, -23, -18, -20);
   		 push();
   			 translate(-16, -21);
   			 push();
   				 translate(20, -22);
   				 rotate(PI/2);
   				 rect(9, 17, 15, 2);
   				 ellipse(9, 18.5, 5);
   				 push();
   					 rotate(-PI/9);
   					 rect(1, 25, 15, 2);
   					 ellipse(1, 26, 5);
   					 rotate(-PI/9);
   					 rect(-8, 30, 15, 2);
   					 ellipse(-8, 31, 5);
   				 pop();
   				 ellipse(22, 19.5, 10);
   			 pop();
   			 ellipse(0, 0, 10);
   		 pop();
   	 pop();

   	 //right arm
   	 push();
   		 translate(20, 5);
   		 quad(0, 0, 0, -10, 15, -23, 18, -20);
   		 push();
   			 translate(16, -21);
   			 push();
   				 translate(-20, -22);
   				 rotate(-PI/2);
   				 rect(-23, 17, 15, 2);
   				 ellipse(-8, 18.5, 5);
   				 push();
   					 rotate(PI/9);
   					 rect(-14, 25, 15, 2);
   					 ellipse(0, 26, 5);
   					 rotate(PI/9);
   					 rect(-5, 30, 15, 2);
   					 ellipse(10, 31, 5);
   				 pop();
   			 pop();
   			 ellipse(0, 0, 10);
   		 pop();
   	 pop();
   	 
   	 

   	 //left leg
   	 push();
   		 translate(-4, 25);
   		 quad(0, 0, -12, -7, -25, 7, -15, 15);
   		 push();
   			 translate(-25, 7);
   			 rotate(PI/6 + leftLegR);
   			 quad(0, 0, 20, 20, 24, 15, 14, -3);
   			 
   			 rect(9, 17, 15, 2);
   			 ellipse(9, 18.5, 5);
   			 push();
   				 rotate(-PI/9);
   				 rect(1, 25, 15, 2);
   				 ellipse(1, 26, 5);
   				 rotate(-PI/9);
   				 rect(-8, 30, 15, 2);
   				 ellipse(-8, 31, 5);
   			 pop();
   			 ellipse(22, 19.5, 10);
   		 pop();
   	 pop();

   	 //right leg
   	 push();
   		 translate(4, 25);
   		 quad(0, 0, 12, -7, 25, 7, 15, 15);
   		 push();
   			 translate(25, 7);
   			 rotate(-PI/6 + rightLegR);
   			 quad(0, 0, -20, 20, -24, 15, -14, -3);
   			 rect(-23, 17, 15, 2);
   			 ellipse(-8, 18.5, 5);
   			 push();
   				 rotate(PI/9);
   				 rect(-14, 25, 15, 2);
   				 ellipse(0, 26, 5);
   				 rotate(PI/9);
   				 rect(-5, 30, 15, 2);
   				 ellipse(10, 31, 5);
   			 pop();
   			 ellipse(-22, 19.5, 10);
   		 pop();
   	 pop();

   	 //body
   	 ellipse(0, 0, 50, 55);
   	 fill(190, 254, 113);
   	 ellipse(0, 0, 30, 35);
   	 fill(70, 200, 70);

   	 //head
   	 push();
   		 translate(0, -20);

   		 ellipse(0, 0, 55, 35);
   	 pop();    

   	 //left eye
   	 push();
   		 translate(-18, -35);
   		 ellipse(0, 0, 20);
   		 fill(255);
   		 ellipse(0, 0, 13);
   		 push();
   			 translate(1, 2.1);
   			 fill(0);
   			 ellipse(0, 0, 6);
   		 pop();
   	 pop();

   	 //right eye
   	 push();
   		 translate(18, -35);
   		 ellipse(0, 0, 20);
   		 fill(255);
   		 ellipse(0, 0, 13);
   		 push();
   			 translate(-1, 2.1);
   			 fill(0);
   			 ellipse(0, 0, 6);
   		 pop();
   	 pop();

   	 //smile
   	 push();
   		 translate(0, -13);
   		 beginShape();
   			 curveVertex(-20, -3);
   			 curveVertex(-20, -3);
   			 curveVertex(0, 3);
   			 curveVertex(20, -3);
   			 curveVertex(20, -3);
   		 endShape();
   	 pop();
   	 
    pop();



    	if (rightLegR < -PI/10)
   {
	rightLegDown = false;
   }
   if (rightLegR > PI/10)
   {
	rightLegDown = true;
   }

   if (rightLegDown == true)
   {
	rightLegR -= PI/200;
   }
   else
   {
	rightLegR += PI/200;
   }

   if (leftLegR < -PI/10)
   {
	leftLegDown = false;
   }
   if (leftLegR > PI/10)
   {
	leftLegDown = true;
   }

   if (leftLegDown == true)
   {
	leftLegR -= PI/200;
   }
   else
   {
	leftLegR += PI/200;
   }

}


