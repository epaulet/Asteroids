(function () {
  var WormHole = Asteroids.WormHole = function (params) {
    params.color = WormHole.COLOR;
    params.radius = WormHole.RADIUS;
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

  WormHole.COLOR = 'green';
  WormHole.RADIUS = 35;
})();
