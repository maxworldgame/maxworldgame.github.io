function Animation(imagePrefix, imageCount, imageWidth, imageHeight, gifSpeed) {
  this.imagePrefix = imagePrefix;
  this.imageCount = imageCount;
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
  this.gifSpeed = gifSpeed;

  let images = [];
  var frame = 0;
  
  
  for (var i = 0; i < imageCount; i++) {
    // Use nf() to number format 'i' into two digits
    var filename = "data/images/" + imagePrefix + "/" + imagePrefix + nf(i, 2, 0) + ".png";
    images[i] = loadImage(filename);
  }

  this.display = function(xpos, ypos) {
    frame = (frame+(gifSpeed/10.0)) % imageCount;
    image(images[floor(frame)], xpos, ypos, imageWidth, imageHeight);
  }
  
  this.getWidth = function() {
    return images[0].width;
  }
}
