var CFrame = function() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext('2d');
  this.vehicle = new Vehicle("canvas");
  this.maze = new Maze();
  this.t = 0;
  var a = [0, 1, 2, 3];
  console.log(math.subset(a, math.index(1)));
  console.log(this.vehicle);
  createLine();
  this.canvas.addEventListener('mousemove', function(e){
    //console.log("x: "+ e.clientX +" y: "+ e.clientY);
  });
}
CFrame.prototype = {
  go: function() {
    this.getVehicle();
    requestAnimationFrame(this.showTest);
  },
  getVehicle: function() {
    console.log("veh~"+this.vehicle);
    //return this.vehicle;
  },
  showTest: function() {
    setTimeout(function() {
      console.log("yoman");
          // Drawing code goes here
          //console.log("vehicle_2: "+this.getVehicle());
          vehicle.clear();
          ctx.save();
          maze.drawItem();
          ctx.translate( 60 + RADIUS + OFFSET, 480 + OFFSET);

          for (var i = 0; i < wallList.length; i++) {
            wallList[i].drawItem(ctx);
          }
          vehicle.drawCar(ctx);
          ctx.restore();
          requestAnimationFrame(showTest);

      }, 1000);
  },

}// end of proto
var lineList = new Array(3);
function createLine() {
  for (var i = 0; i < lineList.length; i++)
    lineList[i] = new Line();
}
