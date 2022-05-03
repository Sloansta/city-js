
let canvas = document.getElementById('canvas'),
c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let land = "=", water = "~", map = [], chanceOfLand = 0.43, terrainSize = 10;
let mouseX, mouseY;
let zoneTypeSelected = false;

const objectMap = [];

const WIDTH = canvas.width * terrainSize-2,
 HEIGHT = canvas.height * terrainSize-2,
 startWidth = -10,
 startHeight = -10;

makeMap();
generateObjects();

render();

// generates a map, smooths it over 10 times. These variables can be tweaked for various different results.
function makeMap() {
  generateMap();
  for (let i = 0; i < 10; i++) smoothMap();
}

// render. Handles rending to the canvas
function render() {
  requestAnimationFrame(render);
  //draw();
    for (let i = 0; i < objectMap.length; i++ ) {
      objectMap[i].draw(c);
    }

    if(!zoneTypeSelected)
      drawCursorPos(mouseX, mouseY, terrainSize);
}

// generates random points on the map so that the smothing algorithm can pass through
function generateMap() {
  for (let i = startWidth; i < WIDTH; i += terrainSize) {
    map[i] = [];
    for (let j = startHeight; j < HEIGHT; j += terrainSize) {
      if (i === startWidth || i === WIDTH - 1 || j === startHeight || j === HEIGHT - 1)
        map[i][j] = 1;
      if (Math.random() < chanceOfLand) map[i][j] = 1;
      else map[i][j] = 0;
    }
  }
}

// smooths the landscape making it appear natural
function smoothMap() {
  for (let i = startWidth; i < WIDTH; i += terrainSize) {
    for (let j = startHeight; j < HEIGHT; j += terrainSize) {
      let nextWallTiles = getSurroundingTile(i, j);
      if (nextWallTiles > 4) map[i][j] = 1;
      else if (nextWallTiles < 4) map[i][j] = 0;
    }
  }
}

// gets the surrounding tiles
function getSurroundingTile(gridX, gridY) {
  let wallCount = 0;
  for (
    let nextX = gridX - terrainSize;
    nextX <= gridX + terrainSize;
    nextX += terrainSize
  ) {
    for (
      let nextY = gridY - terrainSize;
      nextY <= gridY + terrainSize;
      nextY += terrainSize
    ) {
      if (nextX >= startWidth && nextX <= WIDTH && nextY >= startHeight && nextX <= HEIGHT) {
        if (nextX != gridX || nextY != gridY) wallCount += map[nextX][nextY];
      } else {
        wallCount++;
      }
    }
  }
  return wallCount;
}

// draw. This will likely be changed when we finally flesh out the block object.
function generateObjects() {
  for (let i = 0; i < canvas.width; i+=terrainSize) {
    for (let j = 0; j < canvas.height; j+=terrainSize) {
      if(map[i][j] === 1)
          objectMap.push(new Block(i, j, terrainSize, 'water'));
      else if(map[i+terrainSize][j] === 1 || map[i][j+terrainSize] === 1 || map[i-terrainSize][j] === 1 || map[i][j-terrainSize] === 1)
        objectMap.push(new Block(i, j, terrainSize, 'sand'));
      else if(map[i][j] === 0)
          objectMap.push(new Block(i, j, terrainSize, 'grass'));
    }
  }
}

function drawCursorPos(x, y, size) {
  c.strokeStyle = "rgb(0, 0, 0)";
  c.beginPath();
  c.rect(x, y, size, size);
  c.stroke();
  c.closePath();
}

document.querySelector('canvas').addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});