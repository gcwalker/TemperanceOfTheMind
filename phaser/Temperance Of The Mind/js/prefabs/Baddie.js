// Baddie prefab

// create Baddie constructor
var Baddie = function(game, speed) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this,game,game.width + 100,game.rnd.integerInRange(64, game.height-64),'baddie');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.animations.add('right',[2,3],5,true);
	this.anchor.set(0.5);
	this.scale.x = (2);
	this.scale.y = (2);
	this.body.bounce.setTo(1,1);
	this.body.velocity.x = speed;
	this.body.velocity.y = 350;
	this.tint = Math.random() * 0xffffff;
	this.newBaddie = true;
};

Baddie.prototype = Object.create(Phaser.Sprite.prototype);

Baddie.prototype.constructor = Baddie;

Baddie.prototype.update = function() {
	this.animations.play('right');
	// only spawns baddie after point count is greater than 1500
	if(this.newBaddie && this.x < game.width/3  && pointCount >= 1500) {
		this.newBaddie = false;
		Play.prototype.addBaddie(this.parent);
	}
	// Kill baddie dog if it passes left edge
	if(this.x < -this.width) {
		this.kill();
	}
}