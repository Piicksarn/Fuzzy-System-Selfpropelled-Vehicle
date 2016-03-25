var Line = function() {
  this.distance = 100;
  this.startPos = new Array(2);
  this.endPos = new Array(2);
  this.x = 0;
}
Line.prototype = {
  getDist: function() {},
  getStart: function() {
    return this.startPos;
  },
  getEnd: function() {
    return this.endPos;
  }
}
