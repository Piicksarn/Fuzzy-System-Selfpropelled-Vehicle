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
        ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*colorIndex) + ',' +
                         Math.floor(255-10.5*colorIndex) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
