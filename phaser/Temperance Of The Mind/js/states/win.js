// Win Over state

var Win = function(game) {};
Win.prototype = {
	create: function() {
		var congrats = game.add.text(game.width/2, 350, 'You defeated your demons!',{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		congrats.anchor.set(0.5);
		var replayText = game.add.text(game.width/2, 400, 'Press SPACEBAR to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		replayText.anchor.set(0.5);
		var img = game.add.sprite(game.width/2,game.height/2,'winImg');
		img.anchor.setTo(0.5);
		img.scale.setTo(0.3);
		//music.stop();
		music = game.add.audio('win');
		music.play();
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Stage1');
		}
	}
}