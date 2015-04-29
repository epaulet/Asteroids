(function () {
  var GameView = Asteroids.GameView = function (game, ctx, levelDisplay, pointDisplay) {
    this.levelDisplay = levelDisplay;
    this.pointDisplay = pointDisplay;
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function () { ship.accelerate('forward'); });
    key('down', function () { ship.accelerate('back'); });
    key('left', function () { ship.turn('left'); });
    key('right', function () { ship.turn('right'); });
    key('space', function () { ship.fireBullet(); });
  };

  GameView.prototype.renderGameOverScreen = function () {
    var gameView = this;
    var refreshInterval = setInterval(function () {
      gameView.game.draw(gameView.ctx);
      gameView.renderGameOverScreenContents();
    }, 50);
    key('enter', function () {
      key.unbind('enter');
      clearInterval(refreshInterval);
      gameView.game = new Asteroids.Game(gameView.images);
      setTimeout(function() {
        gameView.renderTitleScreen();
      }, 0);
    });
  };

  GameView.prototype.renderGameOverScreenContents = function () {
    var ctx = this.ctx;
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER", 500, 250);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press Enter to play again', 500, 350);
  };

  GameView.prototype.renderTitleScreen = function () {
    var gameView = this;
    var refreshInterval = setInterval(function () {
      gameView.renderTitleScreenContents();
    }, 50);
    key('enter', function () {
      key.unbind('enter');
      clearInterval(refreshInterval);
      gameView.start();
    });
  };

  GameView.prototype.renderTitleScreenContents = function () {
    var ctx = this.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 600);
    ctx.drawImage(Asteroids.Images.wormhole, 100, 125, 50, 50);
    ctx.drawImage(Asteroids.Images.blackhole, 100, 225, 50, 50);
    ctx.drawImage(Asteroids.Images.arrowKeys, 160, 350, 75, 50);
    ctx.drawImage(Asteroids.Images.spaceBar, 550, 350, 75, 50);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText("Wormholes advance to the next level and increase difficulty.", 160, 150);
    ctx.fillText("Don't fall into a black hole!", 160, 250);
    ctx.fillText("Turn/Thrust/Decelerate", 250, 375);
    ctx.fillText("Shoot", 640, 375);
    ctx.textAlign = 'center';
    ctx.fillText("Press Enter to start", 500, 450);
    ctx.font = '48px sans-serif';
    ctx.fillText("Asteroids!", 500, 50);
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    gameView.game.newLevelSetup();
    var refreshInterval = setInterval(function () {
      gameView.game.step();
      gameView.levelDisplay.innerHTML = gameView.game.level;
      gameView.pointDisplay.innerHTML = gameView.game.points;
      gameView.game.draw(gameView.ctx);
      if (gameView.game.over) {
        clearInterval(refreshInterval);
        gameView.renderGameOverScreen();
      }
    }, 20);
  };
})();
