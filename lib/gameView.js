(function () {
  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    refreshInterval = setInterval(function () {
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
      if (gameView.game.over) { clearInterval(refreshInterval); }
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function () { ship.power([0, -1]); });
    key('down', function () { ship.power([0, 1]); });
    key('left', function () { ship.power([-1, 0]); });
    key('right', function () { ship.power([1, 0]); });
    key('space', function () { ship.fireBullet(); });
  };
})();
