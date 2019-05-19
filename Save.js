class Save {
  int n; //index of actual number within a line
  String line; //stores each line
  int storeData; //temporary storage of variable
  
  Save(){//empty constructor

  }
  
  void save(){
    //have to create save for everything now
    saveData[0] = storeStrings[0] + Integer.toString(player.getPlayerX());
    saveData[1] = storeStrings[1] + Integer.toString(player.getPlayerY());
    saveData[2] = storeStrings[2] + Integer.toString(map.mapX);
    saveData[3] = storeStrings[3] + Integer.toString(map.mapY);
    saveData[4] = storeStrings[4] + Integer.toString(player.getPlayerSpeed());
    saveData[5] = storeStrings[5] + Integer.toString(player.getPlayerDamage());
    saveData[6] = storeStrings[6] + Integer.toString((int)player.health);
    saveData[7] = storeStrings[7] + Integer.toString(player.maxHealth);
    saveData[8] = storeStrings[8] + Integer.toString((int)player.mana);
    saveData[9] = storeStrings[9] + Integer.toString(player.maxMana);
    
    saveStrings("data/saveData.txt", saveData);
  }
  
  void load(){
    //stores words before numbers in text file
    for(int i = 0; i < saveData.length; i++){
      line = saveData[i];
      for(int j = 0; j < line.length() - 3; j++){
        if(line.substring(j, j + 3).equals(" = ")){
          n = j + 3; //establishes where the actual number is
        }
      }
        storeStrings[i] = line.substring(0, n);
    }
    
    //loads and converts the numbers from saveData to saveDataInt
    for(int i = 0; i < saveData.length; i++){
      line = saveData[i];
      for(int j = 0; j < line.length() - 3; j++){
        if(line.substring(j, j + 3).equals(" = ")){
          n = j + 3; //establishes where the actual number is
        }
      }
      storeData = Integer.parseInt(saveData[i].substring(n));
      saveDataInt[i] = storeData;
    }
    //so now we have this funciton that turns the txt file into an array of ints
    //only ints will be counted
    //now i have to implement elements of array later
  }
}
