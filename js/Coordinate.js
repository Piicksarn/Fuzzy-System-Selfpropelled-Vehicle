var angle_phi = 90;
var angle_theta = 0;
var start = false;

var Coordinate = function(theta) {
  this.theta = theta;
};

Coordinate.prototype ={
  getX: function() {
    // console.log("theta:"+ this.theta);
    //this.theta = 5;
    var angle = math.add(math.cos(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta * math.pi/180) * math.sin(angle_phi));
    // console.log("front: "+math.cos((angle_phi * math.pi/180) + (this.theta * math.pi/180))+" angle_phi:"+angle_phi+" angle_theta"+this.theta+" back:"+math.sin(this.theta*math.pi/180) * math.sin(angle_phi*math.pi/180));
    // console.log("add: "+math.add(car_x, angle)+" x:"+car_x);
    console.log(angle);
    return math.add(tmpX, angle);
  },
  getY: function() {
    var angle  = math.subtract(math.sin(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta*math.pi/180) * math.cos(angle_phi));
    return math.add(tmpY, angle);
  },
  setTheta: function(angle) {
    this.theta = angle;
  },
  setNewPhi: function() {
     angle_phi = angle_phi - math.asin(2 * math.sin(this.theta * math.pi / 180)/ RADIUS)
    // angle_phi = angle_theta + angle_phi;
    return angle_phi;
  }
}
