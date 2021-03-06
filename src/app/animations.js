export default {
  anims: [
    {
      key: 'left',
      type: 'frame',
      defaultTextureKey: 'dude',
      frames: [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { frame: 3 }],
      frameRate: 10,
      duration: 400,
      skipMissedFrames: true,
      delay: 0,
      repeat: -1,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: false,
      hideOnComplete: false
    },
    {
      key: 'turn',
      type: 'frame',
      defaultTextureKey: 'dude',
      frames: [{ frame: 4 }],
      frameRate: 20,
      duration: 50,
      skipMissedFrames: true,
      delay: 0,
      repeat: 0,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: false,
      hideOnComplete: false
    },
    {
      key: 'right',
      type: 'frame',
      defaultTextureKey: 'dude',
      frames: [{ frame: 5 }, { frame: 6 }, { frame: 7 }, { frame: 8 }],
      frameRate: 10,
      duration: 400,
      skipMissedFrames: true,
      delay: 0,
      repeat: -1,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: false,
      hideOnComplete: false
    },
    {
      key: 'coinSpin',
      type: 'frame',
      defaultTextureKey: 'coin',
      frames: [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { frame: 3 }],
      frameRate: 10,
      duration: 400,
      skipMissedFrames: true,
      delay: 0,
      repeat: -1,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: false,
      hideOnComplete: false
    },
    {
      key: 'gemSpin',
      type: 'frame',
      defaultTextureKey: 'gem',
      frames: [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { frame: 3 }],
      frameRate: 10,
      duration: 400,
      skipMissedFrames: true,
      delay: 0,
      repeat: -1,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: false,
      hideOnComplete: false
    },
    {
      key: 'explode',
      type: 'frame',
      defaultTextureKey: 'explosion',
      frames: [{ frame: 0 }, { frame: 1 }, { frame: 2 }, { frame: 3 }, { frame: 4 }, { frame: 5 }, { frame: 6 }, { frame: 7 }, { frame: 8 }, { frame: 9 }, { frame: 10 }, { frame: 11 }, { frame: 12 }, { frame: 13 }, { frame: 14 }, { frame: 15 }, { frame: 16 }, { frame: 17 }, { frame: 18 }, { frame: 19 }, { frame: 20 }, { frame: 21 }, { frame: 22 }, { frame: 23 }],
      frameRate: 20,
      duration: 1250,
      skipMissedFrames: true,
      delay: 0,
      repeat: 0,
      repeatDelay: 0,
      yoyo: false,
      showOnStart: true,
      hideOnComplete: true
    }
  ],
  globalTimeScale: 1
};
