(function () {
  var MovingObject = Asteroids.MovingObject = function (params) {
    this.isWrappable = true;
    this.vel = params.vel;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(MovingObject, Asteroids.SpaceObject);

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.pull = function (vector) {
    this.pos[0] += vector[0];
    this.pos[1] += vector[1];
  };
})();
