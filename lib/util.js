(function () {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  Asteroids.Util = {};

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
