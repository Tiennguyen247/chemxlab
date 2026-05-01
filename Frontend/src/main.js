import Phaser from "./lib/phaser.js";
<<<<<<< Updated upstream
import MainMenu from "./scenes/mainMenu.js";
=======
import MainMenu from "./scenes/MainMenu.js";
import HocTapScene from "./scenes/HocTapScene.js";
>>>>>>> Stashed changes
console.dir(Phaser);
export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 640,
<<<<<<< Updated upstream
  scene: MainMenu,
=======
  scene: [MainMenu, HocTapScene],
>>>>>>> Stashed changes
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
});
