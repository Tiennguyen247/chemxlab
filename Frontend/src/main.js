import Phaser from "./lib/phaser.js";
import MainMenu from "./scenes/MainMenu.js";
import HocTapScene from "./scenes/HocTapScene.js";
console.dir(Phaser);
export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1531,
  height: 768,
  scale: {
    // Chế độ FIT: Co giãn để vừa khít màn hình nhưng giữ nguyên tỉ lệ
    mode: Phaser.Scale.FIT,

    // Căn giữa game trên màn hình trình duyệt
    autoCenter: Phaser.Scale.CENTER_BOTH,

    // Tự động nhận diện khi thay đổi kích thước cửa sổ/xoay màn hình
    autoRound: true,
  },
  scene: [MainMenu, HocTapScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
});
