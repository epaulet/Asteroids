(function () {
  var BlackHole = Asteroids.BlackHole = function (params) {
    params.color = BlackHole.COLOR;
    params.radius = BlackHole.RADIUS;
    this.image = params.image;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(BlackHole, Asteroids.SpaceObject);

  BlackHole.prototype.collidedWith = function (otherObject) {
    this.game.remove(otherObject);
  };

  BlackHole.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0] - this.radius,
      this.pos[1] - this.radius, 2 * this.radius, 2 * this.radius);
  };

  BlackHole.COLOR = 'gray';
  BlackHole.RADIUS = 30;
})();
