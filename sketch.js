let galaxySize = 8;
let planets = [];
let stars = [];
let planetData;

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