var snake = [];
var snakeSize = 20;

var died; 

var running = false;

var moveLeft = moveDown = moveUp = false;
var moveRight = true;

var food;

var score = 0;
var start = true;


function setup() {
	createCanvas(600,600);
	s = new Snake(0,0,snakeSize);
	noLoop();

	frameRate(15);



	
	picklocation();

	

}

function draw() {

	if (start) {
		score = 0;
		start = false;
	}

	background(0);
	

	strokeWeight(1);
	fill(255,0,100);
	rect(food.x,food.y,snakeSize,snakeSize);

	s.update();
	s.show();

	if(s.checkDeath()) {
		gameReset();
		noLoop();
		running = false;
	}

	

	

	if (s.eat(food)) {
	
		score++;
		picklocation();
	}

	gamePause();

	//scoreboard
	strokeWeight(4);
	textSize(14);
	fill(200,200,0);
	text("Score: " + score, width - 100, 50);



}


function picklocation() {
	let col = width/snakeSize;
	let row = height/snakeSize;


	do {
		food = createVector(round(random(col)),round(random(row)));
		food.mult(snakeSize);
	} while (food.x == 0 || food.x >= width-snakeSize 
		|| food.y == 0 || food.y >= height - snakeSize);

}



function keyPressed() {
	

	if(keyCode == 87 && !moveDown) {

		moveLeft = moveRight = false;

		moveUp = true;

		s.changeDirection(0,-1);

	} else if (keyCode == 83 && !moveUp) {
		moveLeft = moveRight = false;

		moveDown = true;

		s.changeDirection(0,1);
				
	} else if (keyCode == 68 && !moveLeft) {

		moveDown = moveUp = false;

		moveRight = true;

		s.changeDirection(1,0);
					
	} else if (keyCode == 65 && !moveRight) {

		moveDown = moveUp = false;

		moveLeft = true;

		s.changeDirection(-1,0);
			
	}

}

function mouseClicked() {

	if (running) {
		running = false;
		noLoop();
	} else if (!running) {
		running = true;
		loop();
	}

	

}

function gamePause() {

	if (!running) {

		strokeWeight(6);
		fill(200,200,0);
		textSize(30);
		text("Game Paused", width/2 - 100, height/2);
		
		textSize(20);
		strokeWeight(4);
		text("Welcome to Snake.", width/2-90, height/2+60);
		text("WASD to move, click to pause/unpause.", width/2-190, height/2+90);

	} else {
		
	}

}

function gameReset() {

	strokeWeight(3);
	fill(180,0,0);
	textSize(30);
	text("You died!",width/2 - 60,100);

	s.sendTo(0,0);
	s.revive();

	moveDown = moveUp = moveLeft = false;

	moveRight = true;

	start = true;
}
