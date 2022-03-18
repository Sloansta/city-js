 /*
  Created by Sloan (AKA Sloansta)
  
  Spot a bug? See if you can fix it!
  
  My code is free for use, just give credit!
  */
  window.onload = function() {
    let canvas = document.getElementById('canvas'),
        c = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const WIDTH = canvas.width,
       HEIGHT = canvas.height;
  
   let land = "=", water = "~", map = [], chanceOfLand = 0.43, terrainSize = 10;
   let mouseX, mouseY;
  
   MakeMap();
   function MakeMap() {
     generateMap();
     for(let i = 0; i < 10; i++)
      smoothMap();
     draw();
   }
  
   function generateMap() {
     for (let i = 0; i < canvas.width; i+=terrainSize) {
       map[i] = [];
       for (let j = 0; j < canvas.height; j+=terrainSize) {
         if(i === 0 || i === WIDTH-1 || j === 0 || j === HEIGHT-1)
             map[i][j] = 1;
         if(Math.random() < chanceOfLand)
           map[i][j] = 1;
         else
           map[i][j] = 0;
       }
     }
   }
  
   function smoothMap() {
     for (let i = 0; i < canvas.width; i+=terrainSize) {
       for (let j = 0; j < canvas.height; j+=terrainSize) {
           let nextWallTiles = getSurroundingTile(i,j);
           if(nextWallTiles > 4)
             map[i][j] = 1;
           else if(nextWallTiles < 4)
               map[i][j] = 0;
       }
     }
   }
  
   function getSurroundingTile(gridX, gridY) {
     let wallCount = 0;
     for (let nextX = gridX-terrainSize; nextX <= gridX+terrainSize; nextX+=terrainSize) {
       for (let nextY = gridY-terrainSize; nextY <= gridY+terrainSize; nextY+=terrainSize) {
         if(nextX >= 0 && nextX < canvas.width && nextY >= 0 && nextX < canvas.height) {
           if(nextX != gridX || nextY != gridY)
             wallCount += map[nextX][nextY];
         }else {
           wallCount++;
         }
       }
     }
     return wallCount;
   }
  
   function draw() {
     for (let i = terrainSize; i < canvas.width; i+=terrainSize) {
       for (let j = terrainSize; j < canvas.height; j+=terrainSize) {
         if(map[i][j] === 1)
             c.fillStyle = "rgb(0, 18, 255)";
         else if(map[i+terrainSize][j] === 1 || map[i][j+terrainSize] === 1 || map[i-terrainSize][j] === 1 || map[i][j-terrainSize] === 1)
           c.fillStyle = "rgb(255, 253, 91)";
         else if(map[i][j] === 0)
             c.fillStyle = "rgb(43, 255, 0)";
          c.fillRect(i, j, terrainSize, terrainSize);
       }
     }
   }
  };