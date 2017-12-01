let galaxySize = 8;
let planets = [];
let stars = [];
let planetData;
// let speed;
// let dir;

function setup() {
	speed = 0;
	dir = 0;

	createCanvas(windowWidth, windowHeight);

	// Should probably do this a different way, seems inefficient
	for (var k = 0; k < 50; k++){
		fill(100);
		let x = random(0, width);
		let y = random(0, height);
		let star = new Planet(x, y, 1, random(1,100), 0);
		stars.push(star);
	}

	for (var i = 0; i < galaxySize; i++){
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let r = random(10, 50);
		let id = i + 1;
		let numMoons = Math.floor(random(1, 5));
		for (var j = 0; j < planets.length; j++){
			while (dist(x, y, planets[j].x, planets[j].y) < r){
				x = random(100, width - 100);
				y = random(100, height - 100);
			}
		}
		let p = new Planet(x, y ,r, id, numMoons);

		planets.push(p);
	}

	planetData = createElement('h2')
	planetData.position(width - 200, 5);
}

function draw() {
	background(50);
	stroke(255);

	for (var h = 0; h < stars.length; h++){
		stars[h].display();
	}

	for (var i = 0; i < planets.length; i++){
		planets[i].display();
		for (var j = 0; j < planets[i].moons.length - 1; j++) {
			planets[i].moons[j].display();
		}
	}
}

function mousePressed() {
	for (var i = 0; i < planets.length; i++){
		planets[i].isClickedInside(mouseX, mouseY);
		for (var j = 0; j < planets[i].moons.length -1; j++) {
			planets[i].moons[j].isClickedInside(mouseX, mouseY);
		}
	}
}
class Planet {

	constructor(x, y, r, id, numMoons) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.r = r;
		this.moons = this.generateMoons(x, y, r, numMoons, this.x, this.y);
		this.planetColor = [random(0, 256), random(0, 256), random(0, 256)];
	}

	isClickedInside(pixelX, pixelY) {
		let d = dist(pixelX, pixelY, this.x, this.y);
		if (d < this.r) {
			fill(100);
			planetData.html('This is planet ' + this.id);
		}
	};

	generateMoons(x, y, r, num) {
		var allMoons = [];
		for (var i = 0; i < num; i++) {
			//the moons of the planet should be at least the radius X and radius Y
			//away from the planet
			var negPosX = Math.floor(random(30, 50) + 1);
			var negPosY = Math.floor(random(30, 50) + 1);
			negPosX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
			negPosY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

			var moonX = x - negPosX;
			var moonY = y - negPosY;

			moonX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
			moonY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

			allMoons.push(new Moon((moonX), (moonY), 10, num));
		}

		return allMoons;
	}

	display() {
		fill(this.planetColor);
		ellipse(this.x, this.y, this.r, this.r);
	}
}

class Moon {
	constructor(x, y, r, id) {
		this.id = id + " " + random(0, 100);
		this.x = x;
		this.y = y;
		this.r = r;
		this.moonColor = [255, 255, 255];
	}

	isClickedInside(pixelX, pixelY) {
		let d = dist(pixelX, pixelY, this.x, this.y);
		if (d < this.r) {
			fill(100);
			planetData.html('This is moon ' + this.id);
		}
	};
	display() {
		//speed += dir * 0.05;
		// this.x = this.x * cos(speed);
		// this.y = this.y * sin(speed);

		fill(this.moonColor);
		ellipse(this.x, this.y, this.r, this.r);
	}
}