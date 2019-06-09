// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		// Game over image
		this.image = game.add.sprite(game.width/2, 300,'dead');
		this.image.anchor.setTo(0.5);
		// Text to replay game
		var replayText = game.add.text(game.width/2, 615, ' Press SPACEBAR to restart level\nOR\nSHIFT to restart game', {font: 'Press Start 2P', fontSize: '16px', fill: '#fff'});
		replayText.anchor.set(0.5);
		replayText.align = 'center';
		// Game over music
		music.stop();
		music = game.add.audio('lose');
		music.play();
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) { // Sends player back to the stage they were previously on
			music.stop();
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
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){ // Send player back to title screen
			game.state.start('Title');
		}
	}
}