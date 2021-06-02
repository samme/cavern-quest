import assets from './assets';

export default {
  all: {
    files: [
      { key: 'bomb', type: 'image', url: assets.bomb },
      { key: 'cavern2', type: 'image', url: assets.cavern2 },
      { key: 'fire', type: 'image', url: assets.fire },
      { key: 'platform', type: 'image', url: assets.platform },
      { key: 'coin', type: 'spritesheet', url: assets['coin-16x16x4'], frameConfig: { frameWidth: 16, frameHeight: 16 } },
      { key: 'dude', type: 'spritesheet', url: assets.dude, frameConfig: { frameWidth: 32, frameHeight: 48 } },
      { key: 'gem', type: 'spritesheet', url: assets['gem-blue-16x16x4'], frameConfig: { frameWidth: 16, frameHeight: 16 } },
      { key: 'explosion', type: 'spritesheet', url: assets.explosion, frameConfig: { frameWidth: 64, frameHeight: 64, endFrame: 23 } }
    ]
  }
};
