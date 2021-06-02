import Phaser from 'phaser';
import animations from './animations';
import assets from './assets';
import pack from './pack';

export default {

  key: 'boot',

  pack: {
    files: [
      { key: 'logo', type: 'image', url: assets.phaser }
    ]
  },

  plugins: ['Loader'],

  init: function () {
    this.registry
      .set('highScore', 0)
      .set('score', 0);

    const bg = this.add.image(400, 300, 'logo')
      .setAlpha(0.4)
      .setBlendMode(Phaser.BlendModes.LUMINOSITY);

    const logo = this.add.image(bg.x, bg.y, 'logo')
      .setVisible(false);

    this.load.on('start', function () {
      logo.setVisible(true);
    });

    this.load.on('progress', function (progress) {
      logo.setCrop(0, 0, progress * logo.width, logo.height);
    });

    // Log scene events to console
    this.sys.game.plugins.get('SceneWatcherPlugin').watchAll();
  },

  preload: function () {
    this.load.pack('pack', pack);
  },

  create: function () {
    this.anims.fromJSON(animations);
    this.scene
      .launch('menu')
      .launch('ui')
      .remove();
  }

};
