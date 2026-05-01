import Phaser from "../lib/phaser.js";

export default class HocTapScene extends Phaser.Scene {
  constructor() {
    super("HocTapScene");
  }

  preload() {
    this.load.image("lab", "assets/lab.png");
    this.load.image("menuBtn", "assets/menubtn.png");
    this.load.image("menuBoard", "assets/board.png");
    this.load.image("btnTrangChu", "assets/backbtn.png");
    this.load.image("btnCaiDat", "assets/caidatbtn.png");
    this.load.image("btnPhuongTrinh", "assets/phtrinhbtn.png");
    this.load.image("bth", "assets/bth.png");
  }

  create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const centerY = cameraheight / 2;
    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);

    this.overlay = this.add
      .rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6)
      .setOrigin(0)
      .setDepth(10)
      .setVisible(false)
      .setInteractive();

    this.menuIcon = this.add
      .image(20, 20, "menuBtn")
      .setOrigin(0)
      .setDepth(5)
      .setScale(0.15)
      .setInteractive({ cursor: "pointer" });

    this.menuBoard = this.add
      .image(centerX, centerY, "menuBoard")
      .setDepth(11)
      .setScale(0.65)
      .setVisible(false);

    this.txtMenuTitle = this.add
      .text(centerX, centerY - 140, "Menu", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "45px",
        fontStyle: "bold",
        color: "#000000",
      })
      .setOrigin(0.5)
      .setDepth(12)
      .setVisible(false);

    const btnTextStyle = {
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#000000",
      align: "left",
    };

    this.btnTrangChu = this.add
      .image(centerX - 90, centerY - 75, "btnTrangChu")
      .setDepth(12)
      .setScale(0.2)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.txtTrangChu = this.add
      .text(centerX - 20, centerY - 75, "TRANG CHỦ", btnTextStyle)
      .setOrigin(0, 0.5)
      .setDepth(12)
      .setVisible(false);

    this.btnCaiDat = this.add
      .image(centerX - 90, centerY + 5, "btnCaiDat")
      .setDepth(12)
      .setScale(0.2)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.txtCaiDat = this.add
      .text(centerX - 20, centerY + 5, "CÀI ĐẶT", btnTextStyle)
      .setOrigin(0, 0.5)
      .setDepth(12)
      .setVisible(false);

    this.btnPhuongTrinh = this.add
      .image(centerX - 90, centerY + 85, "btnPhuongTrinh")
      .setDepth(12)
      .setScale(0.2)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.txtPhuongTrinh = this.add
      .text(centerX - 20, centerY + 85, "PHƯƠNG\nTRÌNH", btnTextStyle)
      .setOrigin(0, 0.5)
      .setDepth(12)
      .setVisible(false);

    this.menuIcon.on("pointerup", () => {
      this.showPauseMenu(true);
    });

    this.overlay.on("pointerup", () => {
      this.showPauseMenu(false);
    });

    const goHome = () => this.scene.start("mainMenu");
    this.btnTrangChu.on("pointerup", goHome);
    this.txtTrangChu
      .setInteractive({ cursor: "pointer" })
      .on("pointerup", goHome);

    this.overlay2 = this.add
      .rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6)
      .setOrigin(0)
      .setDepth(10)
      .setVisible(false);

    let isTableOpen = false;
    this.periodicTable = this.add
      .image(centerX, centerY, "bth")
      .setVisible(false)
      .setDepth(11);
    this.periodicTableBtn = this.add
      .text(camerawidth, 0, "Mở Bảng", btnTextStyle)
      .setOrigin(1, 0)
      .setDepth(12)
      .setInteractive({ cursor: "pointer" });
    this.periodicTableBtn.on("pointerup", () => {
      if (!isTableOpen) {
        this.showPeriodicTable(true);
        isTableOpen = true;
        this.periodicTableBtn.setText("Đóng Bảng");
      } else {
        this.showPeriodicTable(false);
        isTableOpen = false;
        this.periodicTableBtn.setText("Mở Bảng");
      }
    });
  }
  showPeriodicTable(isVisible) {
    this.overlay2.setVisible(isVisible);
    this.periodicTable.setVisible(isVisible);
  }
  showPauseMenu(isVisible) {
    this.overlay.setVisible(isVisible);
    this.menuBoard.setVisible(isVisible);
    this.txtMenuTitle.setVisible(isVisible);

    this.btnTrangChu.setVisible(isVisible);
    this.txtTrangChu.setVisible(isVisible);

    this.btnCaiDat.setVisible(isVisible);
    this.txtCaiDat.setVisible(isVisible);

    this.btnPhuongTrinh.setVisible(isVisible);
    this.txtPhuongTrinh.setVisible(isVisible);
  }
}
