(function () {
  var Ship = Asteroids.Ship = function (params) {
    params.color = Ship.COLOR;
    params.radius = Ship.RADIUS;
    params.vel = [0, 0];
    this.dir = 3 * Math.PI / 2;
    this.image = params.image;
    Asteroids.MovingObject.call(this, params);
  };

  Ship.RADIUS = 15;
  Ship.COLOR = 'MediumBlue';

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.dir);
    ctx.drawImage(this.image, this.radius * -1, this.radius * -1,
      2 * this.radius, 2 * this.radius);
    ctx.restore();
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0], this.pos[1]],
      vel: [Math.cos(this.dir) * 10, Math.sin(this.dir) * 10],
      game: this.game
    });
    this.game.addBullet(bullet);
  };

  Ship.prototype.move = function () {
    this.vel[0] *= 0.99;
    this.vel[1] *= 0.99;
    Asteroids.MovingObject.prototype.move.call(this);
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.dir = Asteroids.Util.angle(this.vel);
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})();
