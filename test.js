let img;
let song;
let player;

function setup() {
	createCanvas(1250, 750);
	img = loadImage('player.png');
	song = loadSound('data/sound/fightSong.mp3');
	player = new Player(100, 100, 3);
	imageMode(CENTER);
}

var playerSize = 100;

function draw() {
	background(100);

	fill(255, 0, 0);
	image(img, player.playerX, player.playerY, playerSize, playerSize);

	if(mouseIsPressed){
		playerSize++;
		player.changePlayerX(1);
		song.play();
	}
}