let img;
let song;

function setup() {
	createCanvas(1250, 750);
	img = loadImage('player.png');
	song = loadSound('data/sound/fightSong.mp3');
	imageMode(CENTER);
}

var playerSize = 100;

function draw() {
	background(100);

	fill(255, 0, 0);
	image(img, mouseX, mouseY, playerSize, playerSize);

	if(mouseIsPressed){
		playerSize++;
		song.play();
	}
}