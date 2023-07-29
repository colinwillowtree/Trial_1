function Button(x, y, r) {
  this.position = createVector(x, y);
  this.distance = dist(mouseX, mouseY, this.position.x, this.position.y);


  this.r1 = r;
  this.r2 = r;


  Button.prototype.update = function(x, y) {
    this.show();
    this.hover();
    this.updatePosition(x, y);
  }

  Button.prototype.show = function() {
    
    push();
    
    translate(this.position.x, this.position.y);
    strokeWeight(3);
    stroke(255, 200, 200);
    noFill();

    push();
    arc(0, 0, this.r2, this.r2, 0, TWO_PI/6);
    arc(0, 0, this.r2, this.r2, 2*TWO_PI/6, 3*TWO_PI/6);
    arc(0, 0, this.r2, this.r2, 4*TWO_PI/6, 5*TWO_PI/6);
    pop();

    push();
    rotate(TWO_PI/6);
    arc(0, 0, this.r1, this.r1, 0, TWO_PI/6);
    arc(0, 0, this.r1, this.r1, 2*TWO_PI/6, 3*TWO_PI/6);
    arc(0, 0, this.r1, this.r1, 4*TWO_PI/6, 5*TWO_PI/6);
    pop();

    pop();
  }
  
  Button.prototype.updatePosition = function(x, y){
    this.position = createVector(x, y);
  }


  Button.prototype.hover = function() {

    this.distance = dist(mouseX, mouseY, this.position.x, this.position.y);

    if (this.distance < 25) {
      this.r1 = lerp(this.r1, 80, 0.4);
      this.r2 = lerp(this.r2, 5, 0.4);
    } else {
      this.r1 = lerp(this.r1, 30, 0.2);
      this.r2 = lerp(this.r2, 30, 0.2);
    }
  }
}
