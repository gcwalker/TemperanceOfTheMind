// Bones prefab

// create Bones constructor
var Bones = function(game, speed) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this,game,game.width + 100,game.rnd.integerInRange(64, game.height-64),'bones');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.scale.x = (0.2);
	this.scale.y = (0.2);
	this.body.setSize(300,400,200,50);
	this.body.immovable = true;
	this.body.velocity.x = speed;
	this.tint = Math.random() * 0xffffff;
	this.newBones = true;
};

Bones.prototype = Object.create(Phaser.Sprite.prototype);

Bones.prototype.constructor = Bones;

Bones.prototype.update = function() {
	if(this.newBones && this.x < game.width/2) {
		this.newBones = false;
		Play.prototype.addBone(this.parent);
	}
	// Kill bone if it passes left edge
	if(this.x < -this.width) {
		this.kill();
	}
}