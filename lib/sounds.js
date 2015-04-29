(function () {
  Asteroids.Sounds = {
    shootSound: new Howl({ urls: ['./audio/fire.wav'] })
  };

  Asteroids.Sounds.shoot = function () {
    this.shootSound.play();
  };
})();
