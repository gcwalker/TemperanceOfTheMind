// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
		
	},
	
	create: function() {
		var replayText = game.add.text(game.width/2, 400, 'Sorry you died buddy,  Press SPACEBAR to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		replayText.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
}
