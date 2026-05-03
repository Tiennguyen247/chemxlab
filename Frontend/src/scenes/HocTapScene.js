import Phaser from "../lib/phaser.js";

export default class HocTapScene extends Phaser.Scene {
  constructor() {
    super("HocTapScene");
    this.reactionsData = [];
    this.equationTextObjects = [];
  }

  preload() {
    this.load.image("lab", "assets/lab.png");
    this.load.image("menuBtn", "assets/menubtn.png");
    this.load.image("menuBoard", "assets/board.png");
    this.load.image("btnTrangChu", "assets/backbtn.png");
    this.load.image("btnCaiDat", "assets/caidatbtn.png");
    this.load.image("btnPhuongTrinh", "assets/phtrinhbtn.png");
    this.load.image("bth", "assets/12345.jpg");
    this.load.image("iconBangTH", "assets/mobangth.png");
  }

  async create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const centerY = cameraheight / 2;

    await this.fetchReactions();

    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);

    this.txtLabBoardEquation = this.add
      .text(centerX, centerY - 100, "", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "40px",
        fontStyle: "bold",
        color: "#000000",
      })
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

    this.txtDescription = this.add
      .text(centerX, centerY - 40, "", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "22px",
        fontStyle: "italic",
        color: "#333333",
        align: "center",
        wordWrap: { width: 700 } 
      })
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

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

    this.btnTrangChu = this.add.image(centerX - 90, centerY - 75, "btnTrangChu").setDepth(12).setScale(0.2).setVisible(false).setInteractive({ cursor: "pointer" });
    this.txtTrangChu = this.add.text(centerX - 20, centerY - 75, "TRANG CHỦ", btnTextStyle).setOrigin(0, 0.5).setDepth(12).setVisible(false);

    this.btnCaiDat = this.add.image(centerX - 90, centerY + 5, "btnCaiDat").setDepth(12).setScale(0.2).setVisible(false).setInteractive({ cursor: "pointer" });
    this.txtCaiDat = this.add.text(centerX - 20, centerY + 5, "CÀI ĐẶT", btnTextStyle).setOrigin(0, 0.5).setDepth(12).setVisible(false);

    this.btnPhuongTrinh = this.add.image(centerX - 90, centerY + 85, "btnPhuongTrinh").setDepth(12).setScale(0.2).setVisible(false).setInteractive({ cursor: "pointer" });
    this.txtPhuongTrinh = this.add.text(centerX - 20, centerY + 85, "PHƯƠNG\nTRÌNH", btnTextStyle).setOrigin(0, 0.5).setDepth(12).setVisible(false);

    this.menuIcon.on("pointerup", () => this.showPauseMenu(true));
    this.overlay.on("pointerup", () => this.showPauseMenu(false));

    const goHome = () => this.scene.start("mainMenu");
    this.btnTrangChu.on("pointerup", goHome);
    this.txtTrangChu.setInteractive({ cursor: "pointer" }).on("pointerup", goHome);

    const showEquationsMenu = () => {
      this.toggleMainMenuButtons(false);
      this.txtMenuTitle.setText("Chọn Phương Trình");
      this.displayReactionList();
    };
    this.btnPhuongTrinh.on("pointerup", showEquationsMenu);
    this.txtPhuongTrinh.setInteractive({ cursor: "pointer" }).on("pointerup", showEquationsMenu);

    this.setupPeriodicTable(centerX, centerY, camerawidth, cameraheight, btnTextStyle);
  }

  async fetchReactions() {
    try {
      const response = await fetch('http://localhost:8080/api/reactions');
      this.reactionsData = await response.json();
      console.log("Dữ liệu tải thành công:", this.reactionsData);
    } catch (error) {
      console.error("Lỗi khi kết nối server:", error);
      this.reactionsData = [{ id: 0, content: "Lỗi kết nối Server", description: "Vui lòng kiểm tra lại Backend" }];
    }
  }

  displayReactionList() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const style = { fontFamily: "Comic Sans MS", fontSize: "20px", color: "#000000", fontStyle: "bold" };

    this.equationTextObjects.forEach(obj => obj.destroy());
    this.equationTextObjects = [];

    this.reactionsData.forEach((data, index) => {
      const txt = this.add.text(centerX, centerY - 50 + (index * 40), data.content, style)
        .setOrigin(0.5)
        .setDepth(12)
        .setInteractive({ cursor: "pointer" });

      txt.on("pointerup", () => {
        this.txtLabBoardEquation.setText(data.content).setVisible(true);
        if (data.description) {
            this.txtDescription.setText(data.description).setVisible(true);
        }
        this.showPauseMenu(false);
      });

      this.equationTextObjects.push(txt);
    });
  }

  toggleMainMenuButtons(isVisible) {
    this.btnTrangChu.setVisible(isVisible);
    this.txtTrangChu.setVisible(isVisible);
    this.btnCaiDat.setVisible(isVisible);
    this.txtCaiDat.setVisible(isVisible);
    this.btnPhuongTrinh.setVisible(isVisible);
    this.txtPhuongTrinh.setVisible(isVisible);
  }

  showPauseMenu(isVisible) {
    this.overlay.setVisible(isVisible);
    this.menuBoard.setVisible(isVisible);
    this.txtMenuTitle.setVisible(isVisible);

    if (isVisible) {
      this.txtMenuTitle.setText("Menu");
      this.toggleMainMenuButtons(true);
      this.equationTextObjects.forEach(obj => obj.setVisible(false));
      this.txtDescription.setVisible(false);
    } else {
      this.toggleMainMenuButtons(false);
      this.equationTextObjects.forEach(obj => obj.setVisible(false));
    }
  }

  setupPeriodicTable(centerX, centerY, camerawidth, cameraheight, btnTextStyle) {
    this.overlay2 = this.add.rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6).setOrigin(0).setDepth(10).setVisible(false);
    this.periodicTable = this.add.image(centerX, centerY, "bth").setVisible(false).setDepth(11);
    this.periodicTable.setScale(camerawidth / this.periodicTable.width / 1.1, cameraheight / this.periodicTable.height / 1.1);
    
    let isTableOpen = false;
    
    this.periodicTableBtn = this.add.image(camerawidth - 20, 20, "iconBangTH")
      .setOrigin(1, 0) 
      .setDepth(12)
      .setScale(0.15) 
      .setInteractive({ cursor: "pointer" });

    this.periodicTableBtn.on("pointerup", () => {
      isTableOpen = !isTableOpen;
      this.overlay2.setVisible(isTableOpen);
      this.periodicTable.setVisible(isTableOpen);
    });
  }
}