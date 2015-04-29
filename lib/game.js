(function () {
  var Game = Asteroids.Game = function () {
    this.over = false;
    this.blackHoleLimit = Game.INITIAL_BLACKHOLE_LIMIT;
    this.blackHoleInterval = Game.INITIAL_BLACKHOLE_INTERVAL;
    this.asteroidLimit = Game.INITIAL_ASTEROID_AMOUNT;
    this.asteroidInterval = Game.INITIAL_ASTEROID_INTERVAL;
    this.ship = new Asteroids.Ship({
      pos: [500, 300],
      image: Asteroids.Images.spaceship,
      game: this
    });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.INITIAL_ASTEROID_AMOUNT = 5;
  Game.INITIAL_ASTEROID_INTERVAL = 3000;
  Game.INITIAL_BLACKHOLE_LIMIT = 0;
  Game.INITIAL_BLACKHOLE_INTERVAL = 12000;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.asteroidLimit; i++) {
      this.addAsteroid();
    }
  };

  Game.prototype.addAsteroid = function () {
    var newAsteroid = new Asteroids.Asteroid({
      pos: this.randomAsteroidPos(),
      image: Asteroids.Images.asteroid,
      game: this
    });
    this.asteroids.push(newAsteroid);
  };

  Game.prototype.addBlackHole = function () {
    this.blackHoles.push(new Asteroids.BlackHole ({
      pos: this.randomPosition(),
      image: Asteroids.Images.blackhole,
      game: this
    }));
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
    //BLACKHOLE MOTION GOES HERE
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
    ctx.clearRect(0, 0, 1000, 600);
    ctx.drawImage(Asteroids.Images.space, 0, 0, 1000, 600);
    this.allObjects().forEach(function (object) { object.draw(ctx); });
  };

  Game.prototype.gameOver = function () {
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

  Game.prototype.newLevelSetup = function () {
    this.blackHoleLimit += 1;
    this.asteroidLimit += 5;
    this.blackHoleInterval *= 0.8;
    this.asteroidInterval *= 0.8;
    this.asteroids = [];
    this.bullets = [];
    this.blackHoles = [];
    this.wormHoles = [];
    this.addAsteroids();
    this.setAsteroidInterval();
    this.setBlackHoleInterval();
    this.ship.pos = [500, 300];
  };

  Game.prototype.randomAsteroidPos = function () {
    var edge = Math.random() * 4;
    var x = 0;
    var y = 0;
    if (edge < 1) {
      y = Math.random() * Game.DIM_Y;
    } else if (edge < 2) {
      x = Math.random() * Game.DIM_X;
    } else if (edge < 3) {
      x = Game.DIM_X;
      y = Math.random() * Game.DIM_Y;
    } else {
      y = Game.DIM_Y;
      x = Math.random() * Game.DIM_X;
    }
    return [x, y];
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

  Game.prototype.setAsteroidInterval = function () {
    if (this.addAsteroidInterval) { clearInterval(this.addAsteroidInterval); }
    var game = this;
    this.addAsteroidInterval = setInterval(function () {
      game.addAsteroid();
    }, this.asteroidInterval);
  };

  Game.prototype.setBlackHoleInterval = function () {
    var game = this;
    blackHoleInterval = setInterval(function () {
      if (game.blackHoleLimitReached()) {
        clearInterval(blackHoleInterval);
      } else {
        game.addBlackHole();
      }
    }, this.blackHoleInterval);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.wormHoleStep();
    this.blackHoleStep();
  };

  Game.prototype.wormHoleStep = function () {
    if (Math.random() < 0.003) {
      this.wormHoles.push(new Asteroids.WormHole({
        pos: this.randomPosition(),
        image: Asteroids.Images.wormhole,
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
