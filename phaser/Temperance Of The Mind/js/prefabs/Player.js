// Player prefab

// create Player constructor
function Player = function(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this,game,70, game.world.centerY,'jax','f01');
	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.anchor.set(0.5);
	this.scale.x = (0.2);
	this.scale.y = (0.2);
	//this.body.setSize(300,400,200,50);
	//this.body.immovable = true;
	this.body.velocity.x = speed;
	this.newMeanDog = true;
};

MeanDog.prototype = Object.create(Phaser.Sprite.prototype);

MeanDog.prototype.constructor = MeanDog;

MeanDog.prototype.update = function() {
	if(this.newMeanDog && this.x < game.width/4) {
		this.newMeanDog = false;
		Play.prototype.addDog(this.parent);
	}
	// Kill mean dog if it passes left edge
	if(this.x < -this.width) {
		this.kill();
	}
}