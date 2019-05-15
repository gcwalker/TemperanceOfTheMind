// Stage1 state

var Stage1 = function(game) {};
Stage1.prototype = {
	create: function() {
		// Initialize variables
		inputEnabled = true;
		playerHealth = 5;
		this.enemyHealth = 15;
		enemySpeed = -200;
		enemyImmune = false;
		swordEquipped = false;

		// Add stage background
		this.bg = game.add.tileSprite(0,0,2000,game.height,'background01');
		game.world.setBounds(0,0,2000,700);

		// Stage music
		music = game.add.audio('stage1');
		music.play();
		music.loopFull(0.3);

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
		player = game.add.sprite(70, game.world.centerY,'player');
		player.anchor.set(0.5);
		player.scale.setTo(1.5);
		//player.scale.x = (-0.2);
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
		//player.body.setSize(50,50,100,100);
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.gravity.y = 1000;
		this.enemy.body.bounce.y = 0.2;
		this.enemy.body.velocity.x = enemySpeed;
		//player.body.immovable = true;

		// add player animations
		player.animations.add('right',[1,2,3,4],6,true);
		player.animations.add('left',[5,6,7,8],6,true);
		player.animations.add('standingleft',[9],6,true);
		player.animations.add('standingright',[0],6,true);
		this.facingRight = true;

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

		var platform2 = platforms.create(1000, 200, 'platform01');
		platform2.body.immovable = true;
		platform2.scale.setTo(2, 2);

		var platform3 = platforms.create(700, 300, 'platform01');
		platform3.body.immovable = true;
		platform3.scale.setTo(2, 2);

		// TEMP health text at top left of camera
		healthText = game.add.text(16,16,'Health: 5',{fontSize: '32px', fill:'#facade'});
		healthText.fixedToCamera = true;
		game.camera.follow(player,1);

		// Adds sword to game world
		this.sworditem = game.add.sprite(800,250,'sword');
		this.sworditem.scale.setTo(0.45);
		game.physics.enable(this.sworditem, Phaser.Physics.ARCADE);

	},
	update: function() {
		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		var enemyHitPlatform = game.physics.arcade.collide(this.enemy, platforms);
		if(game.physics.arcade.collide(bounds, this.enemy)){
			this.flipEnemy(this.enemy);
		}

		// Player pickup sword
		if(game.physics.arcade.overlap(player, this.sworditem)){
			swordEquipped = true;
			this.sworditem.x = 1020;
			this.sworditem.y = 20;
			this.sworditem.fixedToCamera = true;
		}

		// Knockback player if they touch the boss
		if(game.physics.arcade.overlap(player, this.enemy) && enemyImmune == false){
			--playerHealth;
			if(playerHealth == 0){
				game.state.start('GameOver');
			}
			healthText.text = 'Health: ' + playerHealth;
			inputEnabled = false;
			enemyImmune = true;
			player.body.velocity.y = -400;
			player.body.velocity.x = (-1 * player.body.velocity.x);
			this.flipEnemy(this.enemy); 
			this.timer = game.time.create(1000,true);
			this.timer.add(250, this.disableInput, this);
			this.timer.add(2000, this.enemyImmunity, this);
			this.timer.start();
		} // check for player input
		else if(inputEnabled == true && cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			player.body.velocity.x = -250;
			player.animations.play('left');
			this.facingRight = false;
			//player.animations.play('left');
		}
		else if(inputEnabled == true && cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			player.body.velocity.x = 250;
			player.animations.play('right');
			this.facingRight = true;
		}
		else{ // Stops animation if player is not moving
			player.animations.stop(); 
			player.body.velocity.x = 0;
			if(this.facingRight == true)
				player.frame = 0;
			if(this.facingRight == false)
				player.frame = 9;
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform){ // Makes player jump if they are on the ground and press up key
			player.body.velocity.y = -750;
		}
	},
	render: function() {
		game.debug.spriteBounds(player);
		//game.debug.spriteCorners(player, true,true);
	},
	flipEnemy: function(enemy) {
		enemySpeed = enemySpeed * -1;
		enemy.body.velocity.x = enemySpeed;
	},
	disableInput: function() {
		inputEnabled = true;
	},
	enemyImmunity: function() {
		enemyImmune = false;
	}
};
