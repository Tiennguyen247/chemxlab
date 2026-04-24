import Phaser from "../lib/phaser.js";

export default class HocTapScene extends Phaser.Scene {
  constructor() {
    super("HocTapScene"); 
  }

  preload() {
    this.load.image("lab", "assets/lab.png");
  }

  create() {
    this.add.image(400, 320, "lab");
  }
}


