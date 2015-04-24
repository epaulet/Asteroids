(function () {
  var WormHole = Asteroids.WormHole = function (params) {
    params.color = WormHole.COLOR;
    params.radius = WormHole.RADIUS;
    this.image = params.image;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(WormHole, Asteroids.SpaceObject);

  WormHole.prototype.collidedWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.resetDefaults();
    } else {
      this.game.remove(otherObject);
    }
  };

  WormHole.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0] - this.radius,
      this.pos[1] - this.radius, 2 * this.radius, 2 * this.radius);
  };

  WormHole.COLOR = 'green';
  WormHole.RADIUS = 35;
})();
