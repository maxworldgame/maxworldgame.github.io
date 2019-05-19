let img;
let song;
let player;
let marioRight;

function setup() {
	createCanvas(1250, 750);
	img = loadImage('player.png');
	player = new Player(100, 100, 3);
	song = loadSound('data/sound/fightSong.mp3');
	marioRight = new Animation("marioRight", 8, 300, 300, 3);
	imageMode(CENTER);
}

var playerSize = 100;
	
function draw() {
	background(100);

	if (keyIsPressed){
	song.play();
	}

	marioRight.display(player.getPlayerX(), player.getPlayerY());

	if(mouseIsPressed){
		player.changePlayerX(1);
		
	}
}