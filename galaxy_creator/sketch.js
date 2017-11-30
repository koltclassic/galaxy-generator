let galaxySize = 8;
let planets = [];
let planetData;
let speed;
let dir;

function setup() {
	speed = 0;
	dir = 0;

	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < galaxySize; i++){
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let r = random(10, 50);
		let id = i + 1;
		let numMoons = Math.floor(random(1, 5));
		let p = new Planet(x, y ,r, id, numMoons);

		planets.push(p);
	}

	planetData = createElement('h2')
	planetData.position(width - 200, 5);
}

function draw() {
	background(50);
	stroke(255);
	// speed += dir * 0.05;

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
		this.moons = this.generateMoons(x, y, numMoons, this.x, this.y);
		this.planetColor = [random(0, 256), random(0, 256), random(0, 256)];
	}

	isClickedInside(pixelX, pixelY) {
		let d = dist(pixelX, pixelY, this.x, this.y);
		if (d < this.r) {
			fill(100);
			planetData.html('This is planet ' + this.id);
		}
	};

	generateMoons(x, y, num) {
		var allMoons = [];
		for (var i = 0; i < num; i++) {
			//the moons of the planet should be at least the radius X and radius Y
			//away from the planet
			allMoons.push(new Moon((x - random(20, 40)), (y + random(20, 40)), 10, num));
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
		speed += dir * 0.05;
		// this.x = this.x * cos(speed);
		// this.y = this.y * sin(speed);
		fill(this.moonColor);
		ellipse(this.x, this.y, this.r, this.r);
	}
}