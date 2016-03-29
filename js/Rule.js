var Rule = function(sensorId) {
  this.sensorLine = sensorId;
}

Rule.prototype = {
  getValue: function() {
    switch (this.sensorLine) {
      case 0:
        this.angle = 30;
        break;
      case 1:
        this.angle = 5;
        break;
      case expression:
        this.angle = -30;
        break;
      default:
        break;
    }
  }
};
