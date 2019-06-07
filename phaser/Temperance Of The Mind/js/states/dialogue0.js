// Dialogue0 state

var Dialogue0 = function(game) {};
Dialogue0.prototype = {
	create: function() {
		var Text1 = game.add.text(game.width/2, 200, 'This story that is about to unfold takes place in\nthe premise of your mind. Troubled by external\nfactors such as losing your job, girlfriend, getting\nkicked out of your parents house, you’re at your\nwits end. All seems lost you think, “What’s the\npoint of all this?” You wonder as you lay on your\nfriends couch and quietly fall asleep. However the\nslumber is only the beginning, for you have more\nbattles ahead of you, as to regain your peace of\nmind you must battle your innermost demons…', {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'});
		Text1.anchor.set(0.5);
		Text1.align = 'center';

		var Text2 = game.add.text(game.width/2, 450, 'The choice is yours, will you let your grievances\nget the best of you or will you tame them and\nestablish control over your thoughts once and for\nall? The answer lies in the battle ahead…', {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'});
		Text2.anchor.set(0.5);
		Text2.align = 'center';

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