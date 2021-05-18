export default {

  key: 'menu',

  plugins: ['InputPlugin'],

  create: function () {
    this.add.sprite(400, 300, 'cavern2');

    this.add.image(400, 150, 'gem')
      .setScale(5);

    this.add.text(400, 300, 'Cavern Quest\n\n  play →', {
      align: 'center',
      fill: '#EECB0A',
      fontFamily: 'sans-serif',
      fontSize: 48,
      fontWeight: 'bold'
    })
      .setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('play');
    }, this);
  }

};
