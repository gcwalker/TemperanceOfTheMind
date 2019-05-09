// Load state

// Assets 

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// preload assets
		game.load.image('meandog', 'assets/img/meandog.png');
		game.load.atlas('jax','assets/img/jax.png','assets/img/jax.json');
		game.load.image('ground01', 'assets/img/ground01.png');
		game.load.image('bound', 'assets/img/bones.png');
		game.load.image('platform01', 'assets/img/platform01.png');
	},
	create: function() {
		game.state.start('Title');
	},
};
