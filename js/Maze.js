const SIZE = 6;
const CENTER = 400;
const OFFSET = 20;
/* The matrix of the maze is showing below
  1 1 1 1 0 0
  0 0 0 0 0 0
  0 0 0 0 0 0
  0 0 1 1 1 1
*/

var Maze = function() {
  this.mapMatPro = new Array(4);
  this.maze = new Array();
  // Set the matrix for drawing the maze
  for(var i = 0; i < 4; i++)
    this.mapMatPro[i] = new Array(SIZE);
  this.mapMatPro[0] = new Array("1", "1", "1", "1", "0", "0");
  this.mapMatPro[1] = new Array("0", "0", "0", "0", "0", "0");
  this.mapMatPro[2] = new Array("0", "0", "0", "0", "0", "0");
  this.mapMatPro[3] = new Array("0", "0", "1", "1", "1", "1");

  // map the protottype matrix to the maze
  this.maze = mapMatToMaze(this.mapMatPro);
  createWalls();
};
var wallList = new Array();
function createWalls() {
  var wall1 = new Wall(-6, 0, 0, 18);
  wallList.push(wall1);
  var wall2 = new Wall(6, 0, 0, 6);
  wallList.push(wall2);
  var wall3 = new Wall(18, 0, 18, 24);
  wallList.push(wall3);
  var wall4 = new Wall(30, 0, 6, 24);
  wallList.push(wall4);
  var wall5 = new Wall(0, 18, -6, 18);
  wallList.push(wall5);
  var wall6 = new Wall(0, 6, 6, 30);
  wallList.push(wall6);
  var wall7 = new Wall(0, 0.001, -6, 6);
  wallList.push(wall7);
  var wall8 = new Wall(0, 24, 18, 30);
  wallList.push(wall8);
}

function mapMatToMaze(mapMatPro) {
  var bigMatRow = new Array(mapMatPro.length * SIZE);
  var counter = 0;
  for(var i = 0; i < mapMatPro.length; i++) {
    for(var k = 0; k < SIZE; k++) {
      bigMatRow[counter] = mapMatPro[i];
      counter ++;
    }
  }
  var bigMat = new Array(bigMatRow.length);
  counter = 0;
  for(var i = 0; i < bigMatRow.length; i++) {
    bigMat[i] = new Array(bigMatRow[i].length * SIZE);
    for( var j = 0; j < bigMatRow[i].length; j++)
      for(var k = 0; k < SIZE; k++) {
        bigMat[i][counter] = bigMatRow[i][j];
        counter ++;
      }
    counter = 0;
  }
  return bigMat;
}
function transX(value) {
  return CENTER + value * 8;
}
function transY(value) {
  return CENTER - value * 8;
}
Maze.prototype = {
  drawItem: function() {
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      for( var j = 0; j < this.maze.length; j++)
        for(var k = 0; k < this.maze[j].length; k++) {
          if(this.maze[j][k] == "1")
            ctx.fillStyle = "rgba(245, 239, 0, 0.5)";
          else
            ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
          ctx.fillRect(20 + OFFSET * k, 20 + OFFSET * j, OFFSET, OFFSET);
        }
    }// End of if condition for canvas context.
  },
  getMaze: function() {
    return this.maze;
  }
}
