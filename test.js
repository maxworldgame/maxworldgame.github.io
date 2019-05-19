let img;
let song;
let player;
let marioRight;

function preload(){
	song = loadSound('data/sound/fightSong.mp3');
}

function setup() {
	createCanvas(1250, 750);
	img = loadImage('player.png');
	player = new Player(100, 100, 3);
	marioRight = new Animation("marioRight", 8, 300, 300, 3);
	imageMode(CENTER);
	song.play();
}

var playerSize = 100;

function draw() {
	background(100);

	marioRight.display(player.getPlayerX(), player.getPlayerY());

	if(mouseIsPressed){
		player.changePlayerX(1);
		
	}
}