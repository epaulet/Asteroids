(function () {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  Asteroids.Util = {};

  Asteroids.Util.angle = function (vector) {
    var angle = Math.atan(vector[1] / vector[0]);
    if (vector[0] < 0) {
      angle += Math.PI;
    }
    return angle;
  };

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var rad = Math.random() * 2 * Math.PI;
    var y = length * Math.sin(rad);
    var x = length * Math.cos(rad);
    return [x, y];
  };
})();
