var vehicle;
var maze = new Maze();
var ctx;
var lineList = new Array(3);
var footCount = -1;
var car_x = 0;
var car_y = 0;
var car_vector = [2, 2];
var coordinate = new Coordinate(0);
var set = false; // If the mouse click on the canvas, turn to true.
var draw_x = 0;
var draw_y = 0;
var fuzzySys = new FuzzySystem();
var tmpX = car_x;
var tmpY = car_y;
var Crate = 0;

function createLine() {
  for (var i = 0; i < lineList.length; i++) {
    lineList[i] = new Line(i);
    lineList[i].tmp = [0,0];
  }
}
function initState(angle) {
  angle_phi = math.pi / 2 + angle * math.pi / 180;
  clear();
  maze.drawItem();
  vehicle.drawCar(ctx);
  for (var i = 0; i < lineList.length; i++) {
    lineList[i].distCal();
    lineList[i].drawSurface();
    lineList[i].drawEnd();
  }
  $('#Ipos').text("[x,y] = ["+math.round(tmpX/OFFSET ,1)+" , "+ math.round(tmpY/OFFSET,1)+"] ");
  $('#Rs').text("Right-Sensor: "+math.round(lineList[0].getDist() / OFFSET,2));
  $('#Ms').text("Mid-Sensor: "+math.round(lineList[1].getDist() / OFFSET,2));
  $('#Ls').text("Left-Sensor: "+math.round(lineList[2].getDist() / OFFSET,2));
}
function paintTran(oPoint) {
  var point = math.zeros(2);
  point[0] = oPoint[0] + 60 + RADIUS + OFFSET;
  point[1] = -oPoint[1] + 8 * RADIUS + OFFSET;
 return point;
}
var CFrame = function() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext('2d');
  vehicle = new Vehicle("canvas");
  ctx = this.ctx;
  createLine();

// Set the initial position using mouse
  this.inBound = true;
  this.canvas.addEventListener('mousemove', function(e){
    if (!set) {
      clear();
      maze.drawItem();
      draw_x = e.clientX - $(this).offset().left;
      draw_y = e.clientY - $(this).offset().top;
      ctx.beginPath();
      if(!inBound())
        ctx.fillStyle = "rgba(255, 20, 20, 0.7)";
      else
      ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
      ctx.arc(draw_x, draw_y, RADIUS, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  });
  this.canvas.addEventListener("click", function(e){
    if(inBound()) {
      car_x = draw_x - 2*RADIUS - OFFSET;
      car_y = -(draw_y - 500);
      tmpX = car_x;
      tmpY = car_y;
      vehicle.drawCar(ctx);
      set = true;
      initState(0);
    }
    else {
      swal({
        title: "超出範圍啦!",
        timer: 1300,
        type: "error",
        showConfirmButton: false
      });
    }
  });
  requestAnimationFrame(refresh);
}
function inBound() {
  var x = draw_x - 60 - RADIUS - OFFSET;
  var y = (draw_y - 480) - OFFSET;
  if (math.largerEq(y, -480) && math.smallerEq(y, 0) && math.largerEq(x, -60) && math.smallerEq(x, 480 + RADIUS) ) {
    if (math.largerEq(y, -480) && math.smallerEq(y, -360+60) && math.smallerEq(x, 300+2*RADIUS)) {
      if (math.largerEq(x, -60))
        return false;
    }
    if (math.largerEq(y, -120-RADIUS) && math.smallerEq(y, 0+RADIUS) && math.smallerEq(x, 300+2*RADIUS)) {
      if (math.largerEq(x, 120-RADIUS))
        return false;
    }
    return true;
   }
  else return false;
}
// refresh function is for moving and calculating the position in times
function refresh() {
  setTimeout(function() {
  if(start) {
    clear();
    maze.drawItem();
    fuzzySys.fuzzifier();
    fuzzySys.fuzzRule();
    fuzzySys.defuzzifier();
    coordinate.setTheta(angle_theta);
    car_x = coordinate.getX();
    car_y = coordinate.getY();
    tmpX = car_x;
    tmpY = car_y;
    coordinate.setNewPhi();

    if(tmpY + RADIUS >= 480) {
      start = false;
    }

    for (var i = 0; i < wallList.length; i++) {
         wallList[i].drawItem(ctx);
    }
    for (var i = 0; i < footprintList.length; i++) {
       footprintList[i].drawItem(ctx);
    }
    for (var i = 0; i < lineList.length; i++) {
       lineList[i].drawLine(i);
       lineList[i].drawEnd();
    }
    vehicle.drawCar(ctx);
    for (var i = 0; i < lineList.length; i++) {
       lineList[i].drawSurface();
    }
    footCount++;
    $('#CPos').text("[x,y] = ["+math.round(tmpX/OFFSET ,1)+" , "+ math.round(tmpY/OFFSET,1)+"] ");
    $('#CAng').text("Turn Angle: "+math.round(angle_theta));
    $('#CRs').text("Right-Sensor: "+math.round(lineList[0].getDist() / OFFSET,2));
    $('#CMs').text("Mid-Sensor: "+math.round(lineList[1].getDist() / OFFSET,2));
    $('#CLs').text("Left-Sensor: "+math.round(lineList[2].getDist() / OFFSET,2));
  }
  requestAnimationFrame(refresh);
}, 100 / Crate);
}
function clear() {
  this.ctx.fillStyle = 'rgba(255,255,255, 1)';
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}
CFrame.prototype = {
  setStart: function() {
    start = true;
  }
}// end of proto
