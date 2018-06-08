/// just for testing at the moment!

var game;
var bombermanHTML;
var animationFrameId;
var fieldContainer;
var emptyMatrixContainer;
var overlayContainer;
var lostContainer;
var wonContainer;
var bombListener = {
  onBombExplosion: function(x, y, diedEnemies) {
    var jQueryElement = $("#" + x + "-" + y);
    jQueryElement.addClass("bomb-explosion");
    setTimeout(function() {
      diedEnemies.forEach(function(e) {
        $("#enemy-" + e).remove();
      });
      jQueryElement
        .removeClass("wall")
        .removeClass("bomb-explosion")
        .removeClass("bomb")
        .addClass("no-wall");
    }, 500);
  },
  onBombIgnition: function(x, y) {
    var jQueryElement = $("#" + x + "-" + y);
    jQueryElement.addClass("bomb");
  }
};

$(document).ready(function() {
  fieldContainer = $("#game-field");
  emptyMatrixContainer = $("#underlay-board");
  overlayContainer = $("#overlay-start-display");
  lostContainer = $("#overlay-lost-display");
  wonContainer = $("#overlay-won-display");

  lostContainer.hide();
  wonContainer.hide();

  setUpUnderlay(emptyMatrixContainer, emptyMatrixContainer.width() / 13);

  $("#start-btn").click(function() {
    setUpGame(fieldContainer, fieldContainer.width());
    fadeOverlayOut(overlayContainer, emptyMatrixContainer, this);
    $(this)
      .prop("onclick", null)
      .off("click");
  });
});

$("retry-btn").click(function() {});

$("#next-btn").click(function() {});

function setUpUnderlay(container, tileSize) {
  createBoard(container, emptyMatrix, tileSize);
}

function setUpGame(container, width) {
  game = new BombermanGame(bombListener, width, fieldMatrix);
  createGameBoard(game.field, container);
  // setBombermanCSSProperties(game.bomberman, bombermanHTML);
  createAndAppendBomberman(container);
  createAndAppendSimpleEnemy(game.enemies, container);
  setTimeout(function() {
    animate();
    // setupEventListeners();

    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "ArrowDown":
          game.startMovingBomberman();
          game.setBombermanDirection(DIRECTION_ENUM.SOUTH);
          break;
        case "ArrowUp":
          game.startMovingBomberman();
          game.setBombermanDirection(DIRECTION_ENUM.NORTH);
          break;
        case "ArrowRight":
          game.startMovingBomberman();
          game.setBombermanDirection(DIRECTION_ENUM.EAST);
          break;
        case "ArrowLeft":
          game.startMovingBomberman();
          game.setBombermanDirection(DIRECTION_ENUM.WEST);
          break;
      }
    });

    document.addEventListener("keyup", function(event) {
      switch (event.key) {
        case "ArrowDown":
          if (game.bomberman.currentDirection !== DIRECTION_ENUM.SOUTH) return;
          game.stopMovingBomberman();
          break;
        case "ArrowUp":
          if (game.bomberman.currentDirection !== DIRECTION_ENUM.NORTH) return;
          game.stopMovingBomberman();
          break;
        case "ArrowRight":
          if (game.bomberman.currentDirection !== DIRECTION_ENUM.EAST) return;
          game.stopMovingBomberman();
          break;
        case "ArrowLeft":
          if (game.bomberman.currentDirection !== DIRECTION_ENUM.WEST) return;
          game.stopMovingBomberman();
          break;
        case "b":
          game.igniteBomb(bombListener);
          console.log("event: " + event.key);
        // default:
      }
    });
  }, 2200);
}

function fadeOverlayOut(overlayjQuery, button) {
  emptyMatrixContainer.hide();
  button.fadeOut(1000);
  overlayjQuery.fadeOut(2000);
}

function fadeStartDisplayIn(overlayjQuery) {
  emptyMatrixContainer.show();
  fadeOverlayIn(overlayjQuery);
}

function fadeOverlayIn(overlayjQuery) {
  overlayjQuery.fadeIn(2000);
}

function showWinningScreen() {
  fadeOverlayIn(wonContainer);
}
function showLoosingScreen() {
  fadeOverlayIn(lostContainer);
}

function animate() {
  moveEnemiesVisually();
  if (game.bomberman.isMoving) {
    moveBombermanVisually();
  }
  if (game.isLost()) {
    showLoosingScreen();
  } else if (game.isWon()) {
    showWinningScreen();
  } else {
    animationFrameId = requestAnimationFrame(animate);
  }
}

// setIntervals

function moveBombermanVisually() {
  game.moveBomberman();
  setPositionOfjQueryCharacter(bombermanHTML, game.bomberman);
}

function removeEnemies() {}

function moveEnemiesVisually() {
  game.enemies.forEach(function(enemy, index) {
    if (enemy.isAlive) {
      game.moveEnemy(enemy);
      setPositionOfjQueryCharacter($("#enemy-" + index), enemy);
    }
  });
}

function setupEventListeners() {
  document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case "ArrowDown":
        game.startMovingBomberman();
        game.setBombermanDirection(DIRECTION_ENUM.SOUTH);
        break;
      case "ArrowUp":
        game.startMovingBomberman();
        game.setBombermanDirection(DIRECTION_ENUM.NORTH);
        break;
      case "ArrowRight":
        game.startMovingBomberman();
        game.setBombermanDirection(DIRECTION_ENUM.EAST);
        break;
      case "ArrowLeft":
        game.startMovingBomberman();
        game.setBombermanDirection(DIRECTION_ENUM.WEST);
        break;
    }
  });

  document.addEventListener("keyup", function(event) {
    switch (event.key) {
      case "ArrowDown":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.SOUTH) return;
        game.stopMovingBomberman();
      case "ArrowUp":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.NORTH) return;
        game.stopMovingBomberman();
      case "ArrowRight":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.EAST) return;
        game.stopMovingBomberman();
      case "ArrowLeft":
        if (!game.bomberman.currentDirection === DIRECTION_ENUM.WEST) return;
        game.stopMovingBomberman();
        break;
      case "b":
        game.igniteBomb(bombListener);
        console.log("event: " + event.key);
      // default:
    }
  });
}

// Functions to create the tiles of the game

function createTile(x, y, elementType) {
  var string = "<div id='" + x.toString() + "-" + y.toString() + "' class='game-tile " + elementType + "'</div>";
  return string;
}

function createMockTile(x, y, elementType) {
  var string = "<div class='game-tile " + elementType + "'</div>";
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

function createBoard(container, matrix, tileSize) {
  var htmlString = "";
  matrix.forEach(function(element, row) {
    for (var col = 0; col < element.length; col++) {
      container.append(createMockTile(col, row, TILE.getClassName(element[col])));
    }
  });
  setDimensionOfSquarejQueryElement($(".game-tile"), tileSize);
}

// Functions to create Bomberman

function createAndAppendBomberman(container) {
  container.append('<div id="bomberman"></div>');
  bombermanHTML = $("#bomberman");
  setBombermanCSSProperties();
}

function setBombermanCSSProperties() {
  console.log("createBomberman, bomberman: ", game.bomberman);
  setDimensionOfSquarejQueryElement(bombermanHTML, game.bomberman.size);
  setPositionOfjQueryCharacter(bombermanHTML, game.bomberman);
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

function clearBoard(container) {
  container.empty();
}
