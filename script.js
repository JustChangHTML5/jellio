var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

Math.dist=function(x1,y1,x2,y2){ 
  if(!x2) x2=0; 
  if(!y2) y2=0;
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
}

//jello, all the nodes are pulled together to simulate jelly in a matrix

class Jello {
    constructor(size, color, bounciness, stressLimit, gelSize, pATH) {//can use images
        this.jellos = [];// 2d array with gel particles
        this.size = size;
        this.color = color;
        this.bounciness = bounciness;
        this.stressLimit = stressLimit
        this.gelSize = gelSize;
        this.pATH = null;
        if (pAth) {
            this.pATH = pATH;
            //do some crazy calculation to turn image into jelly, keep the gelSize
        }
    }

    getGel(x, y) {
        return this.jellos[y * this.size[0] + x]
    }

    create() {
        for (var x = 0; x < size[0]; x++) {
            for (var y = 0; y < size[1]; y++) {
                var neighbors = [];

                if (x > 0) {
                    neighbors.push(this.getGel(x - 1, y));
                }
                
                if (y > 0) {
                    neighbors.push(this.getGel(x, y - 1));
                }
                var curGel = new Gel(this.gelSize, this.color, this.bounciness, this.stressLimit, neighbors);

                if (x > 0) {
                    this.getGel(x - 1, y).neighbors.push(this);
                }
                
                if (y > 0) {
                    this.getGel(x, y - 1).neighbors.push(this);
                }
            }
        }
    }

    simulate() {
        for (var i = 0; i < this.jellos.length; i++) {
            var curGel = jellos[i]
        }
    }
}

class Gel {
    constructor(size, color, bounciness, stressLimit, neighbors) {
        this.size = size;
        this.color = color;
        this.pos = [];
        this.velocity = [];
        this.neighbors = [];
        if (neighbors) {
            this.neighbors = neighbors;
        }
        this.bounciness = bounciness
        this.stressLimit = stressLimit;//Add it into da game boiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    }

    simulate() {
        for (var i = 0; i < neighbors; i++) {
            var curNeighbor = neighbors[i];
            var shootX = this.pos[0] - curNeighbor.pos[0];
            var shootY = this.pos[1] - curNeighbor.pos[0];
            var whole = Math.abs(shootX) + Math.abs(shootY);
            var circle = 1 / Math.dist(0, 0, shootX / whole, shootY / whole);
            this.velocity[0] += shootX / whole * this.bounciness * circle;
            this.velocity[1] += shootY / whole * this.bounciness * circle;

            var d = (this.size[0] / 2 + curNeighbor.size[0] / 2);//DIST
            var e = (this.size[0] / 2 + curNeighbor.size[0] / 2);//DIST2
            
            if (this.pos[0] > curNeighbor.pos[0] && this.pos[0] < curNeighbor.pos[0] + d) {
                
                this.velocity[0] += this.bounciness;

            } else if (this.pos[0] > curNeighbor.pos[0] - d && this.pos[0] < curNeighbor.pos[0]) {

                this.velocity[0] -= this.bounciness;
                
            } if (this.pos[1] > curNeighbor.pos[1] && this.pos[1] < curNeighbor.pos[1] + e) {

                this.velocity[1] += this.bounciness;
                
            } else if (this.pos[1] > curNeighbor.pos[1] - e && this.pos[1] < curNeighbor.pos[1]) {

                this.velocity[1] -= this.bounciness;
                
            }
        }

        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
    }

    draw() {
        var radii = this.size / 2;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.pos[0] - radii, this.pos[1] - radii, this.pos[0] + radii, this.pos[1] + radii);
    }
}