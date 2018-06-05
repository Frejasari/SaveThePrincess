/// creating defaults for first level! Maybe create a BombermanGame just with its level as input?
var firstRoundEnemies = [
  new SimpleEnemy(11, 1),
  new SimpleEnemy(11, 6),
  new SimpleEnemy(4, 11),
  new SimpleEnemy(1, 11)
];

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
  this.bomberman.speed = this.field.tileSize / this.bomberman.speed;
  for (var i = 0; i < this.enemies.length; i++) {
    var enemy = this.enemies[i];
    enemy.size = this.field.tileSize;
    enemy.x = enemy.x * this.field.tileSize;
    enemy.y = enemy.y * this.field.tileSize;
    enemy.speed = this.field.tileSize / enemy.speed;
    // this.moveEnemy(enemy);
  }
}

/////////// Functions to control bomberman //////////////


BombermanGame.prototype.setBombermanDirection = function(direction) {
  this.bomberman.setDirection(direction);
};

BombermanGame.prototype.stopMovingBomberman = function() {
  this.bomberman.isMoving = false;
};

BombermanGame.prototype.startMovingBomberman = function() {
  this.bomberman.isMoving = true;
};

BombermanGame.prototype.moveBomberman = function() {
  if (this.canMove(this.bomberman)) {
    this.bomberman.move();
  } else {
    console.log("cant move further in this direction!");
  }
};

BombermanGame.prototype.moveEnemy = function(enemy) {
  if (!this.canMove(enemy)) {
    enemy.changeDirection();
    this.moveEnemy(enemy);
  } else {
    enemy.move();
  }
};

//////////// Check if moving in selected direction is possible ////////////

BombermanGame.prototype.canMoveNorth = function(character) {
  var tolerance = this.getTolerance(character);
  console.log("CANMOVE NORTH, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * tolerance,
    character.y + character.size
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
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

BombermanGame.prototype.canMoveSouth = function(character) {
  var tolerance = this.getTolerance(character);
  console.log("CANMOVE SOUTH, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * tolerance,
    character.y
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
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

// TODO REWORK?
// BombermanGame.prototype.isNextStepInCurrentTile = function(coordinate, direction, character) {
//   if (DIRECTION_ENUM.NORTH === direction || DIRECTION_ENUM.WEST === direction) {
//     return coordinate % this.field.tileSize > charater.speed;
//   } else {
//     return coordinate % this.field.tileSize < characterSpeed;
//   }
// };

BombermanGame.prototype.canMoveEast = function(character) {
  var tolerance = this.getTolerance(character);
  console.log("CANMOVE EAST, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x,
    character.y + character.size * tolerance
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
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

BombermanGame.prototype.canMoveWest = function(character) {
  var tolerance = this.getTolerance(character);
  console.log("CANMOVE WEST, character: ", character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size,
    character.y + character.size * tolerance
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
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

BombermanGame.prototype.getTolerance = function(character) {
  return character.speed / character.size;
};

BombermanGame.prototype.getNearestPositionNorth = function(character) {
  var upperY = this.field.getCurrentTileIndexFromPosition(character.x, character.y + character.speed).y;
  console.log("upperY ", upperY);
  console.log("field.size ", this.field.tileSize);
  return this.field.tileSize * upperY;
};

BombermanGame.prototype.getNearestPositionSouth = function(character) {
  var lowerY = this.field.getCurrentTileIndexFromPosition(character.x, character.y - character.speed).y + 1;
  return this.field.tileSize * lowerY;
};

BombermanGame.prototype.getNearestPositionEast = function(character) {
  var upperX = this.field.getCurrentTileIndexFromPosition(character.x - character.speed, character.y).x + 1;
  return this.field.tileSize * upperX;
};

BombermanGame.prototype.getNearestPositionWest = function(character) {
  var lowerX = this.field.getCurrentTileIndexFromPosition(character.x + character.speed, character.y).x;
  return this.field.tileSize * lowerX;
};

BombermanGame.prototype.canMove = function(character) {
  console.log("canMoveEnemie, enemy direction: " + character.currentDirection);
  console.log("canMoveEnemie, enemy x: " + character.x);
  console.log("canMoveEnemie, enemy y: " + character.y);
  switch (character.currentDirection) {
    case DIRECTION_ENUM.NORTH:
      return this.canMoveNorth(character);
    case DIRECTION_ENUM.SOUTH:
      return this.canMoveSouth(character);
    case DIRECTION_ENUM.EAST:
      return this.canMoveEast(character);
    case DIRECTION_ENUM.WEST:
      return this.canMoveWest(character);
  }
};
