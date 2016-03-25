var Coordinate = function() {
  this.theta = 0;
  this.phi = 0;
  this.degree = 0;
  this.x = 0;
  this.y = 0;
};

function worldCoordinate() {


}
Coordinate.prototype ={
  getX: function() {
    return this.x + Math.cos(this.phi + this.theta) + Math.sin(this.theta) * Math.sin(this.phi);
  },
  getY: function() {
    return this.y + Math.cos(this.phi + this.theta) - Math.sin(this.theta) * Math.sin(this.phi);
  },
  getPhi: function() {
    return this.phi;
  },
  setPhi: function(phi) {
    // this.phi = this.phi - Math.asin(2 * Math.sin(this.theta) / 6 * OFFSET);
    this.phi = phi;
  },
  setTheta: function(theta) {
    this.phi = theta;
  }

}
