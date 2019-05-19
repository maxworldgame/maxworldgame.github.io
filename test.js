let img;

function setup() {
	createCanvas(800, 800);
	img = loadImage('player.png');
}

var playerSize = 100;

function draw() {
	background(200);

	fill(255, 0, 0);
	image(img, mouseX, mouseY, playerSize, playerSize);

	if(mouseIsPressed){
		playerSize++;
	}
}