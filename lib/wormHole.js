(function () {
  var WormHole = Asteroids.WormHole = function (params) {
    params.color = WormHole.COLOR;
    params.radius = WormHole.RADIUS;
    this.image = params.image;
    this.angle = 0;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(WormHole, Asteroids.SpaceObject);

  WormHole.prototype.collidedWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.resetDefaults();
    } else {
      this.game.remove(otherObject);
    }
  };

  WormHole.prototype.draw = function (ctx) {
    this.angle += 2 * Math.PI / 50;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.radius * -1,
      this.radius * -1, 2 * this.radius, 2 * this.radius);
    ctx.restore();
  };

  WormHole.COLOR = 'green';
  WormHole.RADIUS = 35;
})();
