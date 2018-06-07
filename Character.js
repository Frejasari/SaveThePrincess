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

MovingElement.prototype.changeDirection = function(direction) {
  this.currentDirection = direction;
};
