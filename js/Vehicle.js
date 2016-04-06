const RADIUS = 60;
var Vehicle = function(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
  this.homoMatrix = math.zeros(3,3);
  this.vecMatrix = math.zeros(3);
  this.resultMatrix = math.zeros(3,3);
};
var car_x = 0;
var car_y = 0;
var car_vector = [2, 2];
var car_angle = 0;
//a is for x and b is for y in translate, theta is degree for rotate.
function homogenous(theta, a, b) {
  var Vmatrix = math.matrix();
  var Rmatrix = math.matrix();
  var Tmatrix = math.matrix();
  var Hmatrix = math.matrix();
  var ResultMatrix = math.matrix();
  Rmatrix = [
    [Math.cos(theta), Math.sin(theta) * -1, 0],
    [Math.sin(theta), Math.cos(theta), 0 ],
    [0, 0, 1]
  ];

  Tmatrix = [
    [1, 0, a],
    [0, 1, b],
    [0, 0, 1]
  ];
  Hmatrix = math.multiply(Rmatrix, Tmatrix);
  return Hmatrix;
}
function setVector(x, y) {
  return vector = [x, y, 1];
}
function calResultMat(vactor, homo) {
  return math.multiply(homo, vactor);
}

Vehicle.prototype = {
  initial: function() {
    this.ctx.translate(60 + RADIUS + 20, 480 + 20);
  },
  drawBkg: function() {
    this.clear();
  },
  transform: function() {
    this.vecMatrix = setVector(car_x, car_y);
    this.homoMatrix = homogenous(angle_theta, 2, 2); //homogenous(angle, x, y)
    this.resultMatrix = calResultMat(this.vecMatrix, this.homoMatrix);
    car_x = this.resultMatrix[0];
    car_y = this.resultMatrix[1];
  },
  drawCar: function(ctx) {

    // if(start) {
    //   this.transform();
    //   // Save the footprint in the list when draw the car
    //
    // }
    if(footCount % 25 == 0) {
      var foot = new FootPrint(tmpX, tmpY);
      footprintList.push(foot);
    }
    // Draw the car
    var point = paintTran([tmpX, tmpY]);
    ctx.beginPath();
    ctx.fillStyle = "rgba(232, 53, 105, 0.8)";
    ctx.arc(point[0], point[1], RADIUS, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.arc(point[0], point[1], 15, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
  }
}
