var FuzzySystem = function() {
  this.sensorFRes = new Array(3);
  this.fuzzRuRes = new Array(3);
  this.angle = 0;
  this.protector = 0;
}
FuzzySystem.prototype = {
  fuzzifier: function() {
    for (var i = 0; i < 3; i++) {
      var fuz = new Fuzzifier();
      fuz.setDist(lineList[1].getDist());
      fuz.setRank(i);
      this.sensorFRes[i] = fuz.getRank();
    }
    this.angle = 0;
  },
  fuzzRule: function() {
    var delta = lineList[0].getDist() - lineList[2].getDist();
    var direct = 0;
    if(math.isNegative(delta))
      direct = -1;
    else
      direct = 1;

    // know the delta between the left sensor and right sensor
    delta = math.abs(delta);
    if(delta < RADIUS)
      this.angle = 5;
    else if (delta < 2 * RADIUS && delta >= RADIUS) {
      this.angle = 30;
    }
    else if (delta >= 2* RADIUS && delta< 3 * RADIUS) {
      this.angle = 40;
    }
    else if (delta >= 3* RADIUS) {
      this.angle = 45;
    }

    // The sensor of middle would effect the angle to turn
    var midDist = lineList[1].getDist();
    if(midDist < 2 * RADIUS)
      this.angle = this.angle * 1.8;
    else if(midDist >= 2 * RADIUS && midDist < 3 * RADIUS)
      this.angle = this.angle * 1.5;
    else if(midDist >= 3 * RADIUS && midDist < 4 * RADIUS)
      this.angle = this.angle * 0.8;
    else if(midDist >= 4 * RADIUS)
      this.angle = this.angle * 0.3;

    this.bouceDetector();

    this.angle = this.angle * direct + this.protector;

  },
  defuzzifier: function() {
    angle_theta =  (this.angle *this.sensorFRes[0] + this.angle *this.sensorFRes[1] + this.angle *this.sensorFRes[2]) / (this.sensorFRes[0] + this.sensorFRes[1] + this.sensorFRes[2]);
    while (this.sensorFRes.length) { this.sensorFRes.pop(); }
  },
  bouceDetector: function() {
    this.protector = 0;
    for (var i in lineList) {
      if(lineList[i].getDist() <= 80) {
        switch (i) {
          case 0:
            this.protector = -90;
            break;
          case 1:
            this.protector = 0;
            break;
          case 2:
            this.protector = 90;
            break;
          default:
            break;
        }
      }
    }
  }
};
