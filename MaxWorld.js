import ddf.minim.*;

Animation crocodoomerLeft;
Animation crocodoomerRight;
Animation lunetterLeft;
Animation marioRight;
Animation fightBackground;

Display display;

PFont arcade;
PFont monsterfriend;
PImage sigil;
PImage shield; 

String[] saveData;     //stores whole strings, line by line of saveData.txt, e.g. 'playerX = 100'
String[] storeStrings; //stores just the string part before the number, e.g. 'playerX = '
int [] saveDataInt;    //stores the numerical data part of each line, e.g. '100'     

boolean[] keys; //better quality of character movement. 0 = L, 1 = U, 2 = R, 3 = D

Player player;

Minim minim;
AudioPlayer fightSong;
AudioPlayer hit;

int bX[] = {1060, 950, 1060};
int bY[] = {100, 325, 550};

int pX[] = {190, 300, 190};
int pY[] = {100, 325, 550};

int lagAllow = 40; 
boolean inBattle = false;
boolean changeText = false;

String message = "Crocodoomer and his friends appear!";

Save save = new Save();

public void setup() {
  minim = new Minim(this);
  keys = new boolean[4];
  
  for (int i = 0; i < keys.length; i++){
    keys[i] = false;
  }//setting initial conditions of keyPressed to false for all keys

  saveData = loadStrings("data/saveData.txt");
  storeStrings = new String[saveData.length]; //temporary storage of strings before the #'s
  saveDataInt = new int[saveData.length];
  
  save.load();
  
  fightSong = minim.loadFile("sound/fightSong.mp3");
  hit = minim.loadFile("sound/hit.mp3");
  
  arcade = createFont("fonts/arcade.ttf", 20);
  monsterfriend = createFont("fonts/monsterfriend.ttf", 20);
  
  crocodoomerLeft = new Animation("crocodoomerLeft", 7, 500, 280, 3);
  lunetterLeft = new Animation("lunetterLeft", 8, 1048, 601, 6);
  crocodoomerRight = new Animation("crocodoomerRight", 7, 500, 280, 3);
  marioRight = new Animation("marioRight", 8, 300, 300, 3);
  fightBackground = new Animation("fightBackground", 24, 1250, 750, 10);
  sigil = loadImage("images/sigil.png");
  shield = loadImage("images/shield.png");
  
  player = new Player(saveDataInt[7], saveDataInt[9], saveDataInt[0], saveDataInt[1], saveDataInt[4], saveDataInt[5]);
  display = new Display();
  
  size(1250, 750);
  rectMode(CENTER);
  imageMode(CENTER);
}

//Crocodoomer croc = new Crocodoomer(1000, 100

boolean damageText = false;
int tempDamageVar; //stores damage taken by player
int tempError; //stores standard error of enemy attacks
boolean playerDamageText = false;

int timer = 0;

int r = (int)(Math.random()*5);
boolean run = true;

int dmgSpread;

Enemy enemies[] = new Enemy[3];
Field battle = new Field();
Map map = new Map();

public void draw() {
  textFont(arcade);
  if (run) {
    enemies[0] = new Crocodoomer(80, 100);
    enemies[1] = new Lunetter(150, 100);
    enemies[2] = new Crocodoomer(80, 100);

    run = false;
  }
  background(200);
  
  if (mousePressed && !inBattle) { inBattle = true; }
  
  if (inBattle){
    battle();
  }
  else {
    map.drawMap();
    player.spawn(player.getPlayerX(), player.getPlayerY());
  }
  
  controls();
  timer++;
}










