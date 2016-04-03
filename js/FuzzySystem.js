var FuzzySystem = function() {
  this.sensorFRes = new Array(3);
  this.fuzzRuRes = new Array(3);
}
FuzzySystem.prototype = {
  fuzzifier: function() {
    //for one sensor
    var fuzzifiRes = new Array(3);
    for (var l in lineList) {
      for (var i = 0; i < 3; i++) {
        var fuz = new Fuzzifier();
        fuz.setDist(lineList[l].getDist());
        fuzzifiRes.push(fuz.getRank(i));
      }
      this.sensorFRes.push(fuzzifiRes);
    }
    console.log(this.sensorFRes);
  },
  fuzzRule: function() {
    var result = 0;
    for (var f in this.sensorFRes) {
      for (var i = 0; i < 3; i++) {
        result = result + (this.sensorFRes[f][i] * ((-5) + 5 * f));
      }
      this.fuzzRuRes.push(result);
      result = 0;
    }
  },
  defuzzifier: function() {
    var miuyy = 0;
    var miuy = 0;
    for (var i in this.fuzzRuRes) {
      miuyy = miuyy + this.fuzzRuRes[i];
    }
    for (var i in this.fuzzRuRes) {
      for (var j in this.fuzzRuRes) {
        miuy = miuy + this.sensorFRes[i][j];
      }
    }
    angle_theta = miuyy / miuy;
  }
};
