var vehicle;
var maze = new Maze();
var ctx;
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
    vehicle.drawCar(ctx);
    ctx.restore();
    requestAnimationFrame(refresh);
  }, 100);
}
CFrame.prototype = {

}// end of proto
var lineList = new Array(3);
function createLine() {
  for (var i = 0; i < lineList.length; i++)
    lineList[i] = new Line();
}
