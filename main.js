/// just for testing at the moment!

var game;
var bombermanHTML;

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
  setDimenstionOfSquareHTMLElement($(".game-tile"), fieldMatrix.tileSize);
}

// Functions to create Bomberman

function setBombermanCSSProperties(bomberman, bombermanHTML) {
  console.log("createBomberman, bomberman: ", bomberman);
  setDimenstionOfSquareHTMLElement(bombermanHTML, bomberman.size);
  setPositionOfHTMLCharacter(bomberman, bombermanHTML);
}

}

// general functions to set attributes for HTML elements
function setDimenstionOfSquareHTMLElement(htmlElement, dimension) {
  htmlElement.css("width", dimension);
  htmlElement.css("height", dimension);
}
function setPositionOfHTMLCharacter(character, htmlCharacter) {
  console.log("setPositionHTMLCharacter, bombermanX: ", character.x);
  console.log("setPositionHTMLCharacter, bomberman: ", character);
  htmlCharacter.css("top", character.x);
  htmlCharacter.css("left", character.y);
}
