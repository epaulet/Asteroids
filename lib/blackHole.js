(function () {
  var BlackHole = Asteroids.BlackHole = function (params) {
    params.radius = BlackHole.RADIUS;
    Asteroids.SpinningObject.call(this, params);
  };

  Asteroids.Util.inherits(BlackHole, Asteroids.SpinningObject);

  BlackHole.prototype.collidedWith = function (otherObject) {
    if (this.active) { this.game.remove(otherObject); }
  };
  
  BlackHole.RADIUS = 30;
})();
