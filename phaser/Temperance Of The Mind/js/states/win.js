// Win Over state

var Win = function(game) {};
Win.prototype = {
	create: function() {
		var img = game.add.sprite(game.width/2,game.height/2,'winImg');
		img.anchor.setTo(0.5);

		var congrats = game.add.text(game.width/2, 450, 'You’ve quelled the despondent demons that have\nbeen plaguing your mind and you are now free\nof your destructive thoughts! ',{font: 'Press Start 2P', fontSize: '20px', fill: '#fff'});
		congrats.anchor.set(0.5);
		congrats.align = 'center';
		var replayText = game.add.text(game.width/2, 650, 'Press SPACEBAR to Restart', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		replayText.anchor.set(0.5);

		music.stop();
		music = game.add.audio('win');
		music.play();
		music.loopFull();
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			music.stop();
			game.state.start('Title');
		}
	}
}