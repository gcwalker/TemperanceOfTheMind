// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {


		var titleText = game.add.text(game.width/2, game.height/2 -100, 'Temperance of the Mind ', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var instructText = game.add.text(game.width/2, game.height/2 - 48, 'Use the ARROW KEYS to move and SPACEBAR to jump!', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		instructText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press SPACEBAR to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		// check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Stage1');
		}
	}
};
