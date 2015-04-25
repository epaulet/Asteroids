(function () {
  var SpinningObject = Asteroids.SpinningObject = function (params) {
    this.image = params.image;
    this.angle = 0;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(SpinningObject, Asteroids.SpaceObject);

  SpinningObject.prototype.draw = function (ctx) {
    this.angle += 2 * Math.PI / 50;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.radius * -1,
      this.radius * -1, 2 * this.radius, 2 * this.radius);
    ctx.restore();
  };
})();