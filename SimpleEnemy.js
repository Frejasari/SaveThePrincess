// Simple Enemy

function SimpleEnemy(startX, startY, speed = 1, size) {
  this.x = startX;
  this.y = startY;
  this.currentDirection = getRandomDirection();
  this.speed = speed;
  this.size = size;
}

SimpleEnemy.prototype.changeDirection = function() {
  this.currentDirection = getRandomDirection();
};

SimpleEnemy.prototype.move = function() {
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

// TODO: Rework this function to not choose the same direction again!
function getRandomDirection() {
  var randomNumber = Math.floor(Math.random() * 4);
  console.log("getRandomDirection!: ", randomNumber);
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
