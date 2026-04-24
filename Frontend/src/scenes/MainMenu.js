import Phaser from "../lib/phaser.js";

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

export default class MainMenu extends Phaser.Scene {
  /**@type{Phaser.Physics.Arcade.Sprite} */
  tudobtn;
  luyentapbtn;
  hoctapbtn;
  
  constructor() {
    super("mainMenu");
  }

  preload() {
    this.load.image("rabbit", "assets/mm.jpg");
    this.load.image("tudo", "assets/tudobtn.png");
    this.load.image("luyentap", "assets/luyentapbtn.png"); 
    this.load.image("hoctap", "assets/hoctapbtn.png");
  }

  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const simg = this.add.image(0, 0, "rabbit").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);
    this.add.text(centerX, 150, 'ChemLab', {
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      fontSize: '45px', 
      fontStyle: 'bold',
      color: '#000000'
    }).setOrigin(0.5);
    this.hoctapbtn = this.add.image(centerX, 220, "hoctap").setScale(0.65, 0.6);
    this.luyentapbtn = this.add.image(centerX, 290, "luyentap").setScale(0.65, 0.6); 
    this.tudobtn = this.add.image(centerX, 360, "tudo").setScale(0.65, 0.6);
    

    this.input.on("drag", (pointer, gameob, x, y) => {
      gameob.setPosition(x, y);
      console.log(`X: ${x}, Y: ${y}`);
    });

    this.tudobtn.on("pointerup", (pointer) => {
      onClick();
    });
    this.luyentapbtn.on("pointerup", (pointer) => {
      onClick();
    });
    this.hoctapbtn.on("pointerup", (pointer) => {
      this.scene.start("HocTapScene");
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
}