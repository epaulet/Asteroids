(function () {
  var WormHole = Asteroids.WormHole = function (params) {
    params.radius = WormHole.RADIUS;
    Asteroids.SpinningObject.call(this, params);
  };

  Asteroids.Util.inherits(WormHole, Asteroids.SpinningObject);

  WormHole.prototype.collidedWith = function (otherObject) {
    if (this.active) {
      if (otherObject instanceof Asteroids.Ship) {
        this.game.newLevelSetup();
      } else {
        this.game.remove(otherObject);
      }
    }
  };

  WormHole.RADIUS = 35;
})();
