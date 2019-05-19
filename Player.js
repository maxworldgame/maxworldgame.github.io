class Player {
  int playerX;
  int playerY;
  int playerSpeed;
  int playerDamage;
  
  float health;
  int maxHealth;
  float healthPercentage;
  
  float mana;
  int maxMana;
  float manaPercentage;
  
  boolean isStunned = false;
  
  Player(int maxHealth, int maxMana, int playerX, int playerY, int playerSpeed, int playerDamage) {
    this.maxHealth = maxHealth;
    health = saveDataInt[6];
    this.maxMana = maxMana;
    mana = saveDataInt[8];
    
    healthPercentage = health/maxHealth;
    manaPercentage = mana/maxMana;
    
    this.playerX = playerX;
    this.playerY = playerY;
    this.playerSpeed = playerSpeed;
    this.playerDamage = playerDamage;
  }
  
  void healthBar(int x, int y){
    healthPercentage = health/maxHealth;
    strokeWeight(1);
    fill(0);
    rect(x - 15, y - 65, 120, 15);
    fill(255, 0, 0);
    rect(x - 75 + 60*healthPercentage, y - 65, 120*healthPercentage, 15);
    
    manaPercentage = mana/maxMana;
    strokeWeight(1);
    fill(0);
    rect(x - 15, y - 51, 120, 5);
    fill(0, 0, 255);
    rect(x - 75 + 60*manaPercentage, y - 51, 120*manaPercentage, 5);
  }
  
  void spawn(int x, int y){
    marioRight.display(x, y);
  }
  
  void takeDamage(int amount){
    timer = 0;
    playerDamageText = true;
    tempDamageVar = amount;
    hit.rewind();
    hit.play();
    health -= amount;
    nextTurn();
  }
  
  int getPlayerX(){
    return playerX;
  }
  
  int getPlayerY(){
    return playerY;
  }
  
  void setPlayerX(int x){
    playerX = x;
  }
  
  void setPlayerY(int y){
    playerY = y;
  }
  
  void changePlayerX(int c){
    playerX += c;
  }
  
  void changePlayerY(int c){
    playerY += c;
  }
  
  int getPlayerSpeed(){
    return playerSpeed;
  }
  
  void spendMana(int amount){
    mana -= amount;
  }
  
  boolean isStunned(){
    return isStunned;
  }
  
  void setStun(boolean b){
    isStunned = b;
  }
  
  int getPlayerDamage(){
    return playerDamage;
  }
}
