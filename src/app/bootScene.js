import Phaser from 'phaser';
import animations from './animations';

export default {

  key: 'boot',

  pack: {
    files: [
      { key: 'logo', type: 'image', url: require('../assets/phaser.png') }
    ]
  },

  plugins: [ 'Loader' ],

  init: function () {
    this.registry
      .set('highScore', 0)
      .set('score', 0);

    var bg = this.add.image(400, 300, 'logo')
      .setAlpha(0.4)
      .setBlendMode(Phaser.BlendModes.LUMINOSITY);

    var logo = this.add.image(bg.x, bg.y, 'logo')
      .setVisible(false);

    var rect = new Phaser.Geom.Rectangle(0, 0, logo.width, logo.height);

    this.load.on('start', function () {
      logo.setVisible(true);
    }, this);

    this.load.on('progress', function (progress) {
      logo.setCrop(
        rect.x,
        rect.y,
        progress * rect.width,
        rect.height
      );
    }, this);

    // Log scene events to console
    this.sys.game.plugins.get('SceneWatcherPlugin').watchAll();
  },

  preload: function () {
    this.load
      .image('bomb', require('../assets/bomb.png'))
      .image('cavern2', require('../assets/cavern2.png'))
      .image('fire', require('../assets/fire.png'))
      .image('platform', require('../assets/platform.png'))
      .spritesheet('coin', require('../assets/coin-16x16x4.png'), { frameWidth: 16, frameHeight: 16 })
      .spritesheet('dude', require('../assets/dude.png'), { frameWidth: 32, frameHeight: 48 })
      .spritesheet('gem', require('../assets/gem-blue-16x16x4.png'), { frameWidth: 16, frameHeight: 16 });
  },

  create: function () {
    this.anims.fromJSON(animations);
  },

  update: function () {
    this.scene
      .launch('menu')
      .launch('ui')
      .remove();
  }

};

