class Display {
  
  float n;
    
  Display () {
    
  }
  
  void displayText(String text, int x, int y, int numFrames){
    n += ((float)text.length())/numFrames;
  
    if (n < text.length()){
      text(text.substring(0, (int)n), x, y);
    }
    else if (n >= text.length()){
      text(text, x, y);
    }
    }
  
}
