// Stage1 state

var Stage1 = function(game) {};
Stage1.prototype = {
	create: function() {
		// Initialize variables
		playerHealth = 5;
		this.enemyHealth = 15;
		enemySpeed = -200;
		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		bounds = game.add.group();
		bounds.enableBody = true;
		var left = bounds.create(200,600,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		//left.angle = 90;
		left.alpha = 1;
		left.body.immovable = true;
		var right = bounds.create(1050,600,'bound');
		right.anchor.set(0.5);
		//right.angle = 90;
		right.scale.setTo(0.2,0.2);
		right.alpha = 1;
		right.body.immovable = true;

		// initialize player sprite
		player = game.add.sprite(70, game.world.centerY,'jax','f01');
		player.anchor.set(0.5);
		player.scale.setTo(0.2);
		player.scale.x = (-0.2);
		player.destroyed = false;

		this.enemy = game.add.sprite(900, 550,'meandog');
		this.enemy.anchor.set(0.5);
		this.enemy.scale.setTo(0.2);
		this.enemy.scale.x = (-0.2);

		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		//player.body.maxVelocity.set(500);
		//player.body.drag.set(200);
		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;
		player.body.bounce.y = 0.2;
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.gravity.y = 1000;
		this.enemy.body.bounce.y = 0.2;
		this.enemy.body.velocity.x = enemySpeed;
		//player.body.immovable = true;

		// add player animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('f', 1, 25, '', 2), 30, true);
		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group

		var ground = platforms.create(0,game.world.height - 64, 'ground01');
		ground.scale.setTo(3, 2); // Resize scale to fit the width of the game
		ground.body.immovable = true; // Makes the ground not fall when you jump on it
		
		var platform1 = platforms.create(300, 400, 'platform01');
		platform1.body.immovable = true;
		platform1.scale.setTo(2, 2);

		healthText = game.add.text(16,16,'Health: 5',{fontSize: '32px', fill:'#facade'});
	},
	update: function() {
		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		var enemyHitPlatform = game.physics.arcade.collide(this.enemy, platforms);
		if(game.physics.arcade.collide(bounds, this.enemy)){
			this.flipEnemy(this.enemy);
		}

		// plays walk animation
		player.animations.play('walk');

		player.body.velocity.x = 0;
		// check for player input
		if(cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			player.body.velocity.x = -250;
			//player.animations.play('left');
		}
		else if(cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			player.body.velocity.x = 250;
			//player.animations.play('right');
		}
		else{ // Stops animation if player is not moving
			player.animations.stop(); 
			//player.frame = 4;
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform){ // Makes player jump if they are on the ground and press up key
			player.body.velocity.y = -750;
		}
	},
	flipEnemy: function(enemy) {
		enemySpeed = enemySpeed * -1;
		enemy.body.velocity.x = enemySpeed;
	}
};
