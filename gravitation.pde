public void setup(){
  size(700, 700);
}
boolean start = false;
boolean setvel1 = false;
boolean setvel2 = false;

double a, b, c, d;

int timer = 0;
int c1 = 0;
int c2 = 0;
int c3 = 0;
int c4 = 0;
int c5 = 0;
int c6 = 0;

double star1x = 50;
double star1y = 350;
int star1mass = 10000;

double star2x = 650;
double star2y = 350;
int star2mass = 10000;


double star1radius = Math.pow(star1mass, .5);
double star2radius = Math.pow(star2mass, .5);
double distance;
double force;
float theta;

double star1velx = 0;
double star1vely = 0;
double star2velx = 0;
double star2vely = 0;

double star1accel;
double star2accel;

public void draw(){
  timer++;
  background(#1763A5);
  star1mass = (int)Math.pow(star1radius, 2);
  star2mass = (int)Math.pow(star2radius, 2);
  distance = Math.sqrt(Math.pow(star1x - star2x, 2) + Math.pow(star1y - star2y, 2));
  force = star1mass*star2mass/(6*Math.pow(distance, 2));

  theta = atan2((float)star2y - (float)star1y, (float)star2x - (float)star1x);
 
  star1accel = force/star1mass;
  star2accel = force/star2mass;
 
  strokeWeight(10);
 
  fill(#E0680D);
  stroke(#000001);
  ellipse((float)star1x, (float)star1y, (float)star1radius, (float)star1radius);
  
  fill(#680050);
  stroke(#000002);
  ellipse((float)star2x, (float)star2y, (float)star2radius, (float)star2radius);
  
  if (start && distance > star1radius/2 + star2radius/2){
  star1x += star1velx;
  star1y += star1vely;
  
  star2x += star2velx;
  star2y += star2vely;
  
  star1velx += star1accel*cos(theta);
  star1vely += star1accel*sin(theta);
  
  star2velx -= star2accel*cos(theta);
  star2vely -= star2accel*sin(theta);
  }
  
  if (start == false){
    if (mousePressed && mouseButton == LEFT){

    if((c3 != 1 && c4 != 1) && get(mouseX, mouseY) == color(#E0680D) || c1 == 1){
      setvel1 = false;
      a = 0;
      star1velx = 0;
      star1vely = 0;
      b = 0;
      star1x = mouseX;
      star1y = mouseY;
      
      c1 = 1;
    }
    else if((c3 != 1 && c4 != 1) && get(mouseX, mouseY) == color(#680050) || c2 == 1){
      setvel2 = false;
      c = 0;
      star2velx = 0;
      star2vely = 0;
      d = 0;
      star2x = mouseX;
      star2y = mouseY;
      
      c2 = 1;
    }
    else if(star1radius < 151 && (c1 != 1 && c2 != 1) && get(mouseX, mouseY) == color(#000001) || c3 == 1){
      star1radius = 2*Math.sqrt(Math.pow(star1x - mouseX, 2) + Math.pow(star1y - mouseY, 2));
      
      c3 = 1;
    }
    else if(star2radius < 151 && (c1 != 1 && c2 != 1) && get(mouseX, mouseY) == color(#000002) || c4 == 1){
      star2radius = 2*Math.sqrt(Math.pow(star2x - mouseX, 2) + Math.pow(star2y - mouseY, 2));
      
      c4 = 1;
    }
    }
    else{
      c1 = 0;
      c2 = 0;
      c3 = 0;
      c4 = 0;
    }
  }
  
  if(mousePressed && mouseButton == RIGHT){
    stroke(#FFFFFF);
    strokeWeight(4);
    if(get(mouseX, mouseY) == color(#E0680D) || c5 == 1){
      if((Math.sqrt(Math.pow(mouseX - star1x, 2) + Math.pow(mouseY - star1y, 2))) < 150){
        a = mouseX;
        b = mouseY;
        line((float)star1x, (float)star1y, (float)a, (float)b);
      }
      else{
        a =  star1x + 150*cos(atan2((float)mouseY - (float)star1y, (float)mouseX - (float)star1x));
        b = star1y + 150*sin((atan2((float)mouseY - (float)star1y, (float)mouseX - (float)star1x)));
        line((float)star1x, (float)star1y, (float)a, (float)b);
      }
    c5 = 1;
    setvel1 = true;
    }
    
    if(get(mouseX, mouseY) == color(#680050) || c6 == 1){
      if((Math.sqrt(Math.pow(mouseX - star2x, 2) + Math.pow(mouseY - star2y, 2))) < 150){
        c = mouseX;
        d = mouseY;
        line((float)star2x, (float)star2y, (float)mouseX, (float)mouseY);
      }
      else{
        c = (float)star2x + 150*cos(atan2((float)mouseY - (float)star2y, (float)mouseX - (float)star2x));
        d = (float)star2y + 150*sin((atan2((float)mouseY - (float)star2y, (float)mouseX - (float)star2x)));
        line((float)star2x, (float)star2y, (float)c, (float)d);
      }
    c6 = 1;
    setvel2 = true;
    }
  }
  else{
    c5 = 0;
    c6 = 0;
  }
  
  if (star1radius > 150){
    star1radius = 150;
  }
  else if (star2radius > 150){
    star2radius = 150;
  }
  if (!start){
  if (setvel1){
    strokeWeight(4);
    stroke(#FFFFFF);
    line((float)star1x, (float)star1y, (float)a, (float)b);
    
    if(!start){
    star1velx = (a - star1x)/50;
    star1vely = (b - star1y)/50;
    }
  }
  if (setvel2){
    strokeWeight(4);
    stroke(#FFFFFF);
    line((float)star2x, (float)star2y, (float)c, (float)d);
    
    star2velx = (c - star2x)/50;
    star2vely = (d - star2y)/50;

  }
  }
  startButton();
}

void startButton(){
  strokeWeight(2);
  stroke(#000000);
  if (!start){
    
    fill(#898989);
    rect(300, 0, 100, 50);
    triangle(335, 10, 335, 40, 365, 25);
    
    if (timer > 20 && mousePressed && mouseX > 300 && mouseX < 400 && mouseY < 50){
      start = true;
      timer = 0;
    }
  }
  
  else {
    fill(#F76A6A);
    rect(300, 0, 100, 50);
    fill(#000000);
    rect(333, 8, 33, 33);
    
    if (timer > 20 && mousePressed && mouseX > 300 && mouseX < 400 && mouseY < 50){
      reset();
    }
  }
}

public void reset(){
  start = false;
  setvel1 = false;
  setvel2 = false;
  
  star1x = 50;
  star1y = 350;
  star1mass = 10000;

  star2x = 650;
  star2y = 350;
  star2mass = 10000;
  timer = 0;
  c1 = 0;
  c2 = 0;
  c3 = 0;
  c4 = 0; 
  c5 = 0;
  c6 = 0;
  
  star1radius = Math.pow(star1mass, .5);
  star2radius = Math.pow(star2mass, .5);
  
  star1velx = 0;
  star1vely = 0;
  star2velx = 0;
  star2vely = 0;
  
  star1accel = 0;
  star2accel = 0;
}
