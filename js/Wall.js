/* ========================================/
 * The line equation of wall has 2 style:
 *   x = number OR y = number;
 =========================================*/

var Wall = function(x, y, min, max) {
  this.x = x;
  this.y = y;
  this.min = min;
  this.max = max;
}

Wall.prototype = {
  checkInBound: function(x){
    if( x > this.max || x < this.min)
      return false;
    return true;
  },
  getArg: function() {
    return this.x;
  },
  drawItem: function(ctx) {
    ctx.lineWidth = 6;
    ctx.lineCap="round"
    ctx.beginPath();
    if(this.x == 0) {
      ctx.moveTo(this.min * OFFSET, - this.y * OFFSET);
      ctx.lineTo(this.max * OFFSET, - this.y * OFFSET);
    }
    else {
      ctx.moveTo(this.x * OFFSET, - this.min * OFFSET);
      ctx.lineTo(this.x * OFFSET, - this.max * OFFSET);
    }
    ctx.stroke();
  }
}
