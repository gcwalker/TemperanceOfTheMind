// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// initialize assets/sprites

		// initialize player sprite
		player = game.add.sprite(70, game.world.centerY,'jax','f01');
		player.anchor.set(0.5);
		player.scale.setTo(0.2);
		player.scale.x = (-0.2);
		player.destroyed = false;

		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		//player.body.maxVelocity.set(500);
		//player.body.drag.set(200);
		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;
		player.body.bounce.y = 0.2;
		//player.body.immovable = true;

		// add player animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('f', 1, 25, '', 2), 30, true);
		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group

		var ground = platforms.create(0,game.world.height - 64, 'ground');
		ground.scale.setTo(3, 2); // Resize scale to fit the width of the game
		ground.body.immovable = true; // Makes the ground not fall when you jump on it
	},
	update: function() {
		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);

		// plays walk animation
		player.animations.play('walk');

		player.body.velocity.x = 0;
		// check for player input
		if(cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			player.body.velocity.x = -150;
			//player.animations.play('left');
		}
		else if(cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			player.body.velocity.x = 150;
			//player.animations.play('right');
		}
		else{ // Stops animation if player is not moving
			player.animations.stop(); 
			//player.frame = 4;
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform){ // Makes player jump if they are on the ground and press up key
			player.body.velocity.y = -750;
		}
	}
};
