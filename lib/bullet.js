(function () {
  var Bullet = Asteroids.Bullet = function (params) {
    params.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, params);
    this.color = Bullet.COLOR;
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

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
})();
