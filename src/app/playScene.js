import Phaser from 'phaser';

let bombs;
let coins;
let crevasse;
let cursors;
let platforms;
let player;

const SECOND = 1000;
const TINT_RED = 0xff0000;
const { DESTROY, PAUSE, RESUME, SHUTDOWN } = Phaser.Scenes.Events;

export default {

  key: 'play',

  cameras: [
    { bounds: { x: 0, y: 0, width: 1200, height: 600 } }
  ],

  physics: {
    arcade: {
      debug: false,
      gravity: { y: 600 },
      height: 600,
      width: 1200
    }
  },

  plugins: ['Clock', 'InputPlugin'],

  init: function () {
    this.registry.set('score', 0);
    this.events
      .on(PAUSE, this.dim, this)
      .on(RESUME, this.undim, this)
      .on(DESTROY, this.destroy, this)
      .once(SHUTDOWN, this.shutdown, this);
  },

  create: function () {
    this.physics.world.checkCollision.down = false;

    crevasse = this.add.zone(600, 1200, 1200, 600);
    this.physics.world.enable(crevasse, Phaser.Physics.Arcade.STATIC_BODY);

    this.add.image(400, 300, 'cavern2')
      .setScrollFactor(0, 0);

    platforms = this.physics.add.staticGroup({
      defaultKey: 'platform'
    });

    const { Between } = Phaser.Math;

    // The ledges
    platforms.create(100 + Between(-50, 50), 256);
    platforms.create(600 + Between(-50, 50), 400);
    platforms.create(750 + Between(-50, 50), 224);
    platforms.create(1250 + Between(-50, 50), 320);
    platforms.create(300, 584);
    platforms.create(900, 584);

    player = this.physics.add.sprite(100 * Between(2, 10), 0, 'dude')
      .setSize(16, 32, false)
      .setOffset(8, 16)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);

    // Some coins to collect
    coins = this.physics.add.group({
      key: 'coin',
      frameQuantity: 18,
      setXY: { x: 12, y: 0, stepX: 70 },
      collideWorldBounds: true
    });

    coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });

    coins.playAnimation('coinSpin');

    bombs = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      defaultKey: 'bomb',
      maxSize: 10
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, bombs, this.hitBomb, null, this);
    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.overlap(crevasse, bombs, this.lostBomb, null, this);
    this.physics.add.overlap(crevasse, player, this.gameOver, null, this);

    this.time.addEvent({
      delay: 3 * SECOND,
      loop: true,
      callback: this.dropBomb,
      callbackScope: this
    });

    cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    if (this.physics.world.isPaused) {
      // Game Over. :(

      return;
    }

    const { blocked } = player.body;

    if (cursors.left.isDown && !blocked.left) {
      player.setVelocityX(-180);
      player.play('left', true);
    } else if (cursors.right.isDown && !blocked.right) {
      player.setVelocityX(180);
      player.play('right', true);
    } else {
      player.setVelocityX(0);
      player.play('turn');
    }

    if (cursors.up.isDown && blocked.down && !blocked.up) {
      player.setVelocityY(-480);
    }
  },

  extend: {

    addBomb: function (x, y) {
      const bomb = bombs.get(x, y, 'bomb');

      if (!bomb) {
        // At max.

        return;
      }

      bomb.enableBody(true, x, y, true, true);
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setMaxVelocity(600);
      bomb.setVelocity(Phaser.Utils.Array.GetRandom([-180, -90, 0, 90, 180]), 30);
      bomb.setAngularVelocity(360);
    },

    clear: function () {
      bombs = null;
      coins = null;
      crevasse = null;
      cursors = null;
      platforms = null;
      player = null;
    },

    destroy: function () {
      this.clear();
    },

    collectCoin: function (player, coin) {
      coin.disableBody(true, true);

      this.registry.values.score += 10;

      if (coins.countActive(true) === 0) {
        this.nextRound();
      }
    },

    dim: function () {
      this.cameras.main.setAlpha(0.5);
    },

    dropBomb: function () {
      let x = Phaser.Math.Between(0, 600);

      if (player.x < 600) x += 600;

      this.addBomb(x, 16);
    },

    gameOver: function () {
      this.scene
        .stop()
        .run('end');
    },

    hitBomb: function (player, bomb) {
      player.anims.pause();
      player.setTintFill(TINT_RED);
      bomb.setTintFill(TINT_RED);
      this.physics.pause();
      this.cameras.main.flash(0.2 * SECOND, 255, 0, 0);
      this.time.delayedCall(1 * SECOND, this.gameOver, null, this);
    },

    lostBomb: function (crevasse, bomb) {
      bomb.disableBody(true, true);
    },

    nextRound: function () {
      coins.children.iterate(function (coin) {
        coin.enableBody(true, coin.x, 0, true, true);
      });
    },

    shutdown: function () {
      this.clear();

      this.events
        .off(PAUSE, this.dim, this)
        .off(RESUME, this.undim, this)
        .off(DESTROY, this.destroy, this);
    },

    undim: function () {
      this.cameras.main.setAlpha(1);
    }

  }

};
