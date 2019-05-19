class Field {
  boolean playerTurn = true;
  int enemyTurn = 0;
  int battleTurn = 0;
  int buttonSelect = 0;
  
  int battleInterface = 0; // |0 -> main | 1 -> attack | 2 -> magic | 3 -> flee |
  
  Field() {
    
  }
  
  boolean isPlayerTurn() {
    return playerTurn;
  }
  
  int returnBattleInterface() {
    return battleInterface;
  }
  
  int buttonSelect() {
    return buttonSelect;
  }
  
  void buttonChange(int i){
    buttonSelect += i;
  }
  
  void buttonSet(int i){
    buttonSelect = i;
  }
  
  void startTurn() {
    for (int i = 0; i < enemies.length; i++) {
      enemies[i].changeRdsProtectedFor(-1);
    }
    
    if (!player.isStunned()){
    playerTurn = true; 
    battleInterface = 0;
    buttonSelect = 0;
    }
    else {
      player.setStun(false);
      endTurn();
    }
  }
  
  void endTurn() {
    playerTurn = false;
  }
  
  void setBattleInterface(int i){
   battleInterface = i;
  }
  
  int getEnemyTurn(){
    return enemyTurn;
  }
  
  void changeEnemyTurn(int i){
    enemyTurn += i;
    r = (int)(Math.random()*5);
  }
  
  void setEnemyTurn(int i){
    enemyTurn = i;
    r = (int)(Math.random()*5);
  }
  
  void enemyTurn() {
    for(int i = 0; i < enemies.length; i++){
      if (enemies[i].isAlive()){
        enemies[i].act(r);
    }
      else {
        enemyTurn++;
      }
  }
  }
}
