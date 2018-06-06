var DIRECTION_ENUM = { NORTH: 1, EAST: 2, SOUTH: 3, WEST: 4 };

// size, startX and startY will automatically be set in BombermanGame constructor when used in the game
function Bomberman(
  size = 700 / 13,
  startX = 700 / 13,
  startY = 100.13,
  speed = 20,
  maxAllowedBombs = 1,
  bombStrength = 1
) {
  MovingElement.call(this, size, startX, startY, speed, DIRECTION_ENUM.SOUTH);
  this.maxAllowedBombs = maxAllowedBombs;
  this.bombStrength = bombStrength;
  this.currentBombs = [];
  this.isMoving = false;
}

Bomberman.prototype = Object.create(MovingElement.prototype);

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

Bomberman.prototype.canSetBomb = function() {
  return this.maxAllowedBombs > this.currentBombs.length;
};

Bomberman.prototype.igniteBomb = function(bombMidX, bombMidY, listener) {
  if (this.canSetBomb) {
    var newBomb = new Bomb(bombMidX, bombMidY, this.bombStrength, this.size, [this, listener]);
    this.currentBombs.push(newBomb);
  } else console.log("you can only have " + this.maxAllowedBombs + " bombs!");
};

Bomberman.prototype.onBombExplosion = function(bomb) {
  console.log("explosion!!!! in bomberman!");
  this.currentBombs.shift();
};

Bomberman.prototype.isInBombRadius = function(bomb) {
  return this.x - bomb.x > bomb.bombRange && this.y - bomb.y > bomb.bombRange;
};

// BOMB

function Bomb(midX, midY, bombRange = 1, size, listeners) {
  Element.call(this, size);
  this.x = midX - (1 / 2) * this.size;
  this.y = midY - (1 / 2) * this.size;
  this.bombRange = bombRange;
  this.fuseTime = 3;
  this.listeners = listeners;
  this.setExplosion();
}
Bomb.prototype = Object.create(Element.prototype);

Bomb.prototype.setExplosion = function() {
  var that = this;
  setTimeout(function() {
    that.listeners.forEach(function(element) {
      if (element) element.onBombExplosion(that);
    });
  }, 3000);
};
