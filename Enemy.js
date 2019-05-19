abstract class Enemy {
 
  float health;
  int maxHealth;
  float healthPercentage;
  
  float mana;
  int maxMana;
  float manaPercentage;
  
  int rdsProtectedFor = -1;
  boolean isProtected = false;
  
  Enemy(int maxHealth, int maxMana) {
    this.maxHealth = maxHealth;
    health = maxHealth;
    this.maxMana = maxMana;
    mana = maxMana;
    
    healthPercentage = health/maxHealth;
    manaPercentage = mana/maxMana;
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

  
  int getHealth(){
   return (int)health; 
  }
  
  int getMaxHealth(){
   return (int)maxHealth; 
  }
  
  int getMana(){
   return (int)mana; 
  }
  
  int getMaxMana(){
   return (int)maxMana; 
  }
  
  void takeDamage(int amount){
    if (isProtected){
      health -= ((amount + dmgSpread)*protRating());
    }
    else {
      health -= amount + dmgSpread;
    }
      hit.rewind();
      hit.play();
  }
  
  void heal(int amount){
    health += amount;
  }
  
  void spendMana(int amount){
    mana -= amount;
  }
  
  void restoreMana(int amount){
    mana += amount;
  }
  
  void changeRdsProtectedFor(int i){
    rdsProtectedFor += i;
  }
  
  int getRdsProtectedFor() {
    return rdsProtectedFor;
  }
  
  boolean isProtected(){
    return isProtected;
  }
  
  void checkStats(){
    if (health > maxHealth){
      health = maxHealth;
    }
    if (mana > maxMana){
      mana = maxMana;
    }
    if (rdsProtectedFor >= 0){
      isProtected = true;
    }
    else {
      isProtected = false;
    }
  }
  
  abstract void spawn(int x, int y);
  
  abstract float protRating(); //this number is multiplied by natural damage, so lower is better
  
  abstract void act(int i);
  
  abstract void die();
  
  abstract boolean isAlive();
  
  abstract String getName();
  
  abstract int getOffsetX();
  
  abstract int getOffsetY();
  
  abstract int manaCost(int j); //same parameters of act, but just returns amount of mana
}
