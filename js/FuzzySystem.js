var FuzzySystem = function() {
  this.sensorFRes = new Array(3);
  this.fuzzRuRes = new Array(3);
  this.angle = 0;
}
FuzzySystem.prototype = {
  fuzzifier: function() {
    //for one sensor
    // var fuzzifiRes = new Array(3);
    // for (var l in lineList) {
    for (var i = 0; i < 3; i++) {
      var fuz = new Fuzzifier();
      fuz.setDist(lineList[1].getDist());
      fuz.setRank(i);
      this.sensorFRes[i] = fuz.getRank();
      //console.log("test: "+this.sensorFRes);

    }
    //   this.sensorFRes.push(fuzzifiRes);
    // }
    // console.log("sensors: 0:"+this.sensorFRes[0]+" 1: "+this.sensorFRes[1]+" 2:"+this.sensorFRes[2]);
  },
  fuzzRule: function() {
    var delta = lineList[0].getDist() - lineList[1].getDist();
    var direct = 0;
    if(math.isNegative(delta))
      direct = -1;
    else
      direct = 1;

    delta = math.abs(delta);
    if(delta < RADIUS)
      this.angle = 1;
    else if (delta < 2 * RADIUS && delta >= RADIUS) {
      this.angle = 2;
    }
    else if (delta >= 2* RADIUS) {
      this.angle = 3;
    }

    // var result = 0;
    // for (var f in this.sensorFRes) {
    //   for (var i = 0; i < 3; i++) {
    //     result = result + (this.sensorFRes[f][i] * ((-5) + 5 * f));
    //   }
    //   this.fuzzRuRes.push(result);
    //   result = 0;
    // }
    //console.log("theta:"+delta);
    this.angle = this.angle * direct;

  },
  defuzzifier: function() {
    // var miuyy = 0;
    // var miuy = 0;
    // for (var i in this.fuzzRuRes) {
    //   miuyy = miuyy + this.fuzzRuRes[i];
    // }
    // for (var i in this.fuzzRuRes) {
    //   for (var j in this.fuzzRuRes) {
    //     miuy = miuy + this.sensorFRes[i][j];
    //   }
    // }
    angle_theta = this.angle * (this.sensorFRes[0]*0.8 + this.sensorFRes[1]*1 + this.sensorFRes[2]*1.2) / (this.sensorFRes[0] + this.sensorFRes[1] + this.sensorFRes[2]);
    while (this.sensorFRes.length) { this.sensorFRes.pop(); }
  }
};
