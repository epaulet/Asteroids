(function () {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var MovingObject = Asteroids.MovingObject = function (params) {
    this.color = params.color;
    this.game = params.game;
    this.isWrappable = true;
    this.pos = params.pos;
    this.radius = params.radius;
    this.vel = params.vel;
  };

  MovingObject.prototype.collidedWith = function (otherObject) {
    //overridden by Asteroid class
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x_2 = (this.pos[0] - otherObject.pos[0]) * (this.pos[0] - otherObject.pos[0]);
    var y_2 = (this.pos[1] - otherObject.pos[1]) * (this.pos[1] - otherObject.pos[1]);
    return Math.sqrt(x_2 + y_2) < this.radius + otherObject.radius;
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };
})();
