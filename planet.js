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