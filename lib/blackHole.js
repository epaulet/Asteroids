(function () {
  var BlackHole = Asteroids.BlackHole = function (params) {
    params.color = BlackHole.COLOR;
    params.radius = BlackHole.RADIUS;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(BlackHole, Asteroids.SpaceObject);

  BlackHole.prototype.collidedWith = function (otherObject) {
    this.game.remove(otherObject);
  };

  BlackHole.COLOR = 'gray';
  BlackHole.RADIUS = 30;
})();