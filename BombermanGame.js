/// creating defaults for first level! Maybe create a BombermanGame just with its level as input?
var firstRoundEnemies = [new SimpleEnemy(10, 0), new SimpleEnemy(10, 5), new SimpleEnemy(6, 9), new SimpleEnemy(0, 10)];

var fieldMatrixMock = new FieldMatrix(
  createRow(0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0),
  createSecondRow(0, 1, 0, 1, 0, 0),
  createRow(0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1),
  createSecondRow(0, 0, 1, 0, 0, 0),
  createRow(0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0),
  createSecondRow(1, 0, 0, 0, 0, 0),
  createRow(1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0),
  createSecondRow(0, 1, 0, 1, 0, 1),
  createRow(0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1),
  createSecondRow(0, 1, 1, 0, 0, 0),
  createRow(0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1),
  10
);

function BombermanGame(field = fieldMatrixMock, bomberman = new Bomberman(), enemies = firstRoundEnemies) {
  this.field = field;
  this.bomberman = bomberman; // stores the bomberman, here only for first round!
  this.enemies = enemies; // array which stores the enemies that exist in this round
  this.bombs = [];
  this.bomberman.size = this.field.tileSize;
  this.bomberman.x = this.field.tileSize;
  this.bomberman.y = this.field.tileSize;
}

/////////// Functions to control bomberman //////////////

BombermanGame.prototype.moveBomberman = function(direction) {
  // if (this.canMove(this.bomberman, direction)) {
  switch (direction) {
    case DIRECTION_ENUM.NORTH:
      if (this.canMoveNorth(this.bomberman)) {
        console.log("move north!");
        this.bomberman.moveNorth();
      } else {
        console.log("cant move!! theres a wall!");
      }
      break;
    case DIRECTION_ENUM.SOUTH:
      if (this.canMoveSouth(this.bomberman)) {
        this.bomberman.moveSouth();
        console.log("move south!");
      } else {
        console.log("cant move south!");
      }
      break;
    case DIRECTION_ENUM.EAST:
      if (this.canMoveEast(this.bomberman)) {
        console.log("move east!");
        this.bomberman.moveEast();
      } else console.log("cant move!!! There's a wall!");
      break;
    case DIRECTION_ENUM.WEST:
      console.log("move west!");
      if (this.canMoveWest(this.bomberman)) {
        this.bomberman.moveWest();
      } else console.log("cant move west!");
      break;
    default:
      console.log("check your direction enum! No valid direction!");
  }
};

//////////// Check if moving in selected direction is possible ////////////

BombermanGame.prototype.canMoveNorth = function(character, tolerance = 0.05) {
  console.log("CANMOVE NORTH, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileFromPosition(
    character.x + character.size * tolerance,
    character.y + character.size
  );
  var currTileEndCoord = this.field.getCurrentTileFromPosition(
    character.x + character.size * (1 - tolerance),
    character.y - character.speed
  );
  console.log("NORTH currentStartCoord: ", currTileStartCoord);
  console.log("NORTH currentEndCoord: ", currTileEndCoord);
  return (
    currTileStartCoord.x === currTileEndCoord.x &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};

BombermanGame.prototype.canMoveSouth = function(character, tolerance = 0.05) {
  console.log("CANMOVE SOUTH, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileFromPosition(character.x + character.size * tolerance, character.y);
  var currTileEndCoord = this.field.getCurrentTileFromPosition(
    character.x + character.size * (1 - tolerance),
    character.y + character.speed + character.size
  );
  console.log("SOUTH currentStartCoord: ", currTileStartCoord);
  console.log("SOUTH currentEndCoord: ", currTileEndCoord);
  return (
    currTileStartCoord.x === currTileEndCoord.x &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};

BombermanGame.prototype.canMoveEast = function(character, tolerance = 0.5) {
  console.log("CANMOVE EAST, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileFromPosition(character.x, character.y + character.size * tolerance);
  var currTileEndCoord = this.field.getCurrentTileFromPosition(
    character.x + character.speed + character.size,
    character.y + character.size * (1 - tolerance)
  );
  console.log("EAST currentStartCoord: ", currTileStartCoord);
  console.log("EAST currentEndCoord: ", currTileEndCoord);
  return (
    currTileStartCoord.y === currTileEndCoord.y &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};

BombermanGame.prototype.canMoveWest = function(character, tolerance = 0.5) {
  console.log("CANMOVE WEST, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileFromPosition(
    character.x + character.size,
    character.y + character.size * tolerance
  );
  var currTileEndCoord = this.field.getCurrentTileFromPosition(
    character.x - character.speed,
    character.y + character.size * (1 - tolerance)
  );
  console.log("WEST currentStartCoord: ", currTileStartCoord);
  console.log("WEST currentEndCoord: ", currTileEndCoord);
  return (
    currTileStartCoord.y === currTileEndCoord.y &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};
