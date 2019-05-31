// Win Over state

var Win = function(game) {};
Win.prototype = {
	create: function() {
		var congrats = game.add.text(game.width/2, 350, 'You defeated your demons!',{font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		congrats.anchor.set(0.5);
		var replayText = game.add.text(game.width/2, 400, 'Press SPACEBAR to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		replayText.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Stage1');
		}
	}
}
