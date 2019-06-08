// Dialogue0 state

var Dialogue0 = function(game) {};
Dialogue0.prototype = {
	create: function() {
		var Text1 = game.add.text(game.width/2, 200, 'This story that is about to unfold takes place in\nthe premise of your mind. Troubled by external\nfactors such as losing your job, girlfriend, getting\nkicked out of your parents house, you’re at your\nwits end. All seems lost you think, “What’s the\npoint of all this?” You wonder as you lay on your\nfriends couch and quietly fall asleep. However the\nslumber is only the beginning, for you have more\nbattles ahead of you, as to regain your peace of\nmind you must battle your innermost demons…', {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'});
		Text1.anchor.set(0.5);
		Text1.align = 'center';

		this.couch = game.add.sprite(game.width/2,515,'couch');
		this.couch.anchor.setTo(0.5);
		this.couch.animations.add('sleeping',[0,1,2,3,4],2,true);


		var playText = game.add.text(game.width/2, 610, 'Press SPACEBAR to Start', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		this.couch.animations.play('sleeping');
		// check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			music.stop();
			game.sound.play('menusound');
			game.state.start('Stage1');
		}
	}
};