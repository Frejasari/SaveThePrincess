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
}

Bomberman.prototype.moveNorth = function() {
  this.y -= this.speed;
};

Bomberman.prototype.moveEast = function() {
  this.x += this.speed;
};

Bomberman.prototype.moveSouth = function() {
  this.y += this.speed;
};

Bomberman.prototype.moveWest = function() {
  this.x -= this.speed;
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
