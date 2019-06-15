export default {

  key: 'end',

  plugins: [ 'InputPlugin' ],

  create: function () {
    this.add.image(400, 300, 'fire');

    this.add.image(400, 150, 'bomb')
      .setScale(5);

    this.add.text(400, 300, 'Game Over\n\n← menu  ', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48,
      fontWeight: 'bold'
    })
      .setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('menu');
    }, this);
  }

};
