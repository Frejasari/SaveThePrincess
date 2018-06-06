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

function BombermanGame(
  bombListener,
  field = fieldMatrixMock,
  bomberman = new Bomberman(),
  enemies = firstRoundEnemies
) {
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
  }
  this.bombListener = bombListener;
}

/////////// Functions to control bomberman //////////////

BombermanGame.prototype.setBombermanDirection = function(direction) {
  this.bomberman.changeDirection(direction);
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
  } else if (!this.isAtBorder(this.bomberman)) {
    this.moveToNextBorder(this.bomberman);
    // console.log("cant move further in this direction!");
  }
};

BombermanGame.prototype.moveEnemy = function(enemy) {
  if (this.canMove(enemy)) {
    enemy.move();
  } else if (this.isAtBorder(enemy)) {
    // console.log("cant move further in this direction! current direction: " + enemy.currentDirection);
    enemy.changeDirection();
  } else {
    this.moveToNextBorder(enemy);
    // enemy.changeDirection();
  }
};

//////////// Check if moving in selected direction is possible ////////////

BombermanGame.prototype.canMoveNorth = function(character) {
  var tolerance = this.getTolerance(character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * tolerance,
    character.y + character.size
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * (1 - tolerance),
    character.y - character.speed
  );
  return (
    currTileStartCoord.x === currTileEndCoord.x &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};

BombermanGame.prototype.canMoveSouth = function(character) {
  var tolerance = this.getTolerance(character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * tolerance,
    character.y
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size * (1 - tolerance),
    character.y + character.speed + character.size
  );
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
  if (this.getNextBorder) var tolerance = this.getTolerance(character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x,
    character.y + character.size * tolerance
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.speed + character.size,
    character.y + character.size * (1 - tolerance)
  );
  return (
    currTileStartCoord.y === currTileEndCoord.y &&
    this.field.getTileAt(currTileEndCoord.x, currTileEndCoord.y) === TILE.NO
  );
};

BombermanGame.prototype.canMoveWest = function(character) {
  var tolerance = this.getTolerance(character);
  var currTileStartCoord = this.field.getCurrentTileIndexFromPosition(
    character.x + character.size,
    character.y + character.size * tolerance
  );
  var currTileEndCoord = this.field.getCurrentTileIndexFromPosition(
    character.x - character.speed,
    character.y + character.size * (1 - tolerance)
  );
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
  // if (this.getDistanceToNextBorder(character) > character.speed) {
  //   console.log("getDistanceToNextBorder >= this.character.speed");
  //   return true;
  // }
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

// TODO: does not work for too slow enemies! They get stuck in Nort or West direction!
BombermanGame.prototype.isAtBorder = function(character) {
  if (character.currentDirection === DIRECTION_ENUM.NORTH || character.currentDirection === DIRECTION_ENUM.SOUTH) {
    return character.y % this.field.tileSize === 0;
  } else return character.x % this.field.tileSize === 0;
};

BombermanGame.prototype.moveToNextBorder = function(character) {
  switch (character.currentDirection) {
    case DIRECTION_ENUM.NORTH:
      character.y += character.y % this.field.tileSize;
      break;
    case DIRECTION_ENUM.SOUTH:
      character.y += this.field.tileSize - (character.y % this.field.tileSize);
      break;
    case DIRECTION_ENUM.EAST:
      character.x += this.field.tileSize - (character.x % this.field.tileSize);
      break;
    case DIRECTION_ENUM.WEST:
      character.x += character.x % this.field.tileSize;
      break;
  }
};

// BombermanGame.prototype.getDistanceToNextBorder = function(character) {
//   switch (character.currentDirection) {
//     case DIRECTION_ENUM.NORTH:
//       console.log("speed " + character.speed + " in NORTH");
//       console.log("tileSize: " + this.field.tileSize);
//       console.log("distance " + (character.y % this.field.tileSize));
//       return character.y % this.field.tileSize;
//       break;
//     case DIRECTION_ENUM.SOUTH:
//       console.log("speed of " + character.speedacter + " in SOUTH");
//       console.log("tileSize: " + this.field.tileSize);
//       console.log("distance: " + (character.y % this.field.tileSize));
//       return character.y % this.field.tileSize;
//       break;
//     case DIRECTION_ENUM.EAST:
//       return character.x % this.field.tileSize;
//       break;
//     case DIRECTION_ENUM.WEST:
//       return character.x % this.field.tileSize;
//       break;
//   }
// };

////// Functions to set and ignite a bomb

BombermanGame.prototype.igniteBomb = function() {
  if (this.bomberman.canSetBomb()) {
    var tileCoordinates = this.field.getCurrentTileIndexFromPosition(
      this.bomberman.getMidX(),
      this.bomberman.getMidY()
    );
    var coordinates = this.field.getMidCoordinatesFromTile(tileCoordinates);
    this.bomberman.igniteBomb(coordinates.x, coordinates.y, this);
    this.bombListener.onBombIgnition(tileCoordinates.x, tileCoordinates.y);
  }
};

BombermanGame.prototype.onBombExplosion = function(bomb) {
  var bombExplosionTileIndizes = this.field.getCurrentTileIndexFromPosition(bomb.getMidX(), bomb.getMidY());
  var bombX = bombExplosionTileIndizes.x;
  var bombY = bombExplosionTileIndizes.y;
  var bombRange = bomb.bombRange;
  for (var i = -bomb.bombRange; i <= bomb.bombRange; i++) {
    var tile1 = this.field.matrix[bombY][bombX + i];
    if (!TILE.isInvincible(tile1)) {
      tile1 = TILE.explode(tile1);
      this.field.matrix[bombY][bombX + i] = tile1;
      this.bombListener.onBombExplosion(bombX + i, bombY);
    }
    var tile2 = this.field.matrix[bombY + i][bombX];
    if (!TILE.isInvincible(tile2)) {
      tile2 = TILE.explode(tile2);
      this.field.matrix[bombY + i][bombX] = tile2;
      this.bombListener.onBombExplosion(bombX, bombY + i);
    }
  }
};
