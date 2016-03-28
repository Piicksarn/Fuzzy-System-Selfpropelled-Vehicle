const RADIUS = 60;
var Vehicle = function(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
  this.maze = new Object();
  this.homoMatrix = math.zeros(3,3);
  this.vecMatrix = math.zeros(3);
  this.resultMatrix = math.zeros(3,3);
};
var car_x = 1;
var car_y = 1;
//a is for x and b is for y in translate, theta is degree for rotate.

function homogenous(theta, a, b) {
  var Vmatrix = math.matrix();
  var Rmatrix = math.matrix();
  var Tmatrix = math.matrix();
  var Hmatrix = math.matrix();
  var ResultMatrix = math.matrix();
  Rmatrix = [
    [math.cos(theta), math.sin(theta) * -1, 0],
    [math.sin(theta), math.cos(theta), 0 ],
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
  clear: function() {
    this.ctx.fillStyle = 'rgba(255,255,255, 1)';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  },
  initial: function() {
    this.ctx.translate(60 + RADIUS + 20, 480 + 20);
  },
  drawBkg: function() {
    this.clear();
  },
  transform: function() {
    this.vecMatrix = setVector(car_x, car_y);
    this.homoMatrix = homogenous(0, 2, 2);
    this.resultMatrix = calResultMat(this.vecMatrix, this.homoMatrix);
     car_x = this.resultMatrix[0];
     car_y = this.resultMatrix[1];
  },
  drawCar: function(ctx) {
    this.transform();

    // Save the footprint in the list when draw the car
    if(footCount % 10 == 0) {
      var foot = new FootPrint(car_x, car_y);
      footprintList.push(foot);
    }

    // Draw the car
    ctx.beginPath();
    ctx.arc(car_x, -1 * car_y, RADIUS, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
    ctx.closePath();
    ctx.fill();
  }
}
