var vehicle;
var maze = new Maze();
var ctx;
var lineList = new Array(3);
var footCount = 0;
function createLine() {
  for (var i = 0; i < lineList.length; i++) {
    lineList[i] = new Line(i);
    lineList[i].tmp = [0,0];
  }

}
var CFrame = function() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext('2d');
  vehicle = new Vehicle("canvas");
  ctx = this.ctx;
  createLine();
  this.canvas.addEventListener('mousemove', function(e){
    //console.log("x: "+ e.clientX +" y: "+ e.clientY);
  });
  requestAnimationFrame(refresh);
}
function refresh() {
  setTimeout(function() {

    vehicle.clear();
    ctx.save();
    maze.drawItem();
    ctx.translate( 60 + RADIUS + OFFSET, 480 + OFFSET);
    for (var i = 0; i < wallList.length; i++) {
         wallList[i].drawItem(ctx);
    }
    for (var i = 0; i < footprintList.length; i++) {
      footprintList[i].drawItem(ctx);
    }
    vehicle.drawCar(ctx);
    for (var i = 0; i < lineList.length; i++) {
       lineList[i].drawLine(i);
     }
    ctx.restore();
    footCount++;
    requestAnimationFrame(refresh);
  }, 100);
}
CFrame.prototype = {

}// end of proto
