/* ========================================/
 * The line equation of wall has 2 style:
 *   x = number OR y = number;
 =========================================*/

var Wall = function(x, y, min, max) {
  this.x = x * OFFSET;
  this.y = y * OFFSET;
  this.min = min * OFFSET;
  this.max = max * OFFSET;
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
  getSP: function() {
    var point = math.zeros(2);
    if(this.x == 0)
      point = [this.min, - this.y];
    else
      point = [this.x, - this.min];
    return point;
  },
  getEP: function() {
    var point = math.zeros(2);
    if(this.x == 0)
      point = [this.max, - this.y];
    else
      point = [this.x, - this.max];
    return point;
  },
  getStyle: function() {
    if(this.x == 0)
      return 'y';
    return 'x';
  },
  getMin: function() {
    return this.min;
  },
  getMax: function() {
    return this.max;
  },
  getLine: function() {
    if(this.x == 0)
      return this.y;
    return this.x;
  },
  drawItem: function(ctx) {
    ctx.lineWidth = 6;
    ctx.lineCap="round"
    ctx.beginPath();
    if(this.x == 0) {
      ctx.moveTo(this.min, - this.y);
      ctx.lineTo(this.max, - this.y);
    }
    else {
      ctx.moveTo(this.x, - this.min);
      ctx.lineTo(this.x, - this.max);
    }
    ctx.stroke();
  }
}
