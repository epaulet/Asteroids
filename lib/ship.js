(function () {
  var Ship = Asteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    params.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, params);
  };

  Ship.RADIUS = 15;
  Ship.COLOR = 'MediumBlue';

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: [this.vel[0] * 4, this.vel[1] * 4],
      game: this.game
    });
    this.game.addBullet(bullet);
  };
})();
