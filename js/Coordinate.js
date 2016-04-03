var angle_phi = 0;
var angle_theta = 0;
var start = false;
var Coordinate = function(theta) {
  this.theta = theta;
};

Coordinate.prototype ={
  getX: function() {
    var angle = math.add(math.cos((angle_phi*math.pi/180) + (this.theta*math.pi/180)), math.sin(this.theta*math.pi/180) * math.sin(angle_phi*math.pi/180));
    return math.add(car_x, angle);
  },
  getY: function() {
    return car_y + math.cos((angle_phi*math.pi/180) + (this.theta*math.pi/180)) - math.sin(this.theta*math.pi/180) * math.sin(angle_phi*math.pi/180);
  },
  setTheta: function(angle) {
    this.theta = angle;
  },
  setNewPhi: function() {
    return angle_phi - math.asin(2 * math.sin(this.theta * math.pi / 180)/ RADIUS);
  }
}
