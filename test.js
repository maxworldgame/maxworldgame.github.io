let img;

function setup() {
	createCanvas(800, 800);
	img = loadImage('player.png');
}

var playerSize = 100;

function draw() {
	background(200);

	fill(255, 0, 0);
	image(img, 100, 100);

	if(mouseIsPressed){
		playerSize++;
	}
}