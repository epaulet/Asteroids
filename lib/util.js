(function () {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  Asteroids.Util = {};

  Asteroids.Util.angle = function (vector) {
    var angle = Math.atan(vector[1] / vector[0]);
    if (vector[0] < 0) {
      angle += Math.PI;
    } else if (vector[0] === 0 && vector[1] === 0) {
      angle = 3 * Math.PI / 2;
    }
    return angle;
  };

  Asteroids.Util.changeMagnitude = function (vector, direction, difference) {
    var mag = this.magnitude(vector) + difference;
    return [mag * Math.cos(direction), mag * Math.sin(direction)];
  };

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.magnitude = function (vector) {
    return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
  };

  Asteroids.Util.randomVec = function (length) {
    var rad = Math.random() * 2 * Math.PI;
    var y = length * Math.sin(rad);
    var x = length * Math.cos(rad);
    return [x, y];
  };

  Asteroids.Util.turnVector = function (targetAngle, oldVector) {
    var mag = this.magnitude(oldVector);
    return [mag * Math.cos(targetAngle), mag * Math.sin(targetAngle)];
  };
})();