public void battle() {
  
  fightBackground.display(width/2, height/2);
  
  if(!battle.isPlayerTurn()){
    noFill();
    strokeWeight(10);
    stroke(0, 255, 0);
    image(sigil, bX[battle.getEnemyTurn()], bY[battle.getEnemyTurn()], 200, 200);
    stroke(0);
  }
  else{
    dmgSpread = (int)(randomGaussian()*player.getPlayerDamage()*.1); //standard deviation is 10%
    noFill();
    strokeWeight(10);
    stroke(0, 255, 0);
    image(sigil, pX[0], pY[0], 200, 200);
    stroke(0);
  }
  
  strokeWeight(10);
  noFill();
  //rect(bX[0], bY[0], 100, 100);
  //rect(bX[1], bY[1], 100, 100);
  //rect(bX[2], bY[2], 100, 100);

  //rect(pX[0], pY[0], 100, 100);
  //rect(pX[1], pY[1], 100, 100);
  //rect(pX[2], pY[2], 100, 100);

  fill(#300AAD);
  strokeWeight(5);
  rect(625, 600, 500, 300); //battle interface
  
  player.spawn(pX[0], pY[0] - 15);
  player.healthBar(pX[0] + 15, pY[0] - 10);
  
  if(timer == lagAllow){
    r = (int)(Math.random()*5);
  }

  for (int i = 0; i < enemies.length; i++) {
    if(enemies[i].getHealth() <= 0){
      enemies[i].die();
    }
    if (enemies[i].isAlive()){
      
        enemies[i].checkStats();
        enemies[i].spawn(bX[i] + enemies[i].getOffsetX(), bY[i] + enemies[i].getOffsetY());
        enemies[i].healthBar(bX[i] + 15, bY[i] - 10);
        if (enemies[i].isProtected()){
          image(shield, bX[i] - 80, bY[i] - 75, 40, 40);
          fill(0);
          text(enemies[i].getRdsProtectedFor() + 1,bX[i] - 85, bY[i] - 65);
        }
    }
  }

  if (battle.isPlayerTurn()) {

    if (battle.buttonSelect() < 0) {
        battle.buttonSet(2);
      } else if (battle.buttonSelect() > 2) {
        battle.buttonSet(0);
      }
    
    if (battle.returnBattleInterface() == 0) {
      
      intZero();
      
    }
    
    else if (battle.returnBattleInterface() == 1) {
      
      intOne();
      
    }
    
  }
  
  //if not player's turn
  
  else {
      if(enemies[battle.getEnemyTurn()].isAlive()){
        while (enemies[battle.getEnemyTurn()].manaCost(r) > enemies[battle.getEnemyTurn()].getMana()){
          r = (int)(Math.random()*5);
        }
        enemies[battle.getEnemyTurn()].act(r);
      }
      else {
        if(battle.getEnemyTurn() < enemies.length - 1){
        battle.changeEnemyTurn(1);
        }
        else{
          battle.startTurn();
          battle.setEnemyTurn(0);
        }
      }
  }
  
  //end
  
  fill(255); //message box
  textSize(20);
  if (timer == 0){
    display.n = 0;
  }
  display.displayText(message, 400, 485, 10);
  fill(#A05D5D);
  
  if (!enemies[0].isAlive() && !enemies[1].isAlive() && !enemies[2].isAlive()){
    inBattle = false;
    fightSong.shiftGain(0, -100, 6000);
  }
  
  fightSong.play();
  loop(fightSong, 1000);
  
  if (damageText && timer < lagAllow/3){
    textFont(monsterfriend);
    fill(177 + 40*timer, 8 + 50*timer, 26 + 30*timer, 255 - 20*timer);
    textSize(30);
    if (enemies[battle.buttonSelect()].isProtected){
      text("-" + (int)((Math.floor(player.getPlayerDamage() + dmgSpread)*enemies[battle.buttonSelect()].protRating())), bX[battle.buttonSelect()] - 150 , bY[battle.buttonSelect()] - 20 + 2*timer);
    }
    else {
      text("-" + (int)(Math.floor(player.getPlayerDamage()) + dmgSpread), bX[battle.buttonSelect()] - 150 , bY[battle.buttonSelect()] - 20 + 2*timer);
    }
  }
  else {
    damageText = false;
  }
  if (playerDamageText){
    if (timer < lagAllow/3){
    textFont(monsterfriend);
    fill(177 + 40*timer, 8 + 50*timer, 26 + 30*timer, 255 - 20*timer);
    textSize(30);
    text("-" + tempDamageVar, pX[0] + 30, pY[0] - 20 + 2*timer);
    }
    else {
      playerDamageText = false;
    }
  }
}


void nextTurn(){
  if(battle.getEnemyTurn() < enemies.length - 1){
    if(enemies[battle.getEnemyTurn()].isAlive()){
    while (enemies[battle.getEnemyTurn()].manaCost(r) > enemies[battle.getEnemyTurn()].getMana()){
          r = (int)(Math.random()*5);
        }
        enemies[battle.getEnemyTurn()].act(r);
    battle.changeEnemyTurn(1);
    }
    else {
      battle.changeEnemyTurn(1);
      nextTurn();
    }
  }
  else {
    battle.startTurn();
    battle.setEnemyTurn(0);
  }
}

void intZero(){
 
      message = "Crocodoomer and his friends appear!";

      //responsible for indicating which battle box you have selected
      if (battle.buttonSelect() == 0) {
        strokeWeight(5);
        fill(#EFEC37);
      } else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      rect(500, 530, 140, 40);
      fill(0);
      text("Attack", 470, 535);

      if (battle.buttonSelect() == 1) {
        strokeWeight(5);
        fill(#EFEC37);
      } else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      rect(500, 610, 140, 40);
      fill(0);
      text("Magic", 470, 615);

      if (battle.buttonSelect() == 2) {
        strokeWeight(5);
        fill(#EFEC37);
      } else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      rect(500, 690, 140, 40);
      fill(0);
      text("Flee", 470, 695);
    }
    
void intOne(){
  
  message = "Crocodoomer and his friends appear!";
  textSize(18);
  
      //responsible for indicating which battle box you have selected
      if (battle.buttonSelect() == 0) {
        strokeWeight(5);
        fill(#EFEC37);
      }
      else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      if (!enemies[0].isAlive()){
        fill(#8A92A0);
      }
      rect(500, 530, 140, 40);
      fill(0);
      text(enemies[0].getName(), 440, 535);

      if (battle.buttonSelect() == 1) {
        strokeWeight(5);
        fill(#EFEC37);
      }
      else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      if (!enemies[1].isAlive()){
        fill(#8A92A0);
      }
      rect(500, 610, 140, 40);
      fill(0);
      text(enemies[1].getName(), 440, 615);

      if (battle.buttonSelect() == 2) {
        strokeWeight(5);
        fill(#EFEC37);
      } 
      else {
        fill(#A05D5D);
        strokeWeight(1);
      }
      if (!enemies[2].isAlive()){
        fill(#8A92A0);
      }
      rect(500, 690, 140, 40);
      fill(0);
      text(enemies[2].getName(), 440, 695);
      
      fill(255);
      textSize(15);
      
      for (int i = 0; i < enemies.length; i++){
        if (enemies[i].isAlive()){
          text("HP: " + enemies[i].getHealth() + " / " + enemies[i].getMaxHealth(), 640, 525 + 80*i);
          text("Mana: " + enemies[i].getMana() + " / " + enemies[i].getMaxMana(), 640, 545 + 80*i);
        }
      } 
}

void controls(){
  if (!inBattle) {
      if (keys[0] && keys[1] && !keys[2] && !keys[3]){
        player.changePlayerX(-player.getPlayerSpeed());
        player.changePlayerY(-player.getPlayerSpeed());
      }
      else if (keys[1] && keys[2] && !keys[0] && !keys[3]){
        player.changePlayerY(-player.getPlayerSpeed());
        player.changePlayerX(player.getPlayerSpeed());
      }
      else if (keys[2] && keys[3] && !keys[0] && !keys[1]){
        player.changePlayerX(player.getPlayerSpeed());
        player.changePlayerY(player.getPlayerSpeed());
      }
      else if (keys[3] && keys[0] && !keys[1] && !keys[2]){
        player.changePlayerY(player.getPlayerSpeed());
        player.changePlayerX(-player.getPlayerSpeed());
      }
      else if (keys[0] && !keys[1] && !keys[2] && !keys[3]){
        player.changePlayerX(-player.getPlayerSpeed());
      }
      else if (keys[1] && !keys[0] && !keys[2] && !keys[3]){
        player.changePlayerY(-player.getPlayerSpeed());
      }
      else if (keys[2] && !keys[0] && !keys[1] && !keys[3]){
        player.changePlayerX(player.getPlayerSpeed());
      }
      else if (keys[3] && !keys[0] && !keys[1] && !keys[2]){
        player.changePlayerY(player.getPlayerSpeed());
      }
}
}

void keyPressed(){
    if (keyCode == LEFT){
      keys[0] = true;
    }
    else if (keyCode == UP){
      keys[1] = true;
    }
    else if (keyCode == RIGHT){
      keys[2] = true;
    }
    else if (keyCode == DOWN){
      keys[3] = true;
    }
    
    if (keyPressed && (key == 's'|| keyCode == DOWN)) {
          battle.buttonChange(1);
          timer = 1;
        } else if (keyPressed && (key == 'w' || keyCode == UP)) {
          battle.buttonChange(-1);
          timer = 1;
        }
    if (inBattle && keyPressed && key == ENTER && battle.buttonSelect() == 0 && battle.returnBattleInterface() == 0) {
      battle.setBattleInterface(1);
      timer = 1;
    }
    if (battle.returnBattleInterface() == 1 && timer > 5){
    if (keyPressed && key == ENTER && battle.isPlayerTurn() && enemies[battle.buttonSelect()].isAlive()) {
      enemies[battle.buttonSelect()].takeDamage(player.getPlayerDamage()); 
      battle.endTurn();
      r = (int)(Math.random()*5);
      timer = 0;

      damageText = true;
    }
  }
}

void keyReleased(){
    if (keyCode == LEFT){
      keys[0] = false;
    }
    else if (keyCode == UP){
      keys[1] = false;
    }
    else if (keyCode == RIGHT){
      keys[2] = false;
    }
    else if (keyCode == DOWN){
      keys[3] = false;
    }
}

void loop(AudioPlayer a, int offset){          //loops a sound effect as long as loop() is in a draw function
  if (a.position() > a.length() - offset){     //offset = number of miliseconds the soundbyte will cut off. used for soundbytes with extra silence after
    a.rewind();                                //rewinds the soundbyte
  }
}
