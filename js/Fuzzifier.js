/*
 *   There are three kind of fuzzier would be create.
 *   Far, Median, Close
 *   Rank index: 0-Far, 1-Medium, 2-Close
 */
var Fuzzifier = function() {
  this.dist = 0;
  this.rankVal = 0;
}

Fuzzifier.prototype = {
  setDist: function(dist) {
    this.dist = dist;
  },
  getRank: function(rank) {
    switch (rank) {
      case 0:
        this.farFunc();
        break;
      case 1:
        this.medFunc();
        break;
      case 2:
        this.closeFunc();
        break;
      default:
    }
  },
  farFunc: function() {
    var inSet = 1 - (this.dist - 360) / 300;
    if(inSet > 0 && inSet < 1 )
      this.rankVal = inSet;
    else if(inSet <= 0)
      this.rankVal = 0;
    else if(inSet >= 1)
      this.rankVal = 1;
  },
  medFunc: function() {
    var inSet = 1 - math.abs((this.dist - 180) / 300);
    if(inSet > 0 && inSet < 1 )
      this.rankVal = inSet;
    else if(inSet <= 0)
      this.rankVal = 0;
    else if(inSet >= 1)
      this.rankVal = 1;
  },
  closeFunc: function() {
    var inSet = 1 - (this.dist - 50) / 200;
    if(inSet > 0 && inSet < 1 )
      this.rankVal = inSet;
    else if(inSet <= 0)
      this.rankVal = 0;
    else if(inSet >= 1)
      this.rankVal = 1;
  }
}
