import Phaser from "../lib/phaser.js";

export default class HocTapScene extends Phaser.Scene {
  constructor() {
    super("HocTapScene");
  }

  preload() {
    this.load.image("lab", "assets/lab.png");
  }

  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);
  }
}
