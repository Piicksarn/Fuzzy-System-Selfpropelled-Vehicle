var Line = function(index) {
  this.distance = 0;
  this.angle = 45;
  this.index = index;
  this.car_surface = math.zeros(2);
  this.end = math.zeros(2);
  this.homoMatrix = math.zeros(3,3);
  this.vecMatrix = math.zeros(3);
  this.resultMatrix = math.zeros(3,3);
  this.rule = new Rule(index);
  // The items in the list are indicate as far, median, close
  this.rankList = new Array(3);
  for (var i in this.rankList) {
    this.rankList[i] = new Fuzzifier();
  }
}
Line.prototype = {
  setRank: function() {
    for (var i in this.rankList) {
      this.rankList[i].setDist(this.getDist());
      this.rankList[i].setRank(i);
    }
  },
  getRankList: function() {
    return this.rankList;
  },
  getDist: function() {
    return this.distance;
  },
  getStart: function() {
    return this.index;
  },
  getEnd: function() {
    return this.endPos;
  },
  distCal: function() {
    var point_x = car_x + RADIUS * math.cos(math.pi / 4 * (this.index + 1));
    var point_y = - car_y - RADIUS * math.sin(math.pi / 4 * (this.index + 1));
    this.car_surface = [math.round(point_x), math.round(point_y)];
    var interList = new Array();
    for (var i = 0; i < wallList.length; i++) {
       var intPoint = this.intersect(car_x, -car_y, this.car_surface[0], this.car_surface[1], wallList[i]);
       interList.push(intPoint);
     }
     var min = 700;
       for (var i = 0; i < interList.length; i++) {
         if(math.distance(interList[i],[car_x, car_y]) < min) {
           min = math.distance(interList[i],[car_x, car_y]);
           this.end = interList[i];
           this.distance = min;
         }
      }
  },
  intersect: function (sx, sy, ex, ey, wall) {
    var result_x = math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()))[0];
    var result_y = math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()))[1];

    if(wall.getStyle() == 'y') {
        if(this.checkInBound(result_x, wall)) {
          if(math.dot([(ex - sx), (ey - sy)], [(sx - sx), (-wall.getLine() - sy)]) > 0) {
            return math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()));
          }
        }
    }
    else {
         if(this.checkInBound(result_y, wall)) {
         if(math.dot([(ex - sx), (ey - sy)], [(sx - sx), (wall.getLine() - sy)]) > 0) {
           return math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()));

         }
       }
    }
    return [1000, 1000];
  },
  checkInBound: function(x, wall) {
    if(wall.getStyle() == 'y') {
      if(x >= wall.getMin() && x <= wall.getMax())
        return true;
    }
    else {
      if(x <= -wall.getMin() && x >= -wall.getMax()){
        return true;
      }
    }
    return false;
  },
  drawLine: function() {
    this.distCal();

    ctx.beginPath();
    ctx.arc(this.car_surface[0] , this.car_surface[1], 10, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(0, 197, 0, 1)";
    ctx.closePath();
    ctx.fill();
    this.distCal();

    // Draw sensor lines
    ctx.beginPath();
    ctx.moveTo(car_x, -1 * car_y);
    ctx.strokeStyle = "#FFF"
    ctx.lineTo(this.end[0] , this.end[1]);
    ctx.closePath();
    ctx.stroke();

    // Draw surface point
    ctx.beginPath();
    ctx.arc(this.car_surface[0] , this.car_surface[1], 10, 0, Math.PI*2, true)
    ctx.fillStyle = "rgba(93, 194, 219, 1)";
    ctx.closePath();
    ctx.fill();

    // Draw end points
    ctx.beginPath();
    ctx.arc(this.end[0] , this.end[1], 10, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(219, 118, 93, 1)";
    ctx.closePath();
    ctx.fill();


  }
}
