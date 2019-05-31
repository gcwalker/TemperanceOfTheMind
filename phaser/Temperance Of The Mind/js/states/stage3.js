// Stage3 state

var Stage3 = function(game) {};
Stage3.prototype = {
	create: function() {
		// Initialize variables
		inputEnabled = true;
		platformSpeed = 170;
		playerImmune = false;
		slashing = false;
		swordEquipped = true;
		// Add stage background
		this.bg = game.add.tileSprite(0,0,5000,800,'background02');
		game.world.setBounds(0,0,5000,800);

		// Stage music
		//music = game.add.audio('stage1');
		//music.play();
		//music.loopFull(0.3);

		// Stage Sound Effects
		slashmiss = game.add.audio('slashmiss');
		slashhit = game.add.audio('slashhit');
		fireball = game.add.audio('fireball');

		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Bounds to make platforms move left and right
		bounds = game.add.group();
		bounds.enableBody = true;

		//Platform 1
		var left = bounds.create(550,700,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(1500,700,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		//Platform 2
		var left = bounds.create(1150,400,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(2000,400,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);		
		//Platform 3
		var left = bounds.create(2000,500,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(2550,500,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		//Platform 4
		var top = bounds.create(3350,200,'bound');
		top.anchor.set(0.5);
		top.scale.setTo(0.2,0.2);
		var bottom = bounds.create(3350,750,'bound');
		bottom.anchor.set(0.5);
		bottom.scale.setTo(0.2,0.2);
		//Platform 5
		var top = bounds.create(3650,200,'bound');
		top.anchor.set(0.5);
		top.scale.setTo(0.2,0.2);
		var bottom = bounds.create(3650,750,'bound');
		bottom.anchor.set(0.5);
		bottom.scale.setTo(0.2,0.2);
		//Platform 6
		var left = bounds.create(3900,600,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(4650,600,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		bounds.setAll('body.immovable', true);
		bounds.setAll('alpha', 0);

		this.lava = game.add.tileSprite(0,780,5000,1400,'water');

		// initialize player sprite
		player = game.add.sprite(100, 665 ,'player', 'playerrun00');
		player.anchor.set(0.5);
		player.scale.setTo(1.5);
		//player.scale.x = (-0.2);
		player.destroyed = false;

		this.slashHitbox = game.add.sprite(0,0,'sword');
		this.slashHitbox.anchor.setTo(0,0.5);
		this.slashHitbox.scale.setTo(1.2, 0.5);
		this.slashHitbox.alpha = 0;
		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.enable(this.slashHitbox, Phaser.Physics.ARCADE);
		game.physics.enable(this.lava, Phaser.Physics.ARCADE);

		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;
		player.body.bounce.y = 0.2;

		// add player animations
		player.animations.add('right',[1,2,3,4],6,true);
		player.animations.add('left',[5,6,7,8],6,true);
		player.animations.add('slashright',[10,11,12],6,false);
		player.animations.add('slashleft',[13,14,15],6,false);
		player.animations.add('standingleft',[9],6,true);
		player.animations.add('standingright',[0],6,true);
		player.animations.add('shieldright',[16],6,true);
		player.animations.add('shieldleft',[17],6,true);

		this.facingRight = true;

		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group
		
		var ground = platforms.create(0,736, 'ground01');
		ground.scale.setTo(0.5, 0.8);
		var ground = platforms.create(4700,736, 'ground01');
		ground.scale.setTo(0.5, 0.8);  
		//var groundR = platforms.create(3300,1336, 'ground01');
		//groundR.scale.setTo(0.9, 1); 
		//var ground0 = platforms.create(0,1336, 'ground01');
		//ground0.scale.setTo(3.8, 1); // Resize scale to fit the width of the game
		
		//Moving platforms
		var platformMoving = platforms.create(900, 650, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		var platformMoving = platforms.create(1300, 400, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		var platformMoving = platforms.create(2200, 500, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		var platform = platforms.create(2650, 600, 'platform01');
		platform.scale.setTo(5, 2);
		var platformMoving = platforms.create(3250, 500, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.y = -170;
		var platformMoving = platforms.create(3650, 500, 'platform01');
		platformMoving.scale.setTo(1.5, 1.6);
		platformMoving.body.velocity.y = -140;
		var platformMoving = platforms.create(4150, 600, 'platform01');
		platformMoving.scale.setTo(1.2, 1.5);
		platformMoving.body.velocity.x = -170;

		platforms.setAll('body.immovable', true);

		// TEMP health text at top left of camera
		healthText = game.add.text(16,16,'Health: '+playerHealth,{fontSize: '32px', fill:'#facade'});
		healthText.fixedToCamera = true;
		game.camera.follow(player,1);

		// Adds sword to game world
		this.sworditem = game.add.sprite(60,1045,'sword');
		this.sworditem.scale.setTo(0.5);

		this.shielditem = game.add.sprite(2835,540,'shield');
		this.shielditem.scale.setTo(0.5);
		game.physics.enable(this.shielditem, Phaser.Physics.ARCADE);

		swordText = game.add.text(-10,16,'[SPACE]',{fontSize: '10px', fill:'#facade'});
		shieldText = game.add.text(-10,16,'[SHIFT]',{fontSize: '10px', fill:'#facade'});

		shieldBubble = game.add.sprite(-100,-100,'bubble');
		shieldBubble.scale.set(1.7);
		shieldBubble.alpha = 0.5;
		shieldBubble.anchor.set(0.5);

		// Add fireballs
		this.fireballs = game.add.emitter(2700,800,500);
		this.fireballs.makeParticles('teardrop',0,500,true,false);
		this.fireballs.setYSpeed(-800,-500);
		this.fireballs.setXSpeed(-150,150);
		this.fireballs.setRotation(500,600);
		this.fireballs.gravity = 500;
		this.fireballs.area = new Phaser.Rectangle(100, 100,3000,1);
		this.fireballs.start(false,8000,400,300);

		this.heart = game.add.sprite(4900,700,'heart');
		this.heart.anchor.set(0.5);
		this.heart.scale.set(0.5);
		game.physics.enable(this.heart, Phaser.Physics.ARCADE);


	},
	update: function() {

		this.lava.tilePosition.x -= 2;
		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(bounds, platforms,this.flipPlatform,null,this);
		if(game.physics.arcade.collide(this.heart,player)){
			//music.stop();
			game.state.start('Win');
		}
		if(game.physics.arcade.collide(this.lava,player)){
			fireball.play();
			//music.stop();
			game.state.start('GameOver');
		}
		// Player pickup shield
		if(game.physics.arcade.overlap(player, this.shielditem)){
			shieldEquipped = true;
			this.shielditem.x = 950;
			this.shielditem.y = 20;
			this.shielditem.fixedToCamera = true;
			shieldText.x = 959;
			shieldText.y = 79;
			shieldText.fixedToCamera = true;
		}
		if(swordEquipped == true){
			this.sworditem.x = 1020;
			this.sworditem.y = 20;
			this.sworditem.fixedToCamera = true;
			swordText.x = 1029;
			swordText.y = 79;
			swordText.fixedToCamera = true;
		}

		if(game.physics.arcade.overlap(player, this.fireballs) && playerImmune == false){
			fireball.play();
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
		// check for player input
		if(inputEnabled == true && cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			player.body.velocity.x = -275;
			player.animations.play('left');
			this.facingRight = false;
			//player.animations.play('left');
		}
		else if(inputEnabled == true && cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			player.body.velocity.x = 275;
			player.animations.play('right');
			this.facingRight = true;
		}
		else if(player.animations.name == 'slashright' | player.animations.name == 'slashleft' | player.animations.name == 'shieldleft' | player.animations.name == 'shieldright'){
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
		if(cursors.up.isDown && player.body.touching.down && hitPlatform && inputEnabled == true){ // Makes player jump if they are on the ground and press up key
			player.body.velocity.y = -750;
		}
		if(hitPlatform && inputEnabled == true && swordEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			slashing = true;
			inputEnabled = false;
			//enemyImmune = true;
			this.timer = game.time.create(1000,true);
			this.timer.add(300, this.disableSlash, this);
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
		if(hitPlatform && inputEnabled == true && shieldEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){
			slashing = true;
			inputEnabled = false;
			playerImmune = true;
			this.timer = game.time.create(1000,true);
			this.timer.add(1500, this.disableSlash, this);
			this.timer.add(1500, this.disableInput, this);
			this.timer.add(2000, this.playerImmunity, this);
			this.timer.add(1500,this.moveHitbox,this);
			this.timer.start();
			if(this.facingRight == true){
				player.animations.play('shieldright');
				shieldBubble.x = player.x;
				shieldBubble.y = player.y;
			}
			if(this.facingRight == false){
				player.animations.play('shieldleft');
				shieldBubble.y = player.y;
				shieldBubble.x = player.x;
			}
		}
	},
	render: function() {
		//game.debug.spriteBounds(player);
		//game.debug.spriteCorners(player, true,true);
	},
	flipPlatform: function(bounds, platformMoving) {
		platformMoving.body.velocity.x = platformMoving.body.velocity.x * -1; 
		platformMoving.body.velocity.y = platformMoving.body.velocity.y * -1; 
	},
	// flipPlatform: function(platforms) {
	// 	enemySpeed = enemySpeed * -1; 
	// 	platforms.body.velocity.x = enemySpeed;
	// },
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
		shieldBubble.x = -100;
		shieldBubble.y = -100;
	}
};
