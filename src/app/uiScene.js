let highScoreText;
let pauseText;
let scoreText;

export default {

  key: 'ui',

  plugins: [ 'InputPlugin' ],

  create: function () {

    scoreText = this.add.text(420, 0, '', {
      fontSize: 32,
      fontFamily: 'sans-serif',
      fill: 'white'
    });

    highScoreText = this.add.text(620, 0, '', {
      fontSize: 32,
      fontFamily: 'sans-serif',
      fill: 'white'
    });

    pauseText = this.add.text(400, 300, 'PAUSED', {
      fontSize: 48,
      fontFamily: 'sans-serif',
      fill: 'white'
    })
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    this.registry.events
      .on('changedata-score', this.onScoreChange, this)
      .on('changedata-highScore', this.onHighScoreChange, this);

    this.scene.get('play').events
      .on('pause', this.showPauseText, this)
      .on('resume', this.hidePauseText, this)
      .on('shutdown', this.hidePauseText, this);

    this.input.keyboard
      .on('keydown-SPACE', this.togglePause, this)
      .on('keydown-R', this.restartPlay, this)
      .on('keydown-Q', this.quitPlay, this)
      .on('keydown-Z', this.toggleZoom, this);
  },

  extend: {

    hidePauseText: function () {
      pauseText.setVisible(false);
    },

    onHighScoreChange: function (parent, value) {
      highScoreText.setText(`High: ${value}`);
    },

    onScoreChange: function (parent, value) {
      scoreText.setText(`Score: ${value}`);

      if (value > this.registry.get('highScore')) {
        this.registry.set('highScore', value);
      }
    },

    quitPlay: function () {
      this.scene
        .stop('play')
        .run('menu');
      
      // Don't sleep a scene that hasn't started!
      if (this.scene.isActive('end')) {
        this.scene.sleep('end');
      }
    },

    restartPlay: function () {
      this.scene.launch('play');

      // Don't sleep a scene that hasn't started!
      if (this.scene.isActive('end')) {
        this.scene.sleep('end');
      }
    },

    showPauseText: function () {
      pauseText.setVisible(true);
    },

    togglePause: function () {
      if (this.scene.isActive('play')) {
        this.scene.pause('play');
      } else if (this.scene.isPaused('play')) {
        this.scene.resume('play');
      }
    },

    toggleZoom: function () {
      let camera = this.scene.get('play').cameras.main;

      camera.setZoom(camera.zoom === 2 ? 1 : 2);
    }

  }

};
