class Snake {

	constructor(x,y,size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.tail = [];
		this.tLength = 1;
		this.xspeed = 1;
		this.yspeed = 0;
		this.death = false;
		
		

	}

	update() {


		
		if (this.tLength == this.tail.length) {
			for (var i = 0; i < this.tail.length-1; i++) {
					this.tail[i] = this.tail[i+1];
			}
		}

		this.tail[this.tLength-1] = createVector(this.x, this.y);
	

		this.x += this.xspeed*this.size;
		this.y += this.yspeed*this.size;

		

		this.x = constrain(this.x, 0, width - this.size);
		this.y = constrain(this.y, 0, height - this.size);

		
	}

	show() {

		stroke(1);
		fill(255);
		
		
			for (var i = 0; i < this.tail.length; i++) {
				rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
			}
		
	}

	changeDirection(x,y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	eat(pos) {
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d<=2){
			this.tLength++;
			return true;
		} else {
			return false;
		}
	}

	

	

	getSize() {
		return this.length;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	checkDeath() {
		for (var i = 0; i < this.tail.length; i++){
			let pos = this.tail[i];


			if(dist(this.x,this.y,pos.x,pos.y) < 1) {

				this.death = true;
			}


		}

		return(this.death);
	}

	revive() {
		this.death = false;
		this.tLength = 1;
		this.tail = [];


	}

	sendTo(x,y) {
		this.x = x;
		this.y = y;
		this.xspeed = 1;
		this.yspeed = 0;
	}
	

}