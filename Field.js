var TILE = {
  NO: 0,
  WALL: 1,
  INV: 2,
  BORDER: 3,
  BOMB: 4,
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
  },
  explode: function(number) {
    switch (number) {
      case TILE.NO:
      case TILE.WALL:
      case BOMB:
        return TILE.NO;
      case TILE.INV:
        return TILE.INV;
      case TILE.BORDER:
        return TILE.BORDER;
      default:
        return "you made an mistake! This is not a valid tile-type!";
    }
  },
  isInvincible: function(number) {
    switch (number) {
      case TILE.NO:
      case TILE.WALL:
        console.log("TILE_NO, TILE_WALL");
        return false;
      default:
        return true;
    }
  }
};

function FieldMatrix(containerWidth, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11) {
  this.matrix = [createBorderRow(13), r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, createBorderRow(13)];
  this.tileSize = containerWidth / this.matrix.length;
}
FieldMatrix.prototype.getTileAt = function(x, y) {
  return this.matrix[y][x];
};
FieldMatrix.prototype.replaceTileAt = function(x, y, newValue) {
  this.matrix[y][x] = newValue;
};

FieldMatrix.prototype.getTileFromIndizesAt = function(tileIndizes) {
  return this.matrix[tileIndizes.y][tileIndizes.x];
};

FieldMatrix.prototype.getCurrentTileIndexFromPosition = function(x, y) {
  return new TileIndizes(x / this.tileSize, y / this.tileSize);
};

FieldMatrix.prototype.getMidCoordinatesFromTile = function(tileIndizes) {
  return new Coordinates(
    tileIndizes.x * this.tileSize + (1 / 2) * this.tileSize,
    tileIndizes.y * this.tileSize + (1 / 2) * this.tileSize
  );
};

FieldMatrix.prototype.getMidCoordinatesFromTileIndizesXAndY = function(x, y) {
  return new Coordinates(x * this.tileSize + (1 / 2) * this.tileSize, y * this.tileSize + (1 / 2) * this.tileSize);
};

function Coordinates(x, y) {
  this.x = x;
  this.y = y;
}

function TileIndizes(x, y) {
  this.x = Math.floor(x);
  this.y = Math.floor(y);
}

TileIndizes.prototype.shiftNorth = function() {
  return new TileIndizes(this.x, this.y - 1);
};
TileIndizes.prototype.shiftSouth = function() {
  return new TileIndizes(this.x, this.y + 1);
};
TileIndizes.prototype.shiftEast = function() {
  return new TileIndizes(this.x + 1, this.y);
};
TileIndizes.prototype.shiftWest = function() {
  return new TileIndizes(this.x - 1, this.y);
};

TileIndizes.prototype.getNextTile = function(direction) {
  switch (direction) {
    case DIRECTION_ENUM.NORTH:
      return this.shiftNorth();
    case DIRECTION_ENUM.SOUTH:
      return this.shiftSouth();
    case DIRECTION_ENUM.WEST:
      return this.shiftWest();
    case DIRECTION_ENUM.EAST:
      return this.shiftEast();
  }
};

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
