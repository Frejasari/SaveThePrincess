/// creating defaults for first level! Maybe create a BombermanGame just with its level as input?
var firstRoundEnemies = [
  new SimpleEnemy(11, 1),
  new SimpleEnemy(11, 6),
  new SimpleEnemy(4, 11),
  new SimpleEnemy(1, 10)
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
  this.bomberman.speed = 5;
  // this.bomberman.speed = this.field.tileSize / this.bomberman.speed;
  this.bomberman.tileSize = this.field.tileSize;
  for (var i = 0; i < this.enemies.length; i++) {
    var enemy = this.enemies[i];
    enemy.size = this.field.tileSize;
    enemy.x = enemy.x * this.field.tileSize;
    enemy.y = enemy.y * this.field.tileSize;
    enemy.speed = this.field.tileSize / enemy.speed;
    enemy.tileSize = this.field.tileSize;
  }
  this.bombListener = bombListener;
  this.isLost = false;
  this.isWon = false;
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
  if (this.canMove(this.bomberman, this.bomberman.currentDirection)) {
    this.bomberman.move();
  } else if (!this.isAtBorder(this.bomberman)) {
    this.moveToNextBorder(this.bomberman);
  }
};

BombermanGame.prototype.moveEnemy = function(enemy) {
  if (this.canMove(enemy, enemy.currentDirection)) {
    enemy.move();
    if (this.isCollisionOfCharacters(enemy, this.bomberman)) {
      console.log("is collusion!");
      this.isLost = true;
    }
  } else if (this.isAtBorder(enemy)) {
    enemy.changeDirection();
  } else {
    this.moveToNextBorder(enemy);
  }
};

//////////// Check if moving in selected direction is possible ////////////

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

////// Functions to set and ignite a bomb

BombermanGame.prototype.igniteBomb = function() {
  if (this.bomberman.canSetBomb()) {
    var tileCoordinates = this.field.getCurrentTileIndexFromPosition(
      this.bomberman.getMidX(),
      this.bomberman.getMidY()
    );
    var coordinates = this.field.getMidCoordinatesFromTileIndizes(tileCoordinates);
    this.bomberman.igniteBomb(coordinates.x, coordinates.y, this);
    this.bombListener.onBombIgnition(tileCoordinates.x, tileCoordinates.y);
    this.field.replaceTileAt(tileCoordinates.x, tileCoordinates.y, TILE.BOMB);
  }
};

BombermanGame.prototype.onBombExplosion = function(bomb) {
  var bombExplosionTileIndizes = this.field.getCurrentTileIndexFromPosition(bomb.getMidX(), bomb.getMidY());
  var bombX = bombExplosionTileIndizes.x;
  var bombY = bombExplosionTileIndizes.y;
  var bombRange = bomb.bombRange;
  var that = this;
  this.field.replaceTileAt(bombX, bombY, TILE.NO);
  for (var i = -bomb.bombRange; i <= bomb.bombRange; i++) {
    var tile1 = this.field.matrix[bombY][bombX + i];
    if (!TILE.isInvincible(tile1)) {
      var tile1Coordinates = this.field.getMidCoordinatesFromTileIndizesXAndY(bombX + i, bombY);
      tile1 = TILE.explode(tile1);
      this.field.replaceTileAt(bombX + i, bombY, tile1);
      var diedEnemies = [];
      this.enemies.forEach(function(enemy, index) {
        if (
          that.isCollisionWithCharacter(
            enemy,
            tile1Coordinates.x,
            tile1Coordinates.y,
            enemy.size / 2 + that.field.tileSize / 2
          )
        ) {
          enemy.isAlive = false;
          diedEnemies.push(index);
        }
      });
      this.bombListener.onBombExplosion(bombX + i, bombY, diedEnemies);
    }
    var tile2 = this.field.matrix[bombY + i][bombX];
    if (!TILE.isInvincible(tile2)) {
      var tile2Coordinates = this.field.getMidCoordinatesFromTileIndizesXAndY(bombX, bombY + i);
      tile2 = TILE.explode(tile2);
      this.field.replaceTileAt(bombX, bombY + i, tile2);
      var diedEnemies = [];
      this.enemies.forEach(function(enemy, index) {
        if (
          that.isCollisionWithCharacter(
            enemy,
            tile2Coordinates.x,
            tile2Coordinates.y,
            enemy.size / 2 + that.field.tileSize / 2
          )
        ) {
          enemy.isAlive = false;
          diedEnemies.push(index);
        }
      });
      this.bombListener.onBombExplosion(bombX, bombY + i, diedEnemies);
    }
  }
};

// detect collision between 2 characters

BombermanGame.prototype.isCollisionOfCharacters = function(char1, char2) {
  var minDistance = char1.size / 2 + char2.size / 2;
  return this.isCollisionWithCharacter(char1, char2.getMidX(), char2.getMidY(), minDistance);
};

BombermanGame.prototype.isCollisionWithCharacter = function(char1, midX, midY, minDistance) {
  return Math.abs(char1.getMidX() - midX) < minDistance && Math.abs(char1.getMidY() - midY < minDistance);
};

// detect if character is in bomb radius
BombermanGame.prototype.isCharacterInField = function(char, tileIndizes) {
  var midTileCoordinate = this.field.getMidCoordinatesFromTileIndizes(tileIndizes);
};

// Functions to check for wall collision

BombermanGame.prototype.getDistanceToTopBorder = function(character) {
  return character.getMidY() % this.field.tileSize;
};

BombermanGame.prototype.getDistanceToLeftBorder = function(character) {
  return character.getMidX() % this.field.tileSize;
};

BombermanGame.prototype.getBlockedDistanceFromBorder = function() {
  return this.field.tileSize * 0.4;
};
BombermanGame.prototype.getCurrentCharacterTile = function(character) {
  return this.field.getCurrentTileIndexFromPosition(character.getMidX(), character.getMidY());
};

BombermanGame.prototype.isNextTilePassable = function(tileIndizes, direction) {
  return this.isTilePassable(tileIndizes.getNextTile(direction));
};

BombermanGame.prototype.isCollision = function(x1, x2, y1, y2, minDistance) {
  return Math.abs(x1 - x2) < minDistance && Math.abs(y1 - y2) < minDistance;
};

BombermanGame.prototype.canMove = function(character, direction) {
  var characterTileIndizes = this.getCurrentCharacterTile(character);
  if (this.isNextTilePassable(characterTileIndizes, direction)) {
    return true;
  }
  var nextTileIndizes = characterTileIndizes.getNextTile(direction);
  console.log("currentTileIndizes", characterTileIndizes);
  console.log("nextTileIndizes", nextTileIndizes);
  var nextTile = this.field.getMidCoordinatesFromTileIndizes(nextTileIndizes);
  var isCollision = this.isCollision(
    character.getMidX(),
    nextTile.x,
    character.getMidY(),
    nextTile.y,
    character.speed + character.size / 2 + this.field.tileSize / 2
  );
  console.log("isCollision", isCollision);
  return !isCollision;
};

BombermanGame.prototype.isTilePassable = function(tileIndizes) {
  return this.field.getTileFromIndizesAt(tileIndizes) === TILE.NO;
};
