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
    // Do painting here!
  }, 100);
}
CFrame.prototype = {

}// end of proto
var lineList = new Array(3);
function createLine() {
  for (var i = 0; i < lineList.length; i++)
    lineList[i] = new Line();
}
