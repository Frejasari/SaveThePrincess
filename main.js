/// just for testing at the moment!

var game;
var bombermanHTML;
var enemiesjQuery;
var bombListener = {
};

$(document).ready(function() {
  bombermanHTML = $("#bomberman");
  var fieldContainer = $("#game-field");
  var fieldMatrix = new FieldMatrix(
    fieldContainer.width(),
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
    createRow(0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1)
  );
  game = new BombermanGame(bombListener, fieldMatrix);
  createGameBoard(game.field, fieldContainer);
  setBombermanCSSProperties(game.bomberman, bombermanHTML);
  enemiesjQuery = createAndAppendSimpleEnemy(game.enemies, fieldContainer);
  animate();

  var reqID;

  function animate() {
    moveEnemiesVisually();
    if (game.bomberman.isMoving) {
      moveBombermanVisually();
    }
    reqID = requestAnimationFrame(animate);
  }

  // setInterval(function() {
  //   cancelAnimationFrame(reqID);
  // }, 200);

  function moveBombermanVisually() {
    game.moveBomberman();
    setPositionOfjQueryCharacter(bombermanHTML, game.bomberman);
  }

  function moveEnemiesVisually() {
    game.enemies.forEach(function(enemy, index) {
      game.moveEnemy(enemy);
      setPositionOfjQueryCharacter(enemiesjQuery[index], enemy);
    });
  }

  document.addEventListener("keydown", function(event) {
    game.startMovingBomberman();
    switch (event.key) {
      case "ArrowDown":
        game.setBombermanDirection(DIRECTION_ENUM.SOUTH);
        break;
      case "ArrowUp":
        game.setBombermanDirection(DIRECTION_ENUM.NORTH);
        break;
      case "ArrowRight":
        game.setBombermanDirection(DIRECTION_ENUM.EAST);
        break;
      case "ArrowLeft":
        game.setBombermanDirection(DIRECTION_ENUM.WEST);
        break;
    }
  });

  document.addEventListener("keyup", function(event) {
    switch (event.key) {
      case "ArrowDown":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.SOUTH) return;
      case "ArrowUp":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.NORTH) return;
      case "ArrowRight":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.EAST) return;
      case "ArrowLeft":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.WEST) return;
        break;
    }
    game.stopMovingBomberman();
  });
});

// Functions to create the tiles of the game

function createTile(x, y, elementType) {
  var string = "<div id='" + x.toString() + "-" + y.toString() + "' class='game-tile " + elementType + "'</div>";
  return string;
}

function createGameBoard(fieldMatrix, fieldContainer) {
  var htmlString = "";
  fieldMatrix.matrix.forEach(function(element, row) {
    for (var col = 0; col < element.length; col++) {
      fieldContainer.append(createTile(col, row, TILE.getClassName(element[col])));
    }
  });
  setDimensionOfSquarejQueryElement($(".game-tile"), fieldMatrix.tileSize);
}

// Functions to create Bomberman

function setBombermanCSSProperties(bomberman, bombermanHTML) {
  console.log("createBomberman, bomberman: ", bomberman);
  setDimensionOfSquarejQueryElement(bombermanHTML, bomberman.size);
  setPositionOfjQueryCharacter(bombermanHTML, bomberman);
}

// Functions to create simple Enemies

function createAndAppendSimpleEnemy(enemies, container) {
  var jQueryEnemiesArray = [];
  enemies.forEach(function(enemy, index) {
    container.append(createSimpleEnemyHTML(enemy, index));
    var jQueryEnemy = $("#enemy-" + index);
    jQueryEnemiesArray.push(jQueryEnemy);
    setDimensionOfSquarejQueryElement(jQueryEnemy, enemy.size);
    setPositionOfjQueryCharacter(jQueryEnemy, enemy);
  });
  return jQueryEnemiesArray;
}

function createSimpleEnemyHTML(enemy, index) {
  return "<div id='enemy-" + index + "' class='simple-enemy'</div>";
}

// general functions to set attributes for HTML elements

function setDimensionOfSquarejQueryElement(jQueryElement, dimension) {
  jQueryElement.css("width", dimension);
  jQueryElement.css("height", dimension);
}

function setPositionOfjQueryCharacter(jQueryCharacter, character) {
  jQueryCharacter.css("top", character.y);
  jQueryCharacter.css("left", character.x);
}
