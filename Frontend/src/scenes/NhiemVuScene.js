import Phaser from "../lib/phaser.js";

export default class NhiemVuScene extends Phaser.Scene {
  constructor() {
    super("NhiemVuScene");
  }

  preload() {
    this.load.image("lab", "assets/lab.png");
    this.load.image("menuBtn", "assets/menubtn.png");
    this.load.image("menuBoard", "assets/board.png");
    this.load.image("btnTrangChu", "assets/backbtn.png");
    this.load.image("btnCaiDat", "assets/caidatbtn.png");
    this.load.image("bth", "assets/12345.jpg");
    this.load.image("iconBangTH", "assets/mobangth.png");
    this.load.image("iconLock", "assets/lock.png"); 
  }

  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const centerY = cameraheight / 2;

    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);
    
    this.levelOverlay = this.add.rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.8)
      .setOrigin(0).setDepth(20).setInteractive(); 

    this.levelBoard = this.add.image(centerX, centerY, "menuBoard")
      .setDepth(21).setScale(0.9); 

    this.txtLevelTitle = this.add.text(centerX, centerY - 140, "Chọn Độ Khó", {
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      fontSize: "45px", fontStyle: "bold", color: "#000000"
    }).setOrigin(0.5).setDepth(22);

    const levelStyle = { fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: "30px", fontStyle: "bold", color: "#000000" };
    const lockedStyle = { fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: "30px", fontStyle: "bold", color: "#888888" };

    this.btnDe = this.add.text(centerX, centerY - 40, "1. Mức độ: Dễ", levelStyle)
      .setOrigin(0.5).setDepth(22).setInteractive({ cursor: "pointer" });

    this.btnTrungBinh = this.add.text(centerX, centerY + 30, "2. Mức độ: Trung bình", lockedStyle)
      .setOrigin(0.5).setDepth(22);
      
    this.lockTB = this.add.image(centerX + 200, centerY + 30, "iconLock")
      .setDepth(22).setScale(0.1); 

    this.btnKho = this.add.text(centerX, centerY + 100, "3. Mức độ: Khó", lockedStyle)
      .setOrigin(0.5).setDepth(22);
      
    this.lockKho = this.add.image(centerX + 150, centerY + 100, "iconLock")
      .setDepth(22).setScale(0.1);

    this.btnDe.on("pointerup", () => {
        this.levelOverlay.setVisible(false);
        this.levelBoard.setVisible(false);
        this.txtLevelTitle.setVisible(false);
        this.btnDe.setVisible(false);
        this.btnTrungBinh.setVisible(false);
        this.btnKho.setVisible(false);
        this.lockTB.setVisible(false);
        this.lockKho.setVisible(false);
    });

 
    
    this.overlay = this.add.rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6)
      .setOrigin(0).setDepth(10).setVisible(false).setInteractive();

    this.menuIcon = this.add.image(20, 20, "menuBtn")
      .setOrigin(0).setDepth(5).setScale(0.15).setInteractive({ cursor: "pointer" });

    this.menuBoard = this.add.image(centerX, centerY, "menuBoard")
      .setDepth(11).setScale(0.65).setVisible(false);

    this.txtMenuTitle = this.add.text(centerX, centerY - 140, "Menu", {
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      fontSize: "45px", fontStyle: "bold", color: "#000000"
    }).setOrigin(0.5).setDepth(12).setVisible(false);

    const btnTextStyle = { fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: "22px", fontStyle: "bold", color: "#000000", align: "left" };

    this.btnTrangChu = this.add.image(centerX - 90, centerY - 40, "btnTrangChu")
      .setDepth(12).setScale(0.2).setVisible(false).setInteractive({ cursor: "pointer" });
    this.txtTrangChu = this.add.text(centerX - 20, centerY - 40, "TRANG CHỦ", btnTextStyle)
      .setOrigin(0, 0.5).setDepth(12).setVisible(false);

    this.btnCaiDat = this.add.image(centerX - 90, centerY + 40, "btnCaiDat")
      .setDepth(12).setScale(0.2).setVisible(false).setInteractive({ cursor: "pointer" });
    this.txtCaiDat = this.add.text(centerX - 20, centerY + 40, "CÀI ĐẶT", btnTextStyle)
      .setOrigin(0, 0.5).setDepth(12).setVisible(false);

    this.menuIcon.on("pointerup", () => this.showPauseMenu(true));
    this.overlay.on("pointerup", () => this.showPauseMenu(false));

    const goHome = () => this.scene.start("mainMenu");
    this.btnTrangChu.on("pointerup", goHome);
    this.txtTrangChu.setInteractive({ cursor: "pointer" }).on("pointerup", goHome);

    this.setupPeriodicTable(centerX, centerY, camerawidth, cameraheight);
  }

  showPauseMenu(isVisible) {
    this.overlay.setVisible(isVisible);
    this.menuBoard.setVisible(isVisible);
    this.txtMenuTitle.setVisible(isVisible);
    this.btnTrangChu.setVisible(isVisible);
    this.txtTrangChu.setVisible(isVisible);
    this.btnCaiDat.setVisible(isVisible);
    this.txtCaiDat.setVisible(isVisible);
  }

  setupPeriodicTable(centerX, centerY, camerawidth, cameraheight) {
    this.overlay2 = this.add.rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6)
      .setOrigin(0).setDepth(10).setVisible(false);
    this.periodicTable = this.add.image(centerX, centerY, "bth")
      .setVisible(false).setDepth(11);
    this.periodicTable.setScale(camerawidth / this.periodicTable.width / 1.1, cameraheight / this.periodicTable.height / 1.1);
    
    let isTableOpen = false;
    
    this.periodicTableBtn = this.add.image(camerawidth - 20, 20, "iconBangTH")
      .setOrigin(1, 0).setDepth(12).setScale(0.15).setInteractive({ cursor: "pointer" });

    this.periodicTableBtn.on("pointerup", () => {
      isTableOpen = !isTableOpen;
      this.overlay2.setVisible(isTableOpen);
      this.periodicTable.setVisible(isTableOpen);
    });
  }
}