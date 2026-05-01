import Phaser from "../lib/phaser.js";

=======

class chat {
  constructor(id, mot, hai, ba) {
    this.id = id;
    this.mot = mot;
    this.hai = hai;
    this.ba = ba;
  }
}

class glass {
  constructor(image, dungtich, chat) {
    this.image = image;
    this.dungtich = dungtich;
    this.chat = chat;
  }
  set setImage(image) {
    this.image = image;
  }
  get getImage() {
    return this.image;
  }
}

=======

export default class MainMenu extends Phaser.Scene {
  /**@type{Phaser.Physics.Arcade.Sprite} */
  tudobtn;
  luyentapbtn;
  hoctapbtn;
  constructor() {
    super("mainMenu");
  }

  constructor() {
    super("mainMenu");
  }

=======
  preload() {
    this.load.image("rabbit", "assets/mm.jpg");
    this.load.image("tudo", "assets/tudobtn.png");
    this.load.image("luyentap", "assets/luyentapbtn.png");
    this.load.image("hoctap", "assets/hoctapbtn.png");

  }
  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const simg = this.add.image(0, 0, "rabbit").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);
    this.tudobtn = this.add.image(410, 330, "tudo").setScale(0.65, 0.6);
    this.luyentapbtn = this.add.image(410, 250, "luyentap").setScale(0.65, 0.6);
    this.hoctapbtn = this.add.image(410, 180, "hoctap").setScale(0.65, 0.6);
    this.tudobtn.setInteractive({ draggable: true, cursor: "pointer" });
    this.hoctapbtn.setInteractive({ draggable: true, cursor: "pointer" });
    this.luyentapbtn.setInteractive({ draggable: true, cursor: "pointer" });
    this.input.on("drag", (pointer, gameob, x, y) => {
      gameob.setPosition(x, y);
    });
    this.tudobtn.on("pointerup", (pointer) => {
      onClick();
    });
    this.luyentapbtn.on("pointerup", (pointer) => {
      onClick();
    });
    this.hoctapbtn.on("pointerup", (pointer) => {
      onClick();
    });
  }
  update() {}
  isStart() {
    this.input.on("mouseUp");
  }

  goPlay() {
    this.scene.start("game");
  }
}
function onClick() {
  console.log("Lam gi do");
=======
=======
    this.load.image("3_gach", "assets/UI/3_gach.png");
  }

  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const simg = this.add.image(0, 0, "rabbit").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);
    this.add
      .text(centerX, 150, "ChemLab", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "45px",
        fontStyle: "bold",
        color: "#000000",
      })
      .setOrigin(0.5);
    this.hoctapbtn = this.add.image(centerX, 220, "hoctap").setScale(0.65, 0.6);
    this.luyentapbtn = this.add
      .image(centerX, 290, "luyentap")
      .setScale(0.65, 0.6);
    this.tudobtn = this.add.image(centerX, 360, "tudo").setScale(0.65, 0.6);
    setButtonEffect(this, this.tudobtn);
    setButtonEffect(this, this.hoctapbtn);
    setButtonEffect(this, this.luyentapbtn);
    this.add
      .image(0, 0, "3_gach")
      .setOrigin(0)
      .setScale(0.15)
      .setInteractive({ cursor: "pointer" });
    this.add.container();
    this.tudobtn.on("pointerup", (pointer) => {
      console.log("ads");
    });
    this.luyentapbtn.on("pointerup", (pointer) => {
      console.log("ads");
    });
    this.hoctapbtn.on("pointerup", (pointer) => {
      this.scene.start("HocTapScene");
    });
  }

  update() {}
}
function setButtonEffect(scene, btn) {
  btn.setInteractive({ cursor: "pointer" });

  btn.on("pointerdown", () => {
    scene.tweens.add({
      targets: btn,
      scaleX: 0.5,
      scaleY: 0.45,
      duration: 100,
      ease: "Power1",
    });
  });
  btn.on("pointerup", () => {
    scene.tweens.add({
      targets: btn,
      scaleX: 0.65,
      scaleY: 0.6,
      duration: 100,
      ease: "Power1",
    });
  });

=======
}
