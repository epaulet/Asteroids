(function () {
  var Game = Asteroids.Game = function () {
    this.over = false;
    this.level = 0;
    this.points = 0;
    this.initialAsteroidCount = Game.INITIAL_ASTEROID_COUNT;
    this.asteroidInterval = Game.INITIAL_ASTEROID_INTERVAL;
    this.blackHoleLimit = Game.INITIAL_BLACKHOLE_LIMIT;
    this.blackHoleInterval = Game.INITIAL_BLACKHOLE_INTERVAL;
    this.wormholeInterval = Game.INITIAL_WORMHOLE_INTERVAL;
    this.pullStrength = Game.INITIAL_PULL_STRENGTH;
    this.ship = new Asteroids.Ship({
      pos: [500, 300],
      image: Asteroids.Images.spaceship,
      game: this
    });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.INITIAL_ASTEROID_COUNT = 5;
  Game.INITIAL_ASTEROID_INTERVAL = 4000;
  Game.INITIAL_BLACKHOLE_LIMIT = 0;
  Game.INITIAL_BLACKHOLE_INTERVAL = 8000;
  Game.INITIAL_WORMHOLE_INTERVAL = 8000;
  Game.INITIAL_PULL_STRENGTH = 0.5;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.initialAsteroidCount; i++) {
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
      .concat(this.blackHoles).concat(this.wormholes);
  };

  Game.prototype.blackHoleLimitReached = function () {
    return this.blackHoles.length >= this.blackHoleLimit;
  };

  Game.prototype.blackHoleStep = function () {
    var game = this;
    this.blackHoles.forEach(function (blackHole) {
      if (blackHole.active) {
        game.allMoveable().forEach(function (object) {
          var pullVector = Asteroids.Util.pullVector(object.pos, blackHole.pos, game.pullStrength);
          object.pull(pullVector);
        });
      }
    });
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
    this.points += this.level * 50000;
    this.level += 1;
    this.blackHoleLimit += 1;
    this.initialAsteroidCount += 1;
    this.blackHoleInterval *= 0.9;
    this.wormholeInterval *= 1.2;
    this.asteroidInterval *= 0.9;
    this.pullStrength *= 1.1;
    this.asteroids = [];
    this.bullets = [];
    this.blackHoles = [];
    this.wormholes = [];
    this.addAsteroids();
    this.setIntervals();
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
      this.points += 1000 * this.level;
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Ship) {
      this.gameOver();
    }
  };

  Game.prototype.setIntervals = function () {
    var game = this;

    if (this.addAsteroidInterval) { clearInterval(this.addAsteroidInterval); }
    this.addAsteroidInterval = setInterval(function () {
      if (game.over) {
        clearInterval(addAsteroidInterval);
      } else {
        game.addAsteroid();
      }
    }, this.asteroidInterval);

    if (this.addBlackHoleInterval) { clearInterval(this.addBlackHoleInterval); }
    this.addBlackHoleInterval = setInterval(function () {
      if (game.blackHoleLimitReached()) {
        clearInterval(game.addBlackHoleInterval);
      } else {
        game.addBlackHole();
      }
    }, this.blackHoleInterval);

    if (this.addWormholeInterval) { clearInterval(this.addWormholeInterval); }
    this.addWormholeInterval = setInterval(function () {
      if (game.over) {
        clearInterval(this.addWormholeInterval);
      } else {
        game.wormholes.push(new Asteroids.WormHole({
          pos: game.randomPosition(),
          image: Asteroids.Images.wormhole,
          game: game
        }));
      }
    }, this.wormholeInterval);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.blackHoleStep();
  };

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
    var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return [x, y];
  };
})();
