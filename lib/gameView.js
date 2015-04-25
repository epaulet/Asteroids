(function () {
  var GameView = Asteroids.GameView = function (game, ctx, images) {
    this.game = game;
    this.ctx = ctx;
    this.images = images;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function () { ship.power([0, -2]); });
    key('down', function () { ship.power([0, 2]); });
    key('left', function () { ship.power([-2, 0]); });
    key('right', function () { ship.power([2, 0]); });
    key('space', function () { ship.fireBullet(); });
  };

  GameView.prototype.renderTitleScreen = function () {
    var gameView = this;
    var images = this.images;
    var ctx = this.ctx;
    var refreshInterval = setInterval(function () {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1000, 600);
      ctx.drawImage(images.wormhole, 100, 225, 50, 50);
      ctx.drawImage(images.blackhole, 100, 325, 50, 50);
      ctx.font = '24px sans-serif';
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText("Wormholes advance to the next level and increase difficulty.", 160, 250);
      ctx.fillText("Don't fall into a black hole!", 160, 350);
      ctx.textAlign = 'center';
      ctx.fillText("Asteroids!", 500, 150);
      ctx.fillText("Press Enter to start", 500, 450);
    }, 50);
    key('enter', function () {
      key.unbind('enter');
      clearInterval(refreshInterval);
      gameView.start();
    });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    var refreshInterval = setInterval(function () {
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
      if (gameView.game.over) { clearInterval(refreshInterval); }
    }, 20);
  };
})();
