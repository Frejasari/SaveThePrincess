function GameElement(size, startX, startY, tileSize) {
  this.x = startX;
  this.y = startY;
  this.size = size;
  this.tileSize = tileSize;
}

GameElement.prototype.getMidX = function() {
  return this.x + this.size / 2;
};
GameElement.prototype.getMidY = function() {
  return this.y + this.size / 2;
};

function MovingElement(size, startX, startY, tileSize, speed, currentDirection) {
  GameElement.call(this, size, startX, startY, tileSize);
  this.speed = speed;
  this.isAlive = true;
  this.currentDirection = currentDirection;
}

MovingElement.prototype = Object.create(GameElement.prototype);

MovingElement.prototype.move = function() {
  if (!this.isAlive) return;
  switch (this.currentDirection) {
    case DIRECTION_ENUM.NORTH:
      this.centerVertically();
      return (this.y -= this.speed);
    case DIRECTION_ENUM.EAST:
      this.centerHorizontally();
      return (this.x += this.speed);
    case DIRECTION_ENUM.SOUTH:
      this.centerVertically();
      return (this.y += this.speed);
    case DIRECTION_ENUM.WEST:
      this.centerHorizontally();
      return (this.x -= this.speed);
    default:
      console.log("check your direction enum! No valid direction!");
  }
};

MovingElement.prototype.centerVertically = function() {
  this.x = Math.round(this.x / this.tileSize) * this.tileSize;
};

MovingElement.prototype.centerHorizontally = function() {
  this.y = Math.round(this.y / this.tileSize) * this.tileSize;
};

MovingElement.prototype.changeDirection = function(direction) {
  this.currentDirection = direction;
};
