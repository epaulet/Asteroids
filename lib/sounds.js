(function () {
  Asteroids.Sounds = {
    shootSound: new Howl({ urls: ['./audio/fire.wav'] }),
    bangSound: new Howl({ urls: ['./audio/bang.wav'] }),
    thrustSound: new Howl({ urls: ['./audio/thrust.wav'], volume: 0.5 }),

    shoot: function () { this.shootSound.play(); },
    bang: function () { this.bangSound.play(); },
    thrust: function () { this.thrustSound.play(); }
  };
})();
