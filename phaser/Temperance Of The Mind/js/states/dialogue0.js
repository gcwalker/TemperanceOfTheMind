// Dialogue0 state

var Dialogue0 = function(game) {};
Dialogue0.prototype = {
	create: function() {
		var Text1 = game.add.text(game.width/2, 140, 'This story that is about to unfold takes place in the premise of your mind. \nTroubled by external factors such as losing your job, girlfriend, getting kicked \nout of your parents house, you’re at your whits end. All seems lost you think. \n“What’s the point of all this?” You wonder as you lay on your friends couch and \nquietly fall asleep. However the slumber is only the beginning, for you have \nmore battles ahead of you, as to regain your peace of mind \nyou must battle your innermost demons…', {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'});
		Text1.anchor.set(0.5);
		Text1.align = 'center';

		var Text2 = game.add.text(game.width/2, 250, 'The choice is yours, will you let your grievances get the best of you or will you \ntame them and establish control over your thoughts once and for all? \nThe answer lies in the battle ahead…', {font: 'Press Start 2P', fontSize: '12px', fill: '#fff'});
		Text2.anchor.set(0.5);
		Text2.align = 'center';

		var Text3 = game.add.text(game.width/2, 430, 'Use the arrow keys to move left, right \nand to jump. \n\nYour inventory appears in the upper right \ncorner of the screen. \n\nMay the odds be in your favor!', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		Text3.anchor.set(0.5);
		Text3.align = 'center';

		var playText = game.add.text(game.width/2, 610, 'Press SPACEBAR to Start', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		// check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.sound.play('menusound');
			game.state.start('Stage1');
		}
	}
};