(function () {
  var SpinningObject = Asteroids.SpinningObject = function (params) {
    this.angle = 0;
    this.active = false;
    this.image = params.image;
    this.setActiveTimer();
    this.blinkCounter = 0;
    Asteroids.SpaceObject.call(this, params);
  };

  Asteroids.Util.inherits(SpinningObject, Asteroids.SpaceObject);

  SpinningObject.prototype.draw = function (ctx) {
    if (this.active) {
      this.angle += 2 * Math.PI / 50;
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.angle);
      ctx.drawImage(this.image, this.radius * -1,
        this.radius * -1, 2 * this.radius, 2 * this.radius);
      ctx.restore();
    } else {
      if (Math.floor(this.blinkCounter / 10) % 2 === 0) {
        ctx.drawImage(this.image, this.pos[0] - this.radius,
          this.pos[1] - this.radius, 2 * this.radius, 2 * this.radius);
      }
      this.blinkCounter += 1;
    }
  };

  SpinningObject.prototype.setActiveTimer = function () {
    var spinningObject = this;
    setTimeout(function () {
      spinningObject.active = true;
    }, 3000);
  };
})();
