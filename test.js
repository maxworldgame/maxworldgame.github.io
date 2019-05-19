let img;
let song;

function setup() {
	createCanvas(800, 800);
	img = loadImage('player.png');
	song = loadSound('data/sound/fightSong.mp3');
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