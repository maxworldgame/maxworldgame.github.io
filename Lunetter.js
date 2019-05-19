class Lunetter extends Enemy {

  int health;
  int mana;
  int l;

  int offsetX = 110;
  int offsetY = -10;

  float protRating = .6;
  boolean isAlive = true;

  String name = "Lunetter";
  //Chomp
  //25 damage
  //no mana
  //Ice Spear
  //1 in 3 chance to stun
  //30 damage
  //15 mana
  //Feeding Frenzy!
  //all allies do basic attack
  //25 mana
  //Ice Shield
  //reduces damage for 3 turns
  //20 mana
  //Telekenesis
  //steals 10 mana
  Lunetter(int maxHealth, int mana) {
    super(maxHealth, mana);
    health = maxHealth;
  }

  void die() {
    isAlive = false;
  }

  void spawn(int x, int y) {
    lunetterLeft.display(x, y);
  }

  boolean isAlive() {
    if (isAlive) {
      return true;
    } else {
      return false;
    }
  }

  void act(int j) {
    if (j == 0) {
      if (timer < lagAllow/3) {
        message = "Lunetter attacks!";
      } else if (timer > lagAllow/3 && timer < 2*lagAllow/3) {
        message = "Lunetter attacks! \nLunetter uses 'Chomp'";
        if (timer == 2*lagAllow/3 - 1) {
          tempError = (int)(randomGaussian()*.1*25);
        }
      } else if (timer > 2*lagAllow/3 && timer < lagAllow) {
        if (timer == lagAllow - 1) {
          player.takeDamage(25 + tempError);
        }
        message = "Lunetter attacks! \nLunetter uses 'Chomp'\nYou take " + (int)(tempError + 25) + " damage!";
      } else if (timer == lagAllow) {
        timer = 0;
        nextTurn();
      }

      //player takes 25 damage 
      //no mana
    } //chomp
    else if (j == 1) {
      if (timer < lagAllow/3) {
        message = "Lunetter attacks!";
      } else if (timer > lagAllow/3 && timer < 2*lagAllow/3) {
        message = "Lunetter attacks! \nLunetter uses 'Feeding Frenzy!'";
        if (timer == 2*lagAllow/3 - 1) {
          tempError = (int)(randomGaussian()*.1*30);
        }
      } else if (timer > 2*lagAllow/3 && timer < lagAllow) {
        message = "Lunetter attacks! \nLunetter uses 'Feeding Frenzy!'\nAll of Lunetter's allies attack!";
        for (int i = 0; i < enemies.length; i++) {
          if (enemies[i].isAlive()) {
            message += "\n" + enemies[i].getName() + " attacks!";
          }
        }

        if (timer == lagAllow - 1) {
          int p = 0;
          for (int i = 0; i < enemies.length; i++) {
            if (enemies[i].isAlive()) {
              p++;
            }
          }
          player.takeDamage((30 + tempError)*p);
          super.spendMana(25);
        }
      } else if (timer == lagAllow) {

        timer = 0;
        nextTurn();
      }
      //player takes 75 damage
      //costs 25 mana
    } //impending doom
    else if (j == 2) {
      if (timer < lagAllow/3) {
        message = "Lunetter attacks!";
      } else if (timer > lagAllow/3 && timer < 2*lagAllow/3) {
        message = "Lunetter attacks! \nLunetter uses 'Ice Spear!'";
        if (timer == 2*lagAllow/3 - 1) {
          tempError = (int)(randomGaussian()*.1*30);
        }
      } else if (timer > 2*lagAllow/3 && timer < lagAllow) {
        if (timer == 2*lagAllow/3 + 1) {
          l = (int)(Math.random()*3);
        }
        if (timer == lagAllow - 1) {
          player.takeDamage(30 + tempError);
          super.spendMana(15);
          if (l == 0) {
            player.setStun(true);
          }
        }
        if (l == 0) {
          message = "Lunetter attacks! \nLunetter uses 'Ice Spear!'\nYou take " + (int)(tempError + 30) + " damage!\nYou are stunned for one turn!";
        } else {
          message = "Lunetter attacks! \nLunetter uses 'Ice Spear!'\nYou take " + (int)(tempError + 30) + " damage!";
        }
      } else if (timer == lagAllow) {
        timer = 0;
        nextTurn();
      }
      //lets assume player has 1000 health and 100 mana is standard
      //player takes 30 damage and croc heals 30 health
      //costs 15 mana
    } //chomp
    else if (j == 3) {
      if (timer < lagAllow/3) {
        message = "Lunetter defends!";
      } else if (timer > lagAllow/3 && timer < 2*lagAllow/3) {
        message = "Lunetter defends! \nLunetter uses 'Ice Shield'";
      } else if (timer > 2*lagAllow/3 && timer < lagAllow) {
        if (timer == lagAllow - 1) {
          //implement code
          super.spendMana(20);
          super.rdsProtectedFor = 3;
        }
        message = "Lunetter defends! \nLunetter uses 'Ice Shield!'\nDamage taken reduced for 3 turns!";
      } else if (timer == lagAllow) {

        timer = 0;
        nextTurn();
      }
      //reduces damage taken by 40% for 3 rounds (does not stack)
      //costs 20 mana
    } //doom barrier
    else if (j == 4) {
      if (timer < lagAllow/3) {
        message = "Lunetter rallies!";
      } else if (timer > lagAllow/3 && timer < 2*lagAllow/3) {
        message = "Lunetter rallies! \nLunetter uses 'Telekenisis!'";
        if (timer == 2*lagAllow/3 - 1) {
          tempError = (int)(randomGaussian()*.1*10);
        }
      } else if (timer > 2*lagAllow/3 && timer < lagAllow) {
        if (timer == lagAllow - 1) {
          player.spendMana(10 + tempError);
          super.restoreMana(10 + tempError);
        }
        message = "Lunetter rallies! \nLunetter uses 'Telekenisis'\nLunetter restores " + (int)(10 + tempError) + " mana!\nYou lose " + (int)(tempError + 10) + " mana!";
      } else if (timer == lagAllow) {
        timer = 0;
        nextTurn();
      }
      //gains 10 health
      //gains 10 mana
    } //doom  charge
  }
  int getOffsetX() {
    return offsetX;
  }

  int getOffsetY() {
    return offsetY;
  }

  String getName() {
    return name;
  }

  float protRating() {
    return protRating;
  }

  int manaCost(int j) {
    if (j == 0) {
      return 0;
    } else if (j == 1) {
      return 25;
    } else if (j == 2) {
      return 15;
    } else if (j == 3) {
      return 20;
    } else if (j == 4) {
      return 0;
    } else {
      return -1;
    }
  }
}
