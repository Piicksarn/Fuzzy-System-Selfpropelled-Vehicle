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
        ctx.beginPath();
        ctx.fillStyle = "rgba(44, 20, 195, 0.7)";
        ctx.arc(this.x, -this.y, 3, 0, Math.PI*2, true);
        ctx.stroke();
      }
    }
