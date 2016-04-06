const RADIUS = 60;
var Vehicle = function(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
};

Vehicle.prototype = {
  drawCar: function(ctx) {
    // Save the footPrints
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
