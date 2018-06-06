function Element(size, startX, startY) {
  this.x = startX;
  this.y = startY;
  this.size = size;
}

Element.prototype.getMidX = function() {
  return this.x + this.size / 2;
};
Element.prototype.getMidY = function() {
  return this.y + this.size / 2;
};

function MovingElement(size, startX, startY, speed, currentDirection) {
  Element.call(this, size, startX, startY);
  this.speed = speed;
  this.currentDirection = currentDirection;
}

MovingElement.prototype = Object.create(Element.prototype);

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
