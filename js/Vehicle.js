const RADIUS = 60;
var Vehicle = function(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
  this.maze = new Object();
};
var car_x = 0;
var car_y = 0;
//a is for x and b is for y in translate, theta is degree for rotate.
var Vmatrix = math.matrix();
var worldPos = math.matrix();
var Rmatrix = math.matrix();
var Tmatrix = math.matrix();
var Hmatrix = math.matrix();
var ResultMatrix = math.matrix();
function homogenous(theta, a, b) {
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
  ResultMatrix = math.multiply(Hmatrix, Vmatrix);
}
function setVector(x, y) {
  Vmatrix = [x, y, 1];
//  console.log("x: "+ car_x +" y: "+ car_y);
math.forEach(Vmatrix, function(value) {
  console.log("v: "+value);
});
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
    // this.maze.showItems();
  },
  drawCar: function(ctx) {
    //create other function ------------------------
    setVector(car_x, car_y);
    homogenous(0, 2, -2);
    car_x = ResultMatrix[0];
    car_y = ResultMatrix[1];
    console.log("x: "+ car_x +" y: "+ car_y);
    //-------------------------------------------------
    ctx.beginPath();
    ctx.arc(car_x, car_y, RADIUS, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
    ctx.closePath();
    ctx.fill();
  },
  setPos: function(x, y) {
    console.log("nothing");
    // car_x = x;
    // car_y = y;
  }
  // frame: function(x, y) {
  //   this.setPos(x, y);
  //   if (this.getX() == 350)
  //     return;
  //   else {
  //     this.drawBkg();
  //     //this.initial();
  //     this.movement();
  //     this.drawCar();
  //   }
  // },
  // setX: function(i) {
  //     car_x = i;
  // }
}
