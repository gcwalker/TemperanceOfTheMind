// NAMES
// Temperance of the Mind

// be STRICT
"use strict";

// Define globals

var game;
var player;
var platforms;
 
window.onload = function() {

	// initialize game
	game = new Phaser.Game(1100,700,Phaser.AUTO);

	// define states
	game.state.add('Load',Load);
	game.state.add('Title',Title);
	game.state.add('Play',Play);
	game.state.add('GameOver',GameOver);
	game.state.start('Load');

}

var Load = function(game) {}
	preload: function(){ //preload assets 
		game.load.image('grassyground', 'assets/img/grassyground.png');
		game.load.image('shydude', 'assets/img.shydude.png');
		
		console.log("Load: preload");
		
	}
		
	
