var TILE = {
  NO: 0,
  WALL: 1,
  INV: 2,
  BORDER: 3,
  getClassName: function(number) {
    switch (number) {
      case TILE.NO:
        return "no-wall";
      case TILE.WALL:
        return "wall";
      case TILE.INV:
        return "invincible";
      case TILE.BORDER:
        return "border";
      default:
        return "you made an mistake! This is not a valid tile-type!";
    }
  }
};

function FieldMatrix(containerWidth, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11) {
  this.matrix = [createBorderRow(13), r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, createBorderRow(13)];
  this.tileSize = Math.floor(containerWidth / this.matrix.length);
}
FieldMatrix.prototype.getTileAt = function(x, y) {
  return this.matrix[y][x];
};

FieldMatrix.prototype.getCurrentTileIndexFromPosition = function(x, y) {
  console.log("getCurrentTileFromPosition coordinates: " + x + " y: " + y + " tileSize: " + this.tileSize);
  return new TileIndizes(x / this.tileSize, y / this.tileSize);
};

function TileIndizes(x, y) {
  this.x = Math.floor(x);
  this.y = Math.floor(y);
}

function createRow(f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11) {
  return [TILE.BORDER, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, TILE.BORDER];
}

function createSecondRow(f1, f3, f5, f7, f9, f11) {
  return createRow(f1, TILE.INV, f3, TILE.INV, f5, TILE.INV, f7, TILE.INV, f9, TILE.INV, f11);
}

function createBorderRow(size) {
  var arr = [];
  for (i = 0; i < size; i++) {
    arr.push(TILE.BORDER);
  }
  return arr;
}
