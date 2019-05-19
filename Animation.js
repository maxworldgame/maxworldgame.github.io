class Animation {
  PImage[] images;
  int imageCount, imageWidth, imageHeight;
  float gifSpeed = 1;
  float frame;
  
  Animation(String imagePrefix, int imageCount, int imageWidth, int imageHeight, float gifSpeed) {
    this.gifSpeed = gifSpeed;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageCount = imageCount;
    images = new PImage[imageCount];

    for (int i = 0; i < imageCount; i++) {
      // Use nf() to number format 'i' into two digits
      String filename = "images/" + imagePrefix + "/" + imagePrefix + nf(i, 2) + ".png";
      images[i] = loadImage(filename);
    }
  }

  void display(float xpos, float ypos) {
    frame = (frame+(gifSpeed/10.0)) % imageCount;
    image(images[floor(frame)], xpos, ypos, imageWidth, imageHeight);
  }
  
  int getWidth() {
    return images[0].width;
  }
}
