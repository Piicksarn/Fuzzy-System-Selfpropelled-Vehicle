var angle_phi = 0;
var angle_theta = 0;
var start = false;
var Coordinate = function(theta) {
  this.theta = theta;
};

Coordinate.prototype ={
  getX: function() {
    console.log("Math.cos(angle_phi + this.theta): "+Math.cos(angle_phi + this.theta)+" Math.sin(this.theta) * Math.sin(angle_phi): "+Math.sin(this.theta) * Math.sin(angle_phi)+" car_x:"+car_x);
    var angle = math.add(Math.cos(angle_phi + this.theta), Math.sin(this.theta) * Math.sin(angle_phi));
    return math.add(car_x, angle);// + Math.cos(angle_phi + this.theta) + Math.sin(this.theta) * Math.sin(angle_phi);
  },
  getY: function() {
    return car_y + Math.cos(angle_phi + this.theta) - Math.sin(this.theta) * Math.sin(angle_phi);
  },
  setTheta: function(angle) {
    this.theta = angle;
  }
}
