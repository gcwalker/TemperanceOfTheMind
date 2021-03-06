// Stage2 state

var Stage2 = function(game) {};
Stage2.prototype = {
	create: function() {
		// Initialize variables
		currentStage = 2;
		respawnHP = playerHealth;
		inputEnabled = true;
		platformSpeed = 170;
		playerImmune = false;
		swordEquipped = true;

		// Add stage background
		this.bgtop = game.add.tileSprite(0,0,5000,700,'background01color');
		this.bg = game.add.tileSprite(0,100,5000,800,'background01');
		game.world.setBounds(0,0,5000,800);

		// Stage music
		if(music.isPlaying == false){
			music = game.add.audio('stage1');
			music.play();
			music.loopFull(0.3);
		}

		// Stage Sound Effects
		slashmiss = game.add.audio('slashmiss');
		slashhit = game.add.audio('slashhit');
		itemget = game.add.audio('itemget');
		fireball = game.add.audio('fireball');
		shield = game.add.audio('shield');

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

		this.lava = game.add.tileSprite(0,780,5000,1400,'lava');

		// initialize player sprite
		player = game.add.sprite(100, 665 ,'player', 'playerrun00');
		player.anchor.set(0.5);
		player.scale.setTo(1.5);

		// Use an invisible hitbox to check sword collision
		this.slashHitbox = game.add.sprite(0,0,'sword');
		this.slashHitbox.anchor.setTo(0,0.5);
		this.slashHitbox.scale.setTo(1.2, 0.5);
		this.slashHitbox.alpha = 0;

		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.enable(this.slashHitbox, Phaser.Physics.ARCADE);
		game.physics.enable(this.lava, Phaser.Physics.ARCADE);

		// update player properties
		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;

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

		// Create cursor keys
		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group
		
		var ground = platforms.create(0,736, 'ground01');
		ground.scale.setTo(0.5, 0.8);
		var ground = platforms.create(4700,736, 'ground01');
		ground.scale.setTo(0.5, 0.8);  
		
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

		// health text at top left of camera
		healthText = game.add.text(16,16,'Health: '+playerHealth,{fontSize: '32px', fill:'#facade'});
		healthText.fixedToCamera = true;
		game.camera.follow(player,1);

		// Adds sword and shield to game world
		this.sworditem = game.add.sprite(60,1045,'sword');
		this.sworditem.scale.setTo(0.5);

		this.shielditem = game.add.sprite(2835,540,'shield');
		this.shielditem.scale.setTo(0.5);
		game.physics.enable(this.shielditem, Phaser.Physics.ARCADE);

		// Item tooltips
		swordText = game.add.text(-10,16,'[SPACE]',{fontSize: '10px', fill:'#facade'});
		shieldText = game.add.text(-10,16,'[SHIFT]',{fontSize: '10px', fill:'#facade'});

		// Bubble around player when they shield
		shieldBubble = game.add.sprite(-100,-100,'bubble');
		shieldBubble.scale.set(1.7);
		shieldBubble.alpha = 0.5;
		shieldBubble.anchor.set(0.5);

		// Add fireballs
		this.fireballs = game.add.emitter(2700,800,500);
		this.fireballs.makeParticles('fireball',0,500,true,false);
		this.fireballs.setYSpeed(-800,-500);
		this.fireballs.setXSpeed(-150,150);
		this.fireballs.setRotation(500,600);
		this.fireballs.gravity = 500;
		this.fireballs.area = new Phaser.Rectangle(100, 100,3000,1);
		this.fireballs.start(false,8000,400,300);

		// Heart pickups
		this.heart = game.add.sprite(4900,700,'heart');
		this.heart.anchor.set(0.5);
		this.heart.scale.set(0.5);
		game.physics.enable(this.heart, Phaser.Physics.ARCADE);

		// Stage 2 dialogue
		this.stage2text = game.add.text(560, 400, 'You’ve triumphed over the demon of vexation\n and now your mind is free from the\noverstimulated feeling of aggression and vice.\nYou’ve come to terms with your job loss and\nyou no longer resent your boss…', {font: 'Press Start 2P', fontSize: '20px', fill: '#fff'});
		this.stage2text.anchor.set(0.5);
		this.stage2text.align = 'center';

	},
	update: function() {

		// Make player collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(bounds, platforms,this.flipPlatform,null,this);
		if(game.physics.arcade.collide(this.heart,player)){ // Start next state if player picks up heart
			music.stop();
			playerHealth++;
			game.state.start('Stage3');
		}
		if(game.physics.arcade.collide(this.lava,player)){ // Player dies falling into lava
			fireball.play();
			music.stop();
			game.state.start('GameOver');
		}
		// Player pickup shield
		if(game.physics.arcade.overlap(player, this.shielditem)){ // Add shield to player inventory
			shieldEquipped = true;
			this.shielditem.x = 950;
			this.shielditem.y = 20;
			this.shielditem.fixedToCamera = true;
			shieldText.x = 959;
			shieldText.y = 79;
			shieldText.fixedToCamera = true;
			itemget.play();
		}
		if(swordEquipped == true){ // Add sword to player inventory
			this.sworditem.x = 1020;
			this.sworditem.y = 20;
			this.sworditem.fixedToCamera = true;
			swordText.x = 1029;
			swordText.y = 79;
			swordText.fixedToCamera = true;
		}
		// Player loses health on collision with fireball
		if(game.physics.arcade.overlap(player, this.fireballs) && playerImmune == false && player.animations.name != 'shieldright' && player.animations.name != 'shieldleft'){
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
		// check for player input
		if(inputEnabled == true && cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			this.stage2text.destroy();
			player.body.velocity.x = -295;
			player.animations.play('left');
			this.facingRight = false;
		}
		else if(inputEnabled == true && cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			this.stage2text.destroy();
			player.body.velocity.x = 295;
			player.animations.play('right');
			this.facingRight = true;
		}
		else if(player.animations.name == 'slashright' | player.animations.name == 'slashleft' | player.animations.name == 'shieldleft' | player.animations.name == 'shieldright'){
			player.body.velocity.x = 0;
		}
		else{ // Stops animation if player is not moving
			player.body.velocity.x = 0;
			if(this.facingRight == true){
				player.animations.play('standingright');
			}
			if(this.facingRight == false){
				player.animations.play('standingleft');
			}
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform && inputEnabled == true){ // Makes player jump if they are on the ground and press up key
			this.stage2text.destroy();
			player.body.velocity.y = -750;
		}
		if(hitPlatform && inputEnabled == true && swordEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){ // Sword slash with spacebar
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
		if(hitPlatform && inputEnabled == true && shieldEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){ // Player shield with shift
			this.shielding = true;
			inputEnabled = false;
			playerImmune = true;
			this.timer = game.time.create(1000,true);
			this.timer.add(1000, this.disableShield, this); // Used to make bubble appear on player  
			this.timer.add(1000, this.disableInput, this);  // Disable input for 1 sec
			this.timer.add(2500, this.playerImmunity, this); // Make player immune for 2.5 sec
			this.timer.add(1000,this.moveHitbox,this); // reset bubble position
			this.timer.start();
			shield.play();
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
		if(this.shielding == true){ // Make bubble appear on player during shield
			shieldBubble.y = player.y;
			shieldBubble.x = player.x;			
		}
	},
	flipPlatform: function(bounds, platformMoving) { // Make platforms move left and right
		platformMoving.body.velocity.x = platformMoving.body.velocity.x * -1; 
		platformMoving.body.velocity.y = platformMoving.body.velocity.y * -1; 
	},
	disableInput: function() {// Used to reenable player input
		inputEnabled = true;
	},
	enemyImmunity: function() { // Used to disable enemy enemyImmunity
		enemyImmune = false;
	},
	playerImmunity: function() { // Disable player immunity
		playerImmune = false;
	},
	moveHitbox: function() { // Reset sword and shield bubble 
		this.slashHitbox.x = 0;
		this.slashHitbox.y = 0;
		shieldBubble.x = -100;
		shieldBubble.y = -100;
	},
	disableShield: function() { // boolean shielding
		this.shielding = false;
	}
};
