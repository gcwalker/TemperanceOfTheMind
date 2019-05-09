// Player prefab

// create Player constructor
function Player = function(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this,game,70, game.world.centerY,'jax','f01');
	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.anchor.set(0.5);
	this.scale.setTo(0.2);
	this.scale.x = (-0.2);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.bounce.y = 0.2;
	//this.body.setSize(300,400,200,50);
	//this.body.immovable = true;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.update = function() {
	this.animations.play('walk');

	this.body.velocity.x = 0;
	// check for player input
	if(cursors.left.isDown){ // Moves player left when left arrow key is down and plays left walking animation
		this.body.velocity.x = -150;
		//player.animations.play('left');
	}
	else if(cursors.right.isDown){ // Moves player right when right arrow key is down and plays right walking animation
		this.body.velocity.x = 150;
		//player.animations.play('right');
	}
	else{ // Stops animation if player is not moving
		this.animations.stop(); 
		//player.frame = 4;
	}
	if(cursors.up.isDown && player.body.touching.down && hitPlatform){ // Makes player jump if they are on the ground and press up key
		this.body.velocity.y = -750;
	}
}