// Load state

// Assets 

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// preload assets
		game.load.spritesheet('boss1', 'assets/img/boss1.png',44,64);
		game.load.spritesheet('boss2', 'assets/img/boss2.png',44,64);
		game.load.spritesheet('couch', 'assets/img/couch.png',630,366);
		game.load.atlas('player','assets/img/playerspritesheet.png','assets/img/player.json');
		// Images
		game.load.image('ground01', 'assets/img/ground01.png');
		game.load.image('bound', 'assets/img/bones.png');
		game.load.image('lava', 'assets/img/lava.png');
		game.load.image('water', 'assets/img/water.png');
		game.load.image('sword', 'assets/img/sword.png');
		game.load.image('shield', 'assets/img/shield.png');
		game.load.image('heart', 'assets/img/heart.png');
		game.load.image('teardrop', 'assets/img/teardrop.png');
		game.load.image('fireball', 'assets/img/smallfireball.png');
		game.load.image('platform01', 'assets/img/platform01.png');
		game.load.image('titlebackground', 'assets/img/title.png');
		game.load.image('background01', 'assets/img/finalbackground1.png');
		game.load.image('background01color', 'assets/img/finalbackground1topcolor.png');
		game.load.image('background02', 'assets/img/finalbackground2.png');
		game.load.image('background02top', 'assets/img/finalbackground2top.png');
		game.load.image('bubble', 'assets/img/bubble.png');
		game.load.image('doorclosed', 'assets/img/door0.png');
		game.load.image('dooropen', 'assets/img/door1.png');
		game.load.image('dead', 'assets/img/dead.png');	
		game.load.image('winImg', 'assets/img/win.png');	
		// Sounds
		game.load.audio('menusound', 'assets/audio/menusound.mp3');
		game.load.audio('stage1', 'assets/audio/bgmmain.mp3');
		game.load.audio('sadnessbegin', 'assets/audio/sadnessbegin.mp3');
		game.load.audio('sadnessloop', 'assets/audio/sadnessloop.mp3');
		game.load.audio('win', 'assets/audio/win.mp3');
		game.load.audio('lose', 'assets/audio/lose.mp3');
		game.load.audio('slashmiss', 'assets/audio/slashmiss.mp3');
		game.load.audio('slashhit', 'assets/audio/slashhit.mp3');
		game.load.audio('fireball', 'assets/audio/fireball.mp3');
		game.load.audio('shield', 'assets/audio/shield.mp3');
	},
	create: function() {
		game.state.start('Title');
	},
};
