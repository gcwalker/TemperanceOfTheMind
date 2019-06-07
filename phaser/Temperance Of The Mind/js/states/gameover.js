// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		this.image = game.add.sprite(game.width/2, 300,'dead');
		this.image.anchor.setTo(0.5);
		var replayText = game.add.text(game.width/2, 615, ' Press SPACEBAR to restart level\nOR\nSHIFT to restart game', {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'});
		replayText.anchor.set(0.5);
		replayText.align = 'center';
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			if(currentStage == 1)
				game.state.start('Stage1');
			if(currentStage == 2){
				playerHealth = respawnHP;
				game.state.start('Stage2');
			}
			if(currentStage == 3){
				playerHealth = respawnHP;
				game.state.start('Stage3');
			}
			if(currentStage == 4){
				playerHealth = respawnHP;
				game.state.start('Stage4');
			}
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){
			game.state.start('Title');
		}
	}
}