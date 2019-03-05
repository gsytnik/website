class Player {

	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.scale = 0.7;

		this.direction;

		this.w = 20;
		this.h = 40;

		this.dx = 0;
		this.dy = 0;

		this.ax;
		this.ay = .5;
		this.movement = true;

	}


	update() {

		this.x += this.dx;

		if(this.movement) {

			this.y += this.dy;
		}

		if(this.dy < 10) {

			this.dy += this.ay;
		}

		if(this.dx > 0) {
			this.direction = 1;
		} else if(this.dx < 0) {
			this.direction = -1;
		} else {
			this.direction = 0;
		}

	}

	show() {

	stroke(0);

    push();
   	 //ENTIRE FROG
   	 translate(this.x, this.y);
   	 scale(this.scale);

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
   			 rotate(PI/6 + PI/6*this.direction);
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
   			 rotate(-PI/6 + PI/6*this.direction);
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




	}

	moveLeft() {
		this.dx = -7;
	}

	moveRight() {
		this.dx = 7;
	}

	standStill() {
		this.dx = 0;
	}

	transfer(x,y) {

		this.x = x;
		this.y = y;

	}

	setMovement(movement) {
		this.movement = movement;
	}

	setVelocity(y) {
		this.dy = y;
		
	}

	getVelocity() {
		return(this.dy);
	}

	isFalling() {
		return(this.dy >= 0);
	}

	getX() {
		return(this.x);
	}

	getY() {
		return(this.y);
	}

}

//=================Platform=================

class Platform {

	constructor(x,y,width,classification,thickness) {
		this.x = x;
		this.y = y;

		this.w = width;
		this.thickness = thickness;

		this.pc;

		this.classification = classification;

		if(this.classification == 1) {
			this.pc = color(0,200,0);
		} else if (this.classification == 2) {
			this.pc = color(200,200,0);
		} else if (this.classification == 3) {
			this.pc = color(200,0,0);
		}


	}

	show() {

		noStroke();

		fill(this.pc);

		rect(this.x,this.y,this.w,this.thickness);

	}

	update() {

	}

	getClass() {
		return(this.classification);
	}

	getX() {
		return(this.x);
	}


	getY() {
		return(this.y);
	}

	addY(amount) {
		this.y += amount;
	}

	disappear() {
		return(this.classification == 3);
	}




}


//================Particles=============

class Particle {

	constructor(x,y) {
      this.x = x;
      this.y = y;
      this.paint = color(255,0,0);

      this.life = 300;
      this.d = 4;

      this.dx = random(-3,3);

      this.dy = random(-15,-5);

      this.ay = 0.5;      

	}

   show() {


      fill(this.paint);
      ellipse(this.x,this.y,this.d);

   }

   update() {
      this.x += this.dx;
      this.y += this.dy;
      this.dy += this.ay;
   }


}