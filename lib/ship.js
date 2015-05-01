(function () {
  var Ship = Asteroids.Ship = function (params) {
    params.radius = Ship.RADIUS;
    params.vel = [0, 0];
    this.dir = 3 * Math.PI / 2;
    this.dirVel = 0;
    this.image = params.image;
    this.lives = Ship.INITIAL_LIVES;
    Asteroids.MovingObject.call(this, params);
  };

  Ship.RADIUS = 25;
  Ship.INITIAL_LIVES = 9;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.dir);
    ctx.drawImage(this.image, this.radius * -1, this.radius * -1,
      2 * this.radius, 2 * this.radius);
    ctx.restore();
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0], this.pos[1]],
      vel: [Math.cos(this.dir) * 15, Math.sin(this.dir) * 15],
      game: this.game
    });
    Asteroids.Sounds.shoot();
    this.game.addBullet(bullet);
  };

  Ship.prototype.loseLife = function () {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.game.gameOver();
    }
  };

  Ship.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.call(this);
    this.vel[0] *= 0.99;
    this.vel[1] *= 0.99;
    this.dir += this.dirVel;
    this.dirVel *= 0.80;
    this.vel = Asteroids.Util.turnVector(this.dir, this.vel);
  };

  Ship.prototype.accelerate = function (direction) {
    if (direction === 'forward') {
      this.vel = Asteroids.Util.changeMagnitude(this.vel, this.dir, 2);
      Asteroids.Sounds.thrust();
    } else if (direction === 'back') {
      this.vel = Asteroids.Util.changeMagnitude(this.vel, this.dir, -2);
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.turn = function (direction) {
    if (direction === 'left') {
      this.dirVel -= Math.PI / 16;
    } else if (direction === 'right') {
      this.dirVel += Math.PI / 16;
    }
  };
})();
