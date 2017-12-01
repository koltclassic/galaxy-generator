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
		fill(this.moonColor);
		ellipse(this.x, this.y, this.r, this.r);
	}
}