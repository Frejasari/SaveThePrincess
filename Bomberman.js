var DIRECTION_ENUM = { NORTH: 1, EAST: 2, SOUTH: 3, WEST: 4 };

function MovingElement() {}
MovingElement.prototype.isFreeField = function() {};

// size, startX and startY will automatically be set in BombermanGame constructor when used in the game
function Bomberman(size = 700 / 13, startX = 700 / 13, startY = 100.13, speed = 5, bombCount = 1, bombStrength = 1) {
  this.x = startX;
  this.y = startY;
  this.speed = speed;
  this.size = size;
  this.bombCount = bombCount;
  this.bombStrength = bombStrength;
  this.isMoving = false;
  this.currentDirection = DIRECTION_ENUM.SOUTH;
}

Bomberman.prototype.getMidX = function() {
  return this.x + size / 2;
};
Bomberman.prototype.getMidY = function() {
  return this.y + size / 2;
};

Bomberman.prototype.moveNorth = function() {
  this.isMoving = true;
  this.currentDirection = DIRECTION_ENUM.NORTH;
  this.y -= this.speed;
};

Bomberman.prototype.moveEast = function() {
  this.isMoving = true;
  this.currentDirection = DIRECTION_ENUM.EAST;
  this.x += this.speed;
};

Bomberman.prototype.moveSouth = function() {
  this.isMoving = true;
  this.y += this.speed;
};

Bomberman.prototype.moveWest = function() {
  this.isMoving = true;
  this.x -= this.speed;
};

Bomberman.prototype.move = function() {
  switch (this.currentDirection) {
    case DIRECTION_ENUM.NORTH:
      return (this.y -= this.speed);
    case DIRECTION_ENUM.EAST:
      return (this.x += this.speed);
    case DIRECTION_ENUM.SOUTH:
      return (this.y += this.speed);
    case DIRECTION_ENUM.WEST:
      return (this.x -= this.speed);
    default:
      console.log("check your direction enum! No valid direction!");
  }
};

Bomberman.prototype.setDirection = function(direction) {
  this.currentDirection = direction;
};

Bomberman.prototype.igniteBomb = function(listener) {
  return new Bomb(this.x, this.y, this.bombStrength, listener);
};

Bomberman.prototype.isInBombRadius = function(bomb) {
  return this.x - bomb.x > bombRange && this.y - bomb.y > bombRange;
};

// BOMB

function Bomb(x, y, bombRange = 1, listener) {
  this.x = x;
  this.y = y;
  this.bombRange = bombRange;
  this.fuseTime = 3;
  setTimeout(function() {
    listener.bombExplosion();
    console.log("explosion!!!!");
  }, 3000);
}

Bomb.prototype.explode = function() {};
