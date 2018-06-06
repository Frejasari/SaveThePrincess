// Simple Enemy

function SimpleEnemy(startX, startY, speed = 50, size) {
  MovingElement.call(this, size, startX, startY, speed, getRandomDirection());
  this.isAtBorder = true;
}

SimpleEnemy.prototype = Object.create(MovingElement.prototype);

SimpleEnemy.prototype.changeDirection = function() {
  this.currentDirection = getRandomDirection();
};

// TODO: Rework this function to not choose the same direction again!
function getRandomDirection() {
  var randomNumber = Math.floor(Math.random() * 4);
  switch (randomNumber) {
    case 0:
      return DIRECTION_ENUM.NORTH;
    case 1:
      return DIRECTION_ENUM.EAST;
    case 2:
      return DIRECTION_ENUM.SOUTH;
    case 3:
      return DIRECTION_ENUM.WEST;
    default:
      console.log("something went wrong! Check your random number function!");
  }
}
