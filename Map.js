class Map {
  int mapX = 0;
  int mapY = 0;
  
  Map(){
    
  }
  
  void drawMap(){
    if (mapX == 0 && mapY == 0){
      
      deadZone(400, 0, 500, 1000, true);
      deadZone(900, 0, 1000, 600, true);
      
      exitPoint(350, 700, 400, 750, 0, 0, 850, 100, true);
      
      if (triggerZone(1000, 135, 1250, 265)){
        inBattle = true;
      }
      
      crocodoomerLeft.display(1125, 200);
    }
  }
  
  void exitPoint(int x1, int y1, int x2, int y2, int mapX, int mapY, int nx, int ny){ 
    //if player is in between x1 and x2, and y1 and y2, player gets tp'd to [mapX, mapY] at coords [nx, ny]
    if ((player.getPlayerX() > x1 - 30 && player.getPlayerX() < x1 - 20 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x2 + 20 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < (y2 + y1)/2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > (y1 + y2)/2 - 55 && player.getPlayerY() < y2 + 30)){
      this.mapX = mapX;
      this.mapY = mapY;
      player.setPlayerX(nx);
      player.setPlayerY(ny);
    }
  }
  
  void exitPoint(int x1, int y1, int x2, int y2, int mapX, int mapY, int nx, int ny, boolean b){ 
    //if player is in between x1 and x2, and y1 and y2, player gets tp'd to [mapX, mapY] at coords [nx, ny]
    if ((player.getPlayerX() > x1 - 30 && player.getPlayerX() < x1 - 20 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x2 + 20 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < (y2 + y1)/2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > (y1 + y2)/2 - 55 && player.getPlayerY() < y2 + 30)){
      this.mapX = mapX;
      this.mapY = mapY;
      player.setPlayerX(nx);
      player.setPlayerY(ny);
    }
    if (b) {
      fill(0, 255, 255);
      rect(x1 + (x2 - x1)/2, y1 + (y2 - y1)/2, x2 - x1, y2 - y1);
    }
  }
  
  void deadZone(int x1, int y1, int x2, int y2){
    //create a zone where the player cannot move into, like walls
    //reason for halves is so doesn't get pushed to the left when coming from the right side
    //thus, deadzones have to be larger than playerspeed
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x1 - 20 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerX(-player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x2 + 20 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerX(player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < (y2 + y1)/2 + 30){
      player.changePlayerY(-player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > (y1 + y2)/2 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerY(player.getPlayerSpeed());
    }
  }
  void deadZone(int x1, int y1, int x2, int y2, boolean b){ //same but now visible if b = true
    //create a zone where the player cannot move into, like walls
    //reason for halves is so doesn't get pushed to the left when coming from the right side
    //thus, deadzones have to be larger than playerspeed
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x1 - 20 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerX(-player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x2 + 20 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerX(player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < (y2 + y1)/2 + 30){
      player.changePlayerY(-player.getPlayerSpeed());
    }
    if (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > (y1 + y2)/2 - 55 && player.getPlayerY() < y2 + 30){
      player.changePlayerY(player.getPlayerSpeed());
    }
    if (b) {
      fill(0);
      rect(x1 + (x2 - x1)/2, y1 + (y2 - y1)/2, x2 - x1, y2 - y1);
    }
  }
  
  boolean triggerZone(int x1, int y1, int x2, int y2){
    //returns true if player is in these parameters
    //returns false in all other scenarios
    if ((player.getPlayerX() > x1 - 30 && player.getPlayerX() < x1 - 20 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x2 + 20 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < y2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > y1 - 55 && player.getPlayerY() < (y2 + y1)/2 + 30) || (player.getPlayerX() > x1 - 30 && player.getPlayerX() < x2 + 25 && player.getPlayerY() > (y1 + y2)/2 - 55 && player.getPlayerY() < y2 + 30)){
      return true;
    }
    else {
      return false;
    }
  }
}
