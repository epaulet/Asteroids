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
    ctx.drawImage(Asteroids.Images.asteroid, 250, 125, 50, 50);
    ctx.drawImage(Asteroids.Images.wormhole, 150, 200, 50, 50);
    ctx.drawImage(Asteroids.Images.blackhole, 150, 275, 50, 50);
    ctx.drawImage(Asteroids.Images.arrowKeys, 262.5, 350, 75, 50);
    ctx.drawImage(Asteroids.Images.spaceBar, 637.5, 350, 125, 50);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText("Get hit by an Asteroid and lose a life.", 310, 135);
    ctx.fillText("Destroy an Asteroid and score points!", 310, 165);
    ctx.fillText("Wormholes advance to the next level and increase difficulty.", 210, 225);
    ctx.fillText("Don't let black holes suck you in or it'll be GAME OVER!", 210, 300);
    ctx.textAlign = 'center';
    ctx.fillText("Turn/Accelerate/Decelerate", 300, 425);
    ctx.fillText("Shoot asteroids!", 700, 425);
    ctx.fillText("Press Enter to start", 500, 500);
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
