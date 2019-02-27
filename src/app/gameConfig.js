import bootScene from './bootScene';
import endScene from './endScene';
import menuScene from './menuScene';
import playScene from './playScene';
import uiScene from './uiScene';
import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';
import colors from 'colors.css';

export default {
  // type: Phaser.CANVAS,
  width: 800,
  height: 600,
  pixelArt: true,
  audio: { noAudio: true },
  title: 'Phaser Scenes Tutorial 💰',
  url: 'https://github.com/samme/cavern-quest',
  banner: { text: 'white', background: [ '#141B24', '#141B24', '#131419', '#131215', '#141012' ] },
  scene: [ bootScene, menuScene, playScene, endScene, uiScene ],
  plugins: {
    global: [
      { key: 'SceneWatcherPlugin', plugin: SceneWatcherPlugin, start: true }
    ]
  }
};
