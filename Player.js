class Player {
  var playerX;
  var playerY;
  var playerSpeed;
  
  Player(var playerX, var playerY, var playerSpeed) {
    this.playerX = playerX;
    this.playerY = playerY;
    this.playerSpeed = playerSpeed;
  }
  
  getPlayerX(){
    return playerX;
  }
  
  getPlayerY(){
    return playerY;
  }
  
  setPlayerX(var x){
    playerX = x;
  }
  
  setPlayerY(var y){
    playerY = y;
  }
  
  changePlayerX(var c){
    playerX += c;
  }
  
  changePlayerY(var c){
    playerY += c;
  }
  
  getPlayerSpeed(){
    return playerSpeed;
  }
}
