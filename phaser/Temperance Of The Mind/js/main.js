// 120 Fight Club
// Elijah Shaw, Erin Asilo, Gasing Kuang, Grace Walker
// Temperance Of The Mind
// https://github.com/gcwalker/TemperanceOfTheMind.git

// be STRICT
"use strict";

// Define globals

var game;
var player;
var platforms;
var playerHealth;
var healthText;
var enemy;
var enemyHealth;
var enemySpeed; 
var enemyImmune;
var inputEnabled;
var swordEquipped;
var shieldEquipped;
var playerImmune;
var platformSpeed;
var slashing;
var shieldBubble;
window.onload = function() {

	// initialize game
	game = new Phaser.Game(1100,700,Phaser.AUTO);

	// define states
	game.state.add('Load',Load);
	game.state.add('Title',Title);
	game.state.add('Stage1',Stage1);
	game.state.add('Stage2',Stage2);
	game.state.add('Stage3',Stage3);
	game.state.add('GameOver',GameOver);
	game.state.add('Win',Win);
	game.state.start('Load');

}
