(function () {
  Asteroids.Asteroid = function () {};

  var Asteroid = Asteroids.Asteroid = function (params) {
    params.color = Asteroid.COLOR;
    params.radius = Asteroid.RADIUS;
    params.vel = Asteroids.Util.randomVec(Asteroid.SPEED);
    Asteroids.MovingObject.call(this, params);
  };

  Asteroid.COLOR = "#DEB887";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collidedWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      otherObject.vel = [0, 0];
    }
  };
})();
