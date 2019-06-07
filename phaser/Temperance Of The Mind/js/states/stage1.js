// Stage1 state

var Stage1 = function(game) {};
Stage1.prototype = {
	create: function() {
		// Initialize variables
		currentStage = 1;
		inputEnabled = true;
		playerHealth = 10;
		this.enemyHealth = 3;
		enemySpeed = -250;
		enemyImmune = false;
		playerImmune = false;
		swordEquipped = false;
		shieldEquipped = false;

		// Add stage background
		this.bg = game.add.tileSprite(0,700,4000,700,'background01');
		this.bgtop = game.add.tileSprite(0,0,4000,700,'background01color');
		game.world.setBounds(0,0,4000,1400);


		// Stage music
		music = game.add.audio('stage1');
		music.play();
		music.loopFull(0.3);

		// Stage Sound Effects
		slashmiss = game.add.audio('slashmiss');
		slashhit = game.add.audio('slashhit');
		fireball = game.add.audio('fireball');

		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Bounds to make boss move left and right
		bounds = game.add.group();
		bounds.enableBody = true;

		var left = bounds.create(700,600,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		left.alpha = 0;
		left.body.immovable = true;

		var right = bounds.create(2800,600,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		right.alpha = 0;
		right.body.immovable = true;

		this.lava = game.add.tileSprite(0,1380,4000,1400,'lava');

		// initialize player sprite
		player = game.add.sprite(100, 565 ,'player', 'playerrun00');
		player.anchor.set(0.5);
		player.scale.setTo(1.5);
		player.destroyed = false;

		this.enemy = game.add.sprite(1000, 565,'boss1');
		this.enemy.anchor.set(0.5);
		this.enemy.scale.setTo(1.7);

		this.slashHitbox = game.add.sprite(0,0,'sword');
		this.slashHitbox.anchor.setTo(0,0.5);
		this.slashHitbox.scale.setTo(1.2, 0.5);
		this.slashHitbox.alpha = 0;
		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		game.physics.enable(this.slashHitbox, Phaser.Physics.ARCADE);
		game.physics.enable(this.lava, Phaser.Physics.ARCADE);

		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;

		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.gravity.y = 1000;
		this.enemy.body.bounce.y = 0.2;
		this.enemy.body.velocity.x = enemySpeed;

		// add player animations
		player.animations.add('right',[1,2,3,4],6,true);
		player.animations.add('left',[5,6,7,8],6,true);
		player.animations.add('slashright',[10,11,12],6,false);
		player.animations.add('slashleft',[13,14,15],6,false);
		player.animations.add('standingleft',[9],6,true);
		player.animations.add('standingright',[0],6,true);

		this.enemy.animations.add('right',[1,2,3,4],6,true);
		this.enemy.animations.add('left',[5,6,7,8],6,true);
		//player.animations.add('slashRight')
		this.facingRight = true;

		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group
		
		var ground = platforms.create(0,636, 'ground01');
		ground.scale.setTo(3, 0.8); 
		var groundR = platforms.create(3300,1336, 'ground01');
		groundR.scale.setTo(0.9, 1); 
		
		// Top floor platforms
		var platform2t = platforms.create(1100, 300, 'platform01');
		platform2t.scale.setTo(2, 2);
		var platform3t = platforms.create(700, 400, 'platform01');
		platform3t.scale.setTo(2, 2);
		var platform4t = platforms.create(1500, 400, 'platform01');
		platform4t.scale.setTo(2, 2);
		var platform5t = platforms.create(1900, 300, 'platform01');
		platform5t.scale.setTo(2, 2);
		var platform6t = platforms.create(2300, 400, 'platform01');
		platform6t.scale.setTo(2, 2);
		var platform7t = platforms.create(2700, 300, 'platform01');
		platform7t.scale.setTo(2, 2);
		var platform8t = platforms.create(3000, 400, 'platform01');
		platform8t.scale.setTo(2, 2);
		//Stair platforms
		var platform1s = platforms.create(3550, 850, 'platform01');
		platform1s.scale.setTo(2, 2);
		var platform2s = platforms.create(3850, 1100, 'platform01');
		platform2s.scale.setTo(2, 2);
		// Bottom floor platforms
		var platform1b = platforms.create(3000, 1100, 'platform01');
		platform1b.scale.setTo(2, 2);
		var platform2b = platforms.create(2500, 1200, 'platform01');
		platform2b.scale.setTo(2, 2);
		var platform3b = platforms.create(2000, 1100, 'platform01');
		platform3b.scale.setTo(2, 2);
		var platform4b = platforms.create(1450, 1300, 'platform01');
		platform4b.scale.setTo(2, 2);
		var platform5b = platforms.create(1450, 900, 'platform01');
		platform5b.scale.setTo(2, 2);
		var platform6b = platforms.create(1000, 1100, 'platform01');
		platform6b.scale.setTo(2, 2);
		var platform7b = platforms.create(1925, 1350, 'platform01');
		platform7b.scale.setTo(2, 2);
		var platform8b = platforms.create(500, 1300, 'platform01');
		platform8b.scale.setTo(2, 2);
		var platform9b = platforms.create(0, 1100, 'platform01');
		platform9b.scale.setTo(2, 2);

		platforms.setAll('body.immovable', true);

		// TEMP health text at top left of camera
		healthText = game.add.text(16,16,'Health: 10',{fontSize: '32px', fill:'#facade'});
		healthText.fixedToCamera = true;
		game.camera.follow(player,1);

		// Adds sword to game world
		this.sworditem = game.add.sprite(60,1045,'sword');
		this.sworditem.scale.setTo(0.5);
		game.physics.enable(this.sworditem, Phaser.Physics.ARCADE);

		swordText = game.add.text(-10,16,'[SPACE]',{fontSize: '10px', fill:'#facade'});
		
		this.heart = game.add.sprite(-100,0,'heart');
		this.heart.anchor.set(0.5);
		this.heart.scale.set(0.5);
		game.physics.enable(this.heart, Phaser.Physics.ARCADE);

		// Add boss fireballs
		this.fireballs = game.add.emitter(0,0,500);
		this.fireballs.makeParticles('fireball',0,500,true,false);
		this.fireballs.setYSpeed(-700,-400);
		this.fireballs.setXSpeed(-150,150);
		this.fireballs.setRotation(500,600);
		this.fireballs.gravity = 500;
		this.fireballs.area = new Phaser.Rectangle(this.enemy.x, this.enemy.y,50,10);
		this.fireballs.start(false,10000,800,300);

		this.Instructions = game.add.text(560, 460, 'Use the arrow keys to move left, right \nand to jump. \n\nYour inventory appears in the upper right \ncorner of the screen. \n\nMay the odds be in your favor!', {font: 'Press Start 2P', fontSize: '24px', fill: '#fff'});
		this.Instructions.anchor.set(0.5);
		this.Instructions.align = 'center';

	},
	update: function() {

		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		var enemyHitPlatform = game.physics.arcade.collide(this.enemy, platforms);
		if(game.physics.arcade.collide(bounds, this.enemy)){
			this.flipEnemy(this.enemy);
		}
		if(enemySpeed > 0){
			this.enemy.animations.play('right');
		}
		else{
			this.enemy.animations.play('left');
		}
		if(game.physics.arcade.collide(this.heart,player)){
			playerHealth++;
			//music.stop();
			game.state.start('Stage2');
		}
		if(game.physics.arcade.collide(this.lava,player)){
			fireball.play();
			music.stop();
			game.state.start('GameOver');
		}
		this.fireballs.x = this.enemy.x;
		this.fireballs.y = this.enemy.y;

		// Player pickup sword
		if(game.physics.arcade.overlap(player, this.sworditem)){
			swordEquipped = true;
			this.sworditem.x = 1020;
			this.sworditem.y = 20;
			this.sworditem.fixedToCamera = true;
			swordText.x = 1029;
			swordText.y = 79;
			swordText.fixedToCamera = true;
		}

		if(game.physics.arcade.overlap(player, this.fireballs) && playerImmune == false){
			fireball.play();
			this.fireballs.getClosestTo(player).kill();
			--playerHealth;
			if(playerHealth == 0){
				music.stop();
				game.state.start('GameOver');
			}

			healthText.text = 'Health: ' + playerHealth;
			playerImmune = true;
			inputEnabled = false;
			player.body.velocity.y = -400;
			player.body.velocity.x = (-1 * player.body.velocity.x);
			this.timer = game.time.create(1000,true);
			this.timer.add(150, this.disableInput, this);
			this.timer.add(1250, this.playerImmunity, this);
			this.timer.start();	
		}

		// Knockback player if they touch the boss
		if(game.physics.arcade.overlap(player, this.enemy) && enemyImmune == false){
			--playerHealth;
			if(playerHealth == 0){
				music.stop();
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
			this.Instructions.destroy();
			player.body.velocity.x = -295;
			player.animations.play('left');
			this.facingRight = false;
			//player.animations.play('left');
		}
		else if(inputEnabled == true && cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			this.Instructions.destroy();
			player.body.velocity.x = 295;
			player.animations.play('right');
			this.facingRight = true;
		}
		else if(player.animations.name == 'slashright' | player.animations.name == 'slashleft'){
			player.body.velocity.x = 0;
		}
		else{ // Stops animation if player is not moving
			//player.animations.stop();
			player.body.velocity.x = 0;
			if(this.facingRight == true){
				player.animations.play('standingright');
				//player.animations.stop();
			}
			if(this.facingRight == false){
				player.animations.play('standingleft');
				//player.animations.stop();
			}
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform){ // Makes player jump if they are on the ground and press up key
			this.Instructions.destroy();
			player.body.velocity.y = -750;
		}
		if(hitPlatform && inputEnabled == true && swordEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			inputEnabled = false;
			this.timer = game.time.create(1000,true);
			this.timer.add(500, this.disableInput, this);
			this.timer.add(2000, this.enemyImmunity, this);
			this.timer.add(300,this.moveHitbox,this);
			this.timer.start();
			slashmiss.play();
			if(this.facingRight == true){
				player.animations.play('slashright');
				this.slashHitbox.x = player.x -50;
				this.slashHitbox.y = player.y;
			}
			if(this.facingRight == false){
				player.animations.play('slashleft');
				this.slashHitbox.x = player.x - 85;
				this.slashHitbox.y = player.y;
			}
		}
		if(game.physics.arcade.overlap(this.slashHitbox,this.enemy) && enemyImmune == false){
			--this.enemyHealth;
			this.enemy.body.velocity.y = -200;
			enemyImmune = true;
			this.timer = game.time.create(1000,true);
			this.timer.add(2000, this.enemyImmunity, this);
			this.timer.start();
			slashhit.play();
			this.flipEnemy(this.enemy);
			console.log("Enemy hit!");
			if(this.enemyHealth == 0){
				this.heart.x = this.enemy.x;
				this.heart.y = this.enemy.y + 25;
				this.enemy.kill();
				this.fireballs.setXSpeed(-125,125);
				this.fireballs.frequency = 0;
			}
		}
		
	},
	render: function() {
		//game.debug.spriteBounds(player);
		//game.debug.spriteCorners(player, true,true);
	},
	flipEnemy: function(enemy) {
		enemySpeed = enemySpeed * -1;
		enemy.body.velocity.x = enemySpeed;
	},
	disableInput: function() {
		inputEnabled = true;
	},
	disableSlash: function() {
		inputEnabled = false;
	},
	enemyImmunity: function() {
		enemyImmune = false;
	},
	playerImmunity: function() {
		playerImmune = false;
	},
	moveHitbox: function() {
		this.slashHitbox.x = 0;
		this.slashHitbox.y = 0;
	}
};
