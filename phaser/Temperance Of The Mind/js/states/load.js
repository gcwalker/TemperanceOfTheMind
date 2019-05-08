// Load state

// Assets 

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// preload assets
		game.load.atlas('jax','assets/img/jax.png','assets/img/jax.json');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('meandog', 'assets/img/meandog.png');
	},
	create: function() {
		game.state.start('Title');
	},
};
