// Load state

// Assets 

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// preload assets
		game.load.spritesheet('boss1', 'assets/img/boss1.png',44,64);
		game.load.spritesheet('player','assets/img/player.png',44,64);
		game.load.spritesheet('playerSlash','assets/img/playerslash.png',44,64);
		game.load.image('ground01', 'assets/img/ground01.png');
		game.load.image('bound', 'assets/img/bones.png');
		game.load.image('sword', 'assets/img/sword.png');
		game.load.image('shield', 'assets/img/shield.png');
		game.load.image('heart', 'assets/img/heart.png');
		game.load.image('teardrop', 'assets/img/teardrop.png');
		game.load.image('fireball', 'assets/img/smallfireball.png');
		game.load.image('platform01', 'assets/img/platform01.png');
		game.load.image('background01', 'assets/img/background01.png');
		game.load.audio('menusound', 'assets/audio/menusound.mp3');
		game.load.audio('stage1', 'assets/audio/bgmmain.mp3');
		game.load.audio('slashmiss', 'assets/audio/slashmiss.mp3');
		game.load.audio('slashhit', 'assets/audio/slashhit.mp3');
		game.load.audio('fireball', 'assets/audio/fireball.mp3');
	},
	create: function() {
		game.state.start('Title');
	},
};
