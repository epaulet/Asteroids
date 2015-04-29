(function () {
  images = {};

  images.blackhole = document.createElement('img');
  images.blackhole.src = './images/blackhole.png';

  images.wormhole = document.createElement('img');
  images.wormhole.src = './images/wormhole.png';

  images.asteroid = document.createElement('img');
  images.asteroid.src = './images/asteroid.png';

  images.spaceship = document.createElement('img');
  images.spaceship.src = './images/spaceship.png';

  images.space = document.createElement('img');
  images.space.src = './images/space.png';

  images.arrowKeys = document.createElement('img');
  images.arrowKeys.src = './images/arrow-keys.png';

  images.spaceBar = document.createElement('img');
  images.spaceBar.src = './images/space-bar.png';


  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');
  var game = new Asteroids.Game(images);
  var gameView = new Asteroids.GameView(game, ctx, images);
  gameView.renderTitleScreen();
})();
