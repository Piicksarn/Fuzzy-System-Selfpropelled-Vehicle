var Line = function(index) {
  this.distance = 0;
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
  setAngle: function(degree) {
    this.angle = degree;
  },
  drawSurface: function() {
    // Draw sensor lines
    var point = paintTran([this.car_surface[0] , this.car_surface[1]]);
    var Carpoint = paintTran([car_x, car_y]);
    ctx.beginPath();
    ctx.moveTo(Carpoint[0], Carpoint[1]);
    ctx.strokeStyle = "#FFF"
    ctx.lineTo(point[0] , point[1]);
    ctx.closePath();
    ctx.stroke();

    // Draw the surface point
    ctx.beginPath();
    ctx.arc(point[0] , point[1], 10, 0, Math.PI*2, true)
    ctx.fillStyle = "rgba(93, 194, 219, 1)";
    ctx.closePath();
    ctx.fill();
  },
  drawEnd: function() {
    // Draw sensor lines
    var point = paintTran([this.end[0], this.end[1]]);
    var Surpoint = paintTran([this.car_surface[0], this.car_surface[1]]);
    ctx.beginPath();
    ctx.moveTo(Surpoint[0], Surpoint[1]);
    ctx.strokeStyle = "#FFF"
    ctx.lineTo(point[0] , point[1]);
    ctx.closePath();
    ctx.stroke();

    // Draw the end point
    ctx.beginPath();
    ctx.arc(point[0] , point[1], 10, 0, Math.PI*2, true)
    ctx.fillStyle = "rgba(255, 19, 21, 1)";
    ctx.closePath();
    ctx.fill();
  },
  distCal: function() {
    // Searching the Surface point
    var point_x = tmpX + RADIUS * math.cos(angle_phi - math.pi/4 + ((math.pi/4)*this.index));
    var point_y = tmpY + RADIUS * math.sin(angle_phi - math.pi/4 + ((math.pi/4)*this.index));
    this.car_surface = [math.round(point_x), math.round(point_y)];
    // console.log("phi: "+angle_phi);
    // Searching the end point
    var interList = new Array();
    for (var i = 0; i < wallList.length; i++) {
       var intPoint = this.intersect(car_x, car_y, this.car_surface[0], this.car_surface[1], wallList[i]);
       if(intPoint!=null)
          interList.push(intPoint);
     }

    // Searching the minimal distance intersect point
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
        if(this.checkInBound(result_x, wall))
          if(math.dot([(ex - sx), (ey - sy)], [(result_x - sx), (wall.getLine() - sy)]) > 0)
            return math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()));
    }
    else {
      if(this.checkInBound(result_y, wall))
         if(math.dot([(ex - sx), (ey - sy)], [(wall.getLine() - sx), (result_y - sy)]) > 0)
           return math.round(math.intersect([sx, sy], [ex, ey], wall.getSP(), wall.getEP()));
    }
    return null;
  },
  checkInBound: function(x, wall) {
    if(x >= wall.getMin() && x <= wall.getMax())
        return true;
    return false;
  },
  drawLine: function() {
    this.distCal();
    this.drawSurface();
    this.drawEnd();
  }
}
