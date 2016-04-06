var footprintList = new Array();
var colorIndex = 0;
var FootPrint = function(x, y) {
  this.x = x;
  this.y = y;
};
function drawFtList(ctx) {
  for (var i = 0; i < footprintList.length; i++) {
    footprintList[i].drawItem(ctx);
  }
}
function saveFootprint(pos) {
  footprintList.add(pos);
}
FootPrint.prototype = {
  drawItem: function(ctx) {
    var point = paintTran([this.x, this.y]);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(70, 70, 70, 1)";
    ctx.arc(point[0], point[1], 7, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();

  }
}
