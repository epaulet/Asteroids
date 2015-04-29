(function () {
  var SpaceObject = Asteroids.SpaceObject = function (params) {
    this.game = params.game;
    this.pos = params.pos;
    this.radius = params.radius;
  };

  SpaceObject.prototype.collidedWith = function (otherObject) {
    //overridde
  };

  SpaceObject.prototype.draw = function (ctx) {
    //overridde
  };

  SpaceObject.prototype.isCollidedWith = function (otherObject) {
    var x_2 = (this.pos[0] - otherObject.pos[0]) * (this.pos[0] - otherObject.pos[0]);
    var y_2 = (this.pos[1] - otherObject.pos[1]) * (this.pos[1] - otherObject.pos[1]);
    return Math.sqrt(x_2 + y_2) < this.radius + otherObject.radius;
  };
})();
