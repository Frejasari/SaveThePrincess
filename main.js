/// just for testing at the moment!

var bombermanTest = document.getElementById("bomberman");
var game = new BombermanGame();

document.addEventListener("keydown", function(event) {
  console.log("key pressed! Event ", event);
  switch (event.key) {
    case "ArrowDown":
      game.moveBomberman(DIRECTION_ENUM.SOUTH);
      bombermanTest.style.top = game.bomberman.y + "px";
      break;
    case "ArrowUp":
      game.moveBomberman(DIRECTION_ENUM.NORTH);
      bombermanTest.style.top = game.bomberman.y + "px";
      break;
    case "ArrowRight":
      game.moveBomberman(DIRECTION_ENUM.EAST);
      bombermanTest.style.left = game.bomberman.x + "px";
      break;
    case "ArrowLeft":
      game.moveBomberman(DIRECTION_ENUM.WEST);
      bombermanTest.style.left = game.bomberman.x + "px";
      break;
  }
});
