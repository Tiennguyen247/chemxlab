import Phaser from "./lib/phaser.js";
import MainMenu from "./scenes/mainMenu.js";
import HocTapScene from "./scenes/HocTapScene.js";
console.dir(Phaser);
export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  scene: [MainMenu, HocTapScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
});
