float angle = 0;
float angle1 = 0;
float aVelocity = 0;
float aAcceleration = 0.001;
float g = 10;
float length = 150;
float period = 2*PI*sqrt(length/g);
float realPeriod = round(period/.065369);
float frequency = round(100000/realPeriod);
float velocity = sqrt(2*g*length*pow((sin(angle)),2));
float mass = 50;
float radius = 8*pow(mass, .33333);
float KE, GPE, energy, momentum; 

//add pause button, make one able to change vars in program
 
void setup() {
  size(700,700);
}
 
void draw() {
  background(100, 200, 300);
  velocity = sqrt(2*g*length*pow((sin(angle)), 2));
  momentum = velocity * mass;
  KE = mass*(pow(velocity, 2))/2;
  GPE = mass*g*length*pow((cos(angle)), 2);
  period = 2*PI*sqrt(length/g);
  realPeriod = round(period/.065369);
  frequency = round(100000/realPeriod);
  radius = 8*pow(mass, .33333);
  
  fill(175);
  stroke(0);
  translate(width/2,height/2);
  rotate(angle);
  line(0,0,length,0);
  fill(0);
  ellipse(length,0,radius,radius);
  
  rotate(angle1);
  fill(255);
  rect(90, -335, 240, 210);
  fill(0);
  textSize(16);
  text("Velocity: " + round(velocity) + " pixels/sec", 100, -315);
  text("Period: " + realPeriod/100 + " seconds", 100, -295);
  text("Frequency: " + frequency/1000 + " Hz", 100, -275);
  text("Length: " + round(length) + " pixels", 100, -255);
  text("Mass: " + round(mass) + " kg", 100, -235);
  text("g: " + g, 100, -215);
  text("Momentum: " + round(momentum), 100, -195);
  text("Kinetic Energy: " + round(KE), 100, -175);
  text("Potential Energy: " + abs(round(GPE)), 100, -155);
  text("Total Energy: " + round(KE + abs(GPE)), 100, -135);
  
  text("Length of pendulum",-330, -325);
  fill(255);
  rect(-330, -310, 300, 20);
  fill(0);
  rect(-330, -310, length, 20);
  
  text("Gravitational Acceleration",-330, -265);
  fill(255);
  rect(-330, -250, 300, 20);
  fill(0);
  rect(-330, -250, g*15, 20);
  
  text("Mass",-330, -205);
  fill(255);
  rect(-330, -190, 300, 20);
  fill(0);
  rect(-330, -190, mass*3, 20);
  
  if(mousePressed && mouseX > 20 && mouseX < 320 && mouseY > 42 && mouseY < 62){
   length = mouseX - 20;
   angle = 0;
   aVelocity = 0;
   aAcceleration = 0;
   angle1 = 0;
  }
  else if (mousePressed && mouseX > 40 && mouseX < 334 && mouseY > 102 && mouseY < 122){
   g = (mouseX - 20)/15;
   angle = 0;
   aVelocity = 0;
   aAcceleration = 0;
   angle1 = 0;
  }
  else if (mousePressed && mouseX > 21 && mouseX < 325 && mouseY > 162 && mouseY < 182){
   mass = (mouseX - 20)/3;
   angle = 0;
   aVelocity = 0;
   aAcceleration = 0;
   angle1 = 0;
  }
  
  
 
  aAcceleration = g*0.00011020408/(length/150)*cos(angle);
  aVelocity += aAcceleration;
  angle += aVelocity;
  angle1 -= aVelocity;
  
}
