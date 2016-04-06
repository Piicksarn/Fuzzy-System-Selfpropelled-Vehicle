var angle_phi = 90;
var angle_theta = 0;
var start = false;

var Coordinate = function(theta) {
  this.theta = theta;
};

Coordinate.prototype ={
  getX: function() {
    var angle = math.add(math.cos(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta * math.pi / 180) * math.sin(angle_phi));
    return math.add(tmpX, angle);
  },
  getY: function() {
    var angle  = math.subtract(math.sin(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta * math.pi / 180) * math.cos(angle_phi));
    return math.add(tmpY, angle);
  },
  setTheta: function(angle) {
    this.theta = angle;
  },
  setNewPhi: function() {
    angle_phi = angle_phi - math.asin(2 * math.sin(this.theta * math.pi / 180) / RADIUS)
    return angle_phi;
  }
}
