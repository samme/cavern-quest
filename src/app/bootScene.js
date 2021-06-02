import Phaser from 'phaser';
import animations from './animations';
import assets from '../assets/*.png';

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
    }, this);

    this.load.on('progress', function (progress) {
      logo.setCrop(
        0,
        0,
        progress * logo.width,
        logo.height
      );
    }, this);

    // Log scene events to console
    this.sys.game.plugins.get('SceneWatcherPlugin').watchAll();
  },

  preload: function () {
    this.load
      .image('bomb', assets.bomb)
      .image('cavern2', assets.cavern2)
      .image('fire', assets.fire)
      .image('platform', assets.platform)
      .spritesheet('coin', assets['coin-16x16x4'], { frameWidth: 16, frameHeight: 16 })
      .spritesheet('dude', assets.dude, { frameWidth: 32, frameHeight: 48 })
      .spritesheet('gem', assets['gem-blue-16x16x4'], { frameWidth: 16, frameHeight: 16 })
      .spritesheet('explosion', assets.explosion, { frameWidth: 64, frameHeight: 64, endFrame: 23 });
  },

  create: function () {
    this.anims.fromJSON(animations);
    this.scene
      .launch('menu')
      .launch('ui')
      .remove();
  }

};
