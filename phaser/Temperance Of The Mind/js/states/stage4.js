// Stage4 state

var Stage4 = function(game) {};
Stage4.prototype = {
	create: function() {
		// Initialize variables
		currentStage = 4;
		respawnHP = playerHealth;
		inputEnabled = true;
		platformSpeed = 170;
		enemySpeed = -200;
		enemyImmune = false;
		playerImmune = false;
		slashing = false;
		swordEquipped = true;
		shieldEquipped = true;
		this.enemyHealth = 5;

		// Add stage background
		this.bgtop = game.add.tileSprite(0,0,5000,900,'background02top');
		this.bg = game.add.tileSprite(0,900,5000,800,'background02');
		game.world.setBounds(0,0,5000,1600);

		// Stage music
		music = game.add.audio('sadnessbegin');
		music.play();
		music.onStop.add(this.beginLoop, this);

		// Stage Sound Effects
		slashmiss = game.add.audio('slashmiss');
		slashhit = game.add.audio('slashhit');
		fireball = game.add.audio('fireball');
		shield = game.add.audio('shield');

		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Bounds to make platforms move left and right
		bounds = game.add.group();
		bounds.enableBody = true;

		//Platform 1
		var left = bounds.create(550,1400,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(1500,1400,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		//Platform 2
		var left = bounds.create(1150,1100,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(1800,1100,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);	
		//Platform 2.5	
		var left = bounds.create(2000,1100,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(2700,1100,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);		
		//Platform 3
		var left = bounds.create(2000,700,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(2550,700,'bound');
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
		//Boss platform
		var left = bounds.create(2680,550,'bound');
		left.anchor.set(0.5);
		left.scale.setTo(0.2,0.2);
		var right = bounds.create(3200,550,'bound');
		right.anchor.set(0.5);
		right.scale.setTo(0.2,0.2);
		bounds.setAll('body.immovable', true);
		bounds.setAll('alpha', 0);

		this.lava = game.add.tileSprite(0,1580,5000,1400,'water');

		// initialize player sprite
		player = game.add.sprite(100, 1463 ,'player', 'playerrun00');
		player.anchor.set(0.5);
		player.scale.setTo(1.5);
		player.destroyed = false;

		this.enemy = game.add.sprite(2900, 540,'boss2');
		this.enemy.anchor.set(0.5);
		this.enemy.scale.setTo(1.7);

		this.slashHitbox = game.add.sprite(0,0,'sword');
		this.slashHitbox.anchor.setTo(0,0.5);
		this.slashHitbox.scale.setTo(1.2, 0.5);
		this.slashHitbox.alpha = 0;
		// apply physics to game stuff
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.enable(this.slashHitbox, Phaser.Physics.ARCADE);
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
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
		player.animations.add('shieldright',[16],6,true);
		player.animations.add('shieldleft',[17],6,true);

		this.enemy.animations.add('right',[1,2,3,4],6,true);
		this.enemy.animations.add('left',[5,6,7,8],6,true);

		this.facingRight = true;

		cursors = game.input.keyboard.createCursorKeys(); 

		// add platforms
		platforms = game.add.group();
		platforms.enableBody = true; // enable physics for platform group
		
		var ground = platforms.create(0,1536, 'ground01');
		ground.scale.setTo(0.5, 0.8);
		var ground = platforms.create(4700,736, 'ground01');
		ground.scale.setTo(0.5, 0.8);  
		//var groundR = platforms.create(3300,1336, 'ground01');
		//groundR.scale.setTo(0.9, 1); 
		//var ground0 = platforms.create(0,1336, 'ground01');
		//ground0.scale.setTo(3.8, 1); // Resize scale to fit the width of the game
		
		//Moving platforms
		//Platform1
		var platformMoving = platforms.create(900, 1350, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		//platform2
		var platformMoving = platforms.create(1300, 1100, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		//Platform2.5
		var platformMoving = platforms.create(2100, 1100, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;		
		//Platform3
		var platformMoving = platforms.create(2200, 700, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.x = -170;
		//platform4
		var platformMoving = platforms.create(3250, 500, 'platform01');
		platformMoving.scale.setTo(2, 2);
		platformMoving.body.velocity.y = -170;
		//platform5
		var platformMoving = platforms.create(3650, 500, 'platform01');
		platformMoving.scale.setTo(1.5, 1.6);
		platformMoving.body.velocity.y = -140;
		//platform6
		var platformMoving = platforms.create(4150, 600, 'platform01');
		platformMoving.scale.setTo(1.2, 1.5);
		platformMoving.body.velocity.x = -170;

		//Stationary platforms
		var platform = platforms.create(1750, 900, 'platform01');
		platform.scale.setTo(5, 2);
		var platform = platforms.create(2750, 1300, 'platform01');
		platform.scale.setTo(5, 2);
		var platform = platforms.create(2650, 600, 'platform01');
		platform.scale.setTo(6.5, 2);

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

		// Add teardrops
		this.teardrops = game.add.emitter(5000,-100,1000);
		this.teardrops.makeParticles('teardrop',0,500,true,false);
		this.teardrops.setYSpeed(500,750);
		this.teardrops.scale.set(0.5);
		//this.teardrops.setXSpeed(-150,150);
		this.teardrops.setRotation(0,0);
		this.teardrops.gravity = 100;
		this.teardrops.area = new Phaser.Rectangle(1000, 10,8000,1);
		this.teardrops.start(false,8000,250,1000);

		hearts = game.add.group();
		hearts.enableBody = true;
		var heart = hearts.create(3070,1270,'heart');
		heart.anchor.set(0.5);
		heart.scale.set(0.5);
		var heart = hearts.create(2970,1270,'heart');
		heart.anchor.set(0.5);
		heart.scale.set(0.5);
		var heart = hearts.create(2870,1270,'heart');
		heart.anchor.set(0.5);
		heart.scale.set(0.5);
		this.door = game.add.sprite(4900,663,'doorclosed');
		this.door.anchor.set(0.5);
		this.door.scale.set(0.25);
		game.physics.enable(this.door, Phaser.Physics.ARCADE);

		this.dooropen = game.add.sprite(-1000,-1000,'dooropen');
		this.dooropen.anchor.set(0.5);
		this.dooropen.scale.set(0.25);
		game.physics.enable(this.dooropen, Phaser.Physics.ARCADE);

	},
	update: function() {

		this.lava.tilePosition.x -= 2;
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
		game.physics.arcade.collide(bounds, platforms,this.flipPlatform,null,this);
		game.physics.arcade.collide(player,hearts,this.collectHeart,null,this);

		if(game.physics.arcade.collide(this.lava,player)){
			fireball.play();
			music.stop();
			game.state.start('GameOver');
		}
		// Player pickup shield
		if(shieldEquipped == true){
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

		if(game.physics.arcade.overlap(player, this.teardrops) && playerImmune == false && player.animations.name != 'shieldright' && player.animations.name != 'shieldleft'){
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
			this.timer = game.time.create(true);
			this.timer.add(150, this.disableInput, this);
			this.timer.add(1500, this.playerImmunity, this);
			this.timer.start();	
		}
		
		if(game.physics.arcade.overlap(player, this.enemy) && enemyImmune == false){
			if(player.animations.name == 'shieldright' | player.animations.name == 'shieldleft')
				this.flipEnemy(this.enemy); 
			else{
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
			}
		}// check for player input
		else if(inputEnabled == true && cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
			player.body.velocity.x = -295;
			player.animations.play('left');
			this.facingRight = false;
		}
		else if(inputEnabled == true && cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
			player.body.velocity.x = 295;
			player.animations.play('right');
			this.facingRight = true;
		}
		else if(player.animations.name == 'slashright' | player.animations.name == 'slashleft' | player.animations.name == 'shieldleft' | player.animations.name == 'shieldright'){
			player.body.velocity.x = 0;
		}
		else{ 
			player.body.velocity.x = 0;
			if(this.facingRight == true){
				player.animations.play('standingright');
			}
			if(this.facingRight == false){
				player.animations.play('standingleft');
			}
		}
		if(cursors.up.isDown && player.body.touching.down && hitPlatform && inputEnabled == true){ // Makes player jump if they are on the ground and press up key
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
		if(hitPlatform && inputEnabled == true && shieldEquipped == true && game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){
			this.shielding = true;
			inputEnabled = false;
			playerImmune = true;
			this.timer = game.time.create(1000,true);
			this.timer.add(1000, this.disableShield, this);
			this.timer.add(1000, this.disableInput, this);
			this.timer.add(2500, this.playerImmunity, this);
			this.timer.add(1000,this.moveHitbox,this);
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
		if(this.shielding == true){
			shieldBubble.y = player.y;
			shieldBubble.x = player.x;			
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
				this.enemyAlive = false;
				this.enemy.kill();
				this.teardrops.lifespan = 1;
				this.door.x = -100;
				this.door.y = -100;
				this.dooropen.x = 4900;
				this.dooropen.y = 680;
			}
		}
		if(game.physics.arcade.collide(this.dooropen,player)){
			music.stop();
			game.state.start('Win');
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
	flipPlatform: function(bounds, platformMoving) {
		platformMoving.body.velocity.x = platformMoving.body.velocity.x * -1; 
		platformMoving.body.velocity.y = platformMoving.body.velocity.y * -1; 
	},
	disableInput: function() {
		inputEnabled = true;
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
	},
	disableShield: function() {
		this.shielding = false;
	},
	collectHeart: function(player,heart) {
		heart.kill();
		playerHealth++;
		healthText.text = 'Health: ' + playerHealth;
	},
	beginLoop: function() {
		music = game.add.audio('sadnessloop');
		music.play();
		music.loopFull(1);
	}
};
