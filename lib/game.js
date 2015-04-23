(function () {
  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var newAsteroid = new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this
      });
      this.asteroids.push(newAsteroid);
    }
  };

  Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 1000, 600);
    this.allObjects().forEach(function (object) { object.draw(ctx); });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) { object.move(); });
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i< this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collidedWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Game.DIM_X * Math.random();
    var y = Game.DIM_Y * Math.random();
    return [x, y];
  };

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
    var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.remove = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };
})();
