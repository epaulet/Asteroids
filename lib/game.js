(function () {
  var Game = Asteroids.Game = function (imageObjs) {
    this.images = imageObjs;
    this.over = false;
    this.blackHoleLimit = Game.BLACKHOLE_LIMIT;
    this.resetDefaults();
    this.ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 5;
  Game.BLACKHOLE_LIMIT = 1;

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

  Game.prototype.allMoveable = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets)
      .concat(this.blackHoles).concat(this.wormHoles);
  };

  Game.prototype.blackHoleLimitReached = function () {
    return this.blackHoles.length >= this.blackHoleLimit;
  };

  Game.prototype.blackHoleStep = function () {
    if (Math.random() < 0.008) {
      this.blackHoles.push(new Asteroids.BlackHole ({
        pos: this.randomPosition(),
        image: this.images.blackhole,
        game: this
      }));
    }
  };

  Game.prototype.checkCollisions = function () {
    var allObj = this.allObjects();
    for (var i = 0; i< allObj.length; i++) {
      for (var j = 0; j < allObj.length; j++) {
        if (i === j) { continue; }
        if (allObj[i].isCollidedWith(allObj[j])) {
          allObj[i].collidedWith(allObj[j]);
        }
      }
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.rect(0, 0, 1000, 600);
    ctx.fillStyle = 'black';
    ctx.fill();
    this.allObjects().forEach(function (object) { object.draw(ctx); });
  };

  Game.prototype.gameOver = function () {
    alert('You died!');
    this.over = true;
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y;
  };

  Game.prototype.moveObjects = function () {
    var game = this;
    this.allMoveable().forEach(function (object) {
      object.move();
      if (game.isOutOfBounds(object.pos)) {
        if (object.isWrappable) {
          object.pos = game.wrap(object.pos);
        } else {
          game.remove(object);
        }
      }
    });
  };

  Game.prototype.randomPosition = function () {
    var x = Game.DIM_X * Math.random();
    var y = Game.DIM_Y * Math.random();
    return [x, y];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Ship) {
      this.gameOver();
    }
  };

  Game.prototype.resetDefaults = function () {
    this.asteroids = [];
    this.bullets = [];
    this.blackHoles = [];
    this.wormHoles = [];
    this.addAsteroids();
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (!this.blackHoleLimitReached()) { this.blackHoleStep(); }
    this.wormHoleStep();
  };

  Game.prototype.wormHoleStep = function () {
    if (Math.random() < 0.003) {
      this.wormHoles.push(new Asteroids.WormHole({
        pos: this.randomPosition(),
        image: this.images.wormhole,
        game: this
      }));
    }
  };

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
    var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return [x, y];
  };
})();
