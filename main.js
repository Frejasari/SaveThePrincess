/// just for testing at the moment!

var game;
var bombermanHTML;
var enemiesjQuery;

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
  game = new BombermanGame(fieldMatrix);
  createGameBoard(game.field, fieldContainer);
  setBombermanCSSProperties(game.bomberman, bombermanHTML);
  enemiesjQuery = createAndAppendSimpleEnemy(game.enemies, fieldContainer);
  animate();
  function animate() {
    moveEnemiesVisually();
    requestAnimationFrame(animate);
  }

  function moveEnemiesVisually() {
    game.enemies.forEach(function(enemy, index) {
      game.moveEnemy(enemy);
      setPositionOfjQueryCharacter(enemiesjQuery[index], enemy);
    });
  }

  document.addEventListener("keydown", function(event) {
    console.log("key pressed! Event ", event);
    switch (event.key) {
      case "ArrowDown":
        game.moveBomberman(DIRECTION_ENUM.SOUTH);
        bombermanHTML.css("top", game.bomberman.y);
        break;
      case "ArrowUp":
        game.moveBomberman(DIRECTION_ENUM.NORTH);
        bombermanHTML.css("top", game.bomberman.y);
        break;
      case "ArrowRight":
        game.moveBomberman(DIRECTION_ENUM.EAST);
        bombermanHTML.css("left", game.bomberman.x);
        break;
      case "ArrowLeft":
        game.moveBomberman(DIRECTION_ENUM.WEST);
        bombermanHTML.css("left", game.bomberman.x);
        break;
    }
  });
});

// Functions to create the tiles of the game

function createTile(row, col, elementType) {
  var string = "<div id='" + row.toString() + "-" + col.toString() + "' class='game-tile " + elementType + "'</div>";
  return string;
}

function createGameBoard(fieldMatrix, fieldContainer) {
  var htmlString = "";
  fieldMatrix.matrix.forEach(function(element, row) {
    for (var col = 0; col < element.length; col++) {
      fieldContainer.append(createTile(row, col, TILE.getClassName(element[col])));
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
