(function () {
  var Bullet = Asteroids.Bullet = function (params) {
    params.color = Bullet.COLOR;
    params.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, params);
    this.isWrappable = false;
  };

  Bullet.RADIUS = 5;
  Bullet.COLOR = 'Red';

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collidedWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      Asteroids.Sounds.bang();
      this.game.remove(this);
    }
  };
})();
