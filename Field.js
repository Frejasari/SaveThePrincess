var TILE = {
  NO: 0,
  WALL: 1,
  INV: 2,
  BORDER: 3
};

function FieldMatrix(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, tileSize = 1) {
  this.matrix = [createBorderRow(13), r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, createBorderRow(13)];
  this.tileSize = tileSize;
}
FieldMatrix.prototype.getTileAt = function(x, y) {
  return this.matrix[y + 1][x + 1];
};

FieldMatrix.prototype.getCurrentTileFromPosition = function(x, y) {
  console.log("this coordinates: " + x + " y: " + y + " tileSize: " + this.tileSize);
  return new TileCoordinates(x / this.tileSize, y / this.tileSize);
};

function TileCoordinates(x, y) {
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