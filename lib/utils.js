(function () {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  Asteroids.Util = {
    angle: function (vector) {
      var angle = Math.atan(vector[1] / vector[0]);
      if (vector[0] < 0) {
        angle += Math.PI;
      } else if (vector[0] === 0 && vector[1] === 0) {
        angle = 3 * Math.PI / 2;
      }
      return angle;
    },

    changeMagnitude: function (vector, direction, difference) {
      var mag = this.magnitude(vector) + difference;
      return [mag * Math.cos(direction), mag * Math.sin(direction)];
    },

    inherits: function (ChildClass, ParentClass) {
      var Surrogate = function () {};
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
    },

    magnitude: function (vector) {
      return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    },

    randomVec: function (length) {
      var rad = Math.random() * 2 * Math.PI;
      var y = length * Math.sin(rad);
      var x = length * Math.cos(rad);
      return [x, y];
    },

    turnVector: function (targetAngle, oldVector) {
      var mag = this.magnitude(oldVector);
      return [mag * Math.cos(targetAngle), mag * Math.sin(targetAngle)];
    }
  };

  Asteroids.Sounds = {
    shootSound: new Howl({ urls: ['./audio/fire.wav'] }),
    bangSound: new Howl({ urls: ['./audio/bang.wav'], volume: 1.5 }),
    thrustSound: new Howl({ urls: ['./audio/thrust.wav'], volume: 0.8 }),
    hiToneSound: new Howl({ urls: ['./audio/hi-tone.wav'] }),
    lowToneSound: new Howl({ urls: ['./audio/low-tone.wav'] }),


    shoot: function () { this.shootSound.play(); },
    bang: function () { this.bangSound.play(); },
    thrust: function () { this.thrustSound.play(); },
    warp: function () { /* TODO */ }
  };

  Asteroids.Images = {};

  Asteroids.Images.blackhole = document.createElement('img');
  Asteroids.Images.blackhole.src = './images/blackhole.png';

  Asteroids.Images.wormhole = document.createElement('img');
  Asteroids.Images.wormhole.src = './images/wormhole.png';

  Asteroids.Images.asteroid = document.createElement('img');
  Asteroids.Images.asteroid.src = './images/asteroid.png';

  Asteroids.Images.spaceship = document.createElement('img');
  Asteroids.Images.spaceship.src = './images/spaceship.png';

  Asteroids.Images.space = document.createElement('img');
  Asteroids.Images.space.src = './images/space.png';

  Asteroids.Images.arrowKeys = document.createElement('img');
  Asteroids.Images.arrowKeys.src = './images/arrow-keys.png';

  Asteroids.Images.spaceBar = document.createElement('img');
  Asteroids.Images.spaceBar.src = './images/space-bar.png';
})();
