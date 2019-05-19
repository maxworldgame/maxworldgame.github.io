function Player(playerX, playerY, playerSpeed) {
  this.playerX = playerX;
  this.playerY = playerY;
  this.playerSpeed = playerSpeed;
  
  this.getPlayerX = function(){
    return playerX;
  }
  
  this.getPlayerY = function(){
    return playerY;
  }
  
  this.setPlayerX = function(x){
    playerX = x;
  }
  
  this.setPlayerY = function(y){
    playerY = y;
  }
  
  this.changePlayerX = function(c){
    playerX += c;
  }
  
  this.changePlayerY = function(c){
    playerY += c;
  }
  
  this.getPlayerSpeed = function(){
    return playerSpeed;
  }
}
