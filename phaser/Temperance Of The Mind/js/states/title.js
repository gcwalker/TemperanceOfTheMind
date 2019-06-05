// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {


		var titleText = game.add.text(game.width/2, game.height/2 -100, 'Temperance Of The Mind', {font: 'Press Start 2P', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, 500, 'Press SPACEBAR!', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		// check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.sound.play('menusound');
			game.state.start('Dialogue0');
		}
	}
};