class Crocodoomer extends Enemy {
  
  int health;
  int mana;
  
  int offsetX = 15;
  int offsetY = -10;
  
  float protRating = .6;
  boolean isAlive = true;
  
  String name = "Crocodoomer";
  
  Crocodoomer(int maxHealth, int mana) {
    super(maxHealth, mana);
    health = maxHealth;
  }
  
  void die(){
   isAlive = false; 
  }
  
  void spawn(int x, int y){
    crocodoomerLeft.display(x, y);
  }
  
  boolean isAlive(){
    if(isAlive){
      return true;
    }
    else{
      return false;
    }
  }
  
  void act(int j){
    if(j == 0){
      if (timer < lagAllow/3){
        message = "Crocodoomer attacks!";
      }
      else if (timer > lagAllow/3 && timer < 2*lagAllow/3){
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Chomp'";
        if (timer == 2*lagAllow/3 - 1){
          tempError = (int)(randomGaussian()*.1*25);
        }
      }
      
      else if (timer > 2*lagAllow/3 && timer < lagAllow){
        if(timer == lagAllow - 1){
          player.takeDamage(25 + tempError);
        }
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Chomp'\nYou take " + (int)(25 + tempError) + " damage!";
    }
      else if (timer == lagAllow){
        
        timer = 0;
        nextTurn();
        }
      
      //player takes 25 damage 
      //no mana
      //chomp
    }
    else if (j == 1){
      if (timer < lagAllow/3){
        message = "Crocodoomer attacks!";
      }
      else if (timer > lagAllow/3 && timer < 2*lagAllow/3){
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Impending Doom'";
        if (timer == 2*lagAllow/3 - 1){
          tempError = (int)(randomGaussian()*.1*75);
        }
      }
      
      else if (timer > 2*lagAllow/3 && timer < lagAllow){
        if (timer == lagAllow - 1){
          player.takeDamage(75 + tempError);
          super.spendMana(25);
        }
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Impending Doom'\nYou take " + (int)(75 + tempError) + " damage!";
    }
      else if (timer == lagAllow){
        
        timer = 0;
        nextTurn();
        }
      //player takes 75 damage
      //costs 25 mana
    } //impending doom
    else if (j == 2){
      if (timer < lagAllow/3){
        message = "Crocodoomer attacks!";
      }
      else if (timer > lagAllow/3 && timer < 2*lagAllow/3){
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Shadow Claw'";
        
        if (timer == 2*lagAllow/3 - 1){
          tempError = (int)(randomGaussian()*.1*30);
        }
      }
      
      else if (timer > 2*lagAllow/3 && timer < lagAllow){
        if (timer == lagAllow - 1){
          player.takeDamage(30 + tempError);
          super.heal(30 + tempError);
          super.spendMana(15);
        }
        message = "Crocodoomer attacks! \nCrocodoomer uses 'Shadow Claw'\nYou take " + (int)(30 + tempError) + " damage!\nCrocodoomer heals " + (int)(30 + tempError) + " health!";
    }
      else if (timer == lagAllow){
        timer = 0;
        nextTurn();
        }
      //lets assume player has 1000 health and 100 mana is standard
      //player takes 30 damage and croc heals 30 health
      //costs 15 mana
    } //shadow claw
    else if (j == 3){
      if (timer < lagAllow/3){
        message = "Crocodoomer defends!";
      }
      else if (timer > lagAllow/3 && timer < 2*lagAllow/3){
        message = "Crocodoomer defends! \nCrocodoomer uses 'Doom Barrier'";
      }
      
      else if (timer > 2*lagAllow/3 && timer < lagAllow){
        if(timer == lagAllow - 1){
        super.rdsProtectedFor = 3;
        super.spendMana(20);
        }
        message = "Crocodoomer defends! \nCrocodoomer uses 'Doom Barrier'\nDamage taken reduced for 3 turns!";
    }
      else if (timer == lagAllow){
        
        timer = 0;
        nextTurn();
        }
      //reduces damage taken by 40% for 3 rounds (does not stack)
      //costs 20 mana
    } //doom barrier
    else if (j == 4){
      if (timer < lagAllow/3){
        message = "Crocodoomer rallies!";
      }
      else if (timer > lagAllow/3 && timer < 2*lagAllow/3){
        message = "Crocodoomer rallies! \nCrocodoomer uses 'Doom Charge'";
        if (timer == 2*lagAllow/3 - 1){
          tempError = (int)(randomGaussian()*.1*10);
        }
      }
      
      else if (timer > 2*lagAllow/3 && timer < lagAllow){
        if(timer == lagAllow - 1){
          super.heal(10 + tempError);
          super.restoreMana(10 + tempError);
        }
        message = "Crocodoomer rallies! \nCrocodoomer uses 'Doom Charge'\nCrocodoomer heals " + (int)(tempError + 10) + " health!\nCrocodoomer restores " + (int)(tempError + 10) + " mana!";
    }
      else if (timer == lagAllow){
        timer = 0;
        nextTurn();
        }
      //gains 10 health
      //gains 10 mana
    } //doom  charge
}

  int getOffsetX(){
    return offsetX;
  }
  
  int getOffsetY(){
    return offsetY;
  }
  
  
  String getName(){
    return name;
  }
  
  float protRating(){
   return protRating; 
  }
  
  int manaCost(int j){
    if(j == 0){
      return 0;
    }
    else if (j == 1){
      return 25;
    } 
    else if (j == 2){
      return 15;
    } 
    else if (j == 3){
      return 20;
    }
    else if (j ==4){
      return 0;
    }
    else {
      return -1;
    }
  }
}
