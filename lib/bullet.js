(function () {
  var Bullet = Asteroids.Bullet = function (params) {
    params.radius = Bullet.RADIUS;
    params.color = Bullet.COLOR;
    Asteroids.MovingObject.call(this, params);
  };

  Bullet.RADIUS = 5;
  Bullet.COLOR = 'Red';

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
