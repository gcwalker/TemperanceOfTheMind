// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {
		// Title background
		var bg = game.add.sprite(0,0,'titlebackground');

		// Title text
		var titleText = game.add.text(game.width/2, game.height/2 -100, 'Temperance Of The Mind', {font: 'Press Start 2P', fontSize: '48px', fill: '#696969'});
		titleText.anchor.set(0.5);

		// Press spacebar text
		var playText = game.add.text(game.width/2, 500, 'Press SPACEBAR to continue', {font: 'Press Start 2P', fontSize: '24px', fill: '#000'});
		playText.anchor.set(0.5);

		// Title music
		music = game.add.audio('title');
		music.play();
		music.loopFull();
	},
	update: function() {
		// check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.sound.play('menusound');
			game.state.start('Dialogue0');
		}
	}
};