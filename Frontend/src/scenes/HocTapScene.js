import Phaser from "../lib/phaser.js";

const config = [{ x: 1, y: 2, id: 1 }];

const mockDatabase = [
  { id: 1, content: "HCl + NaOH → NaCl + H₂O" },
  { id: 2, content: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O" },
];

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
    this.load.image("bth", "assets/12345.jpg");
  }

  create() {
    this.input.on("pointerdown", (pointer) =>
      console.log("Tọa độ x: " + pointer.x, "\tTọa độ y:", pointer.y),
    );
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const centerY = cameraheight / 2;

    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);

    this.txtLabBoardEquation = this.add
      .text(centerX, centerY - 100, "", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "35px",
        fontStyle: "bold",
        color: "#000000",
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

    const equationStyle = {
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#000000",
      align: "center",
    };

    this.txtEq1 = this.add
      .text(centerX, centerY - 30, mockDatabase[0].content, equationStyle)
      .setOrigin(0.5)
      .setDepth(12)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.txtEq2 = this.add
      .text(centerX, centerY + 50, mockDatabase[1].content, equationStyle)
      .setOrigin(0.5)
      .setDepth(12)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

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

    const showEquationsMenu = () => {
      this.btnTrangChu.setVisible(false);
      this.txtTrangChu.setVisible(false);
      this.btnCaiDat.setVisible(false);
      this.txtCaiDat.setVisible(false);
      this.btnPhuongTrinh.setVisible(false);
      this.txtPhuongTrinh.setVisible(false);

      this.txtMenuTitle.setText("Chọn Phương Trình");
      this.txtEq1.setVisible(true);
      this.txtEq2.setVisible(true);
    };
    this.btnPhuongTrinh.on("pointerup", showEquationsMenu);
    this.txtPhuongTrinh
      .setInteractive({ cursor: "pointer" })
      .on("pointerup", showEquationsMenu);

    const selectEquation = (id) => {
      const data = mockDatabase.find((item) => item.id === id);
      if (data) {
        this.txtLabBoardEquation.setText(data.content).setVisible(true);
      }
      this.showPauseMenu(false);
    };
    this.txtEq1.on("pointerup", () => selectEquation(mockDatabase[0].id));
    this.txtEq2.on("pointerup", () => selectEquation(mockDatabase[1].id));

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
    this.periodicTable.setScale(
      camerawidth / this.periodicTable.width / 1.1,
      cameraheight / this.periodicTable.height / 1.1,
    );
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

    const addElementZone = (x, y, width, height, id) => {
      let zone = this.add
        .zone(x, y, width, height)
        .setInteractive({ cursor: "pointer" })
        .setData(id, `luc+${id}`);
      zone.on("pointerup", () => {
        console.log("da nhan vao zone co id: ", zone.getData(id));
      });
    };
  }

  showPeriodicTable(isVisible) {
    this.overlay2.setVisible(isVisible);
    this.periodicTable.setVisible(isVisible);
  }

  showPauseMenu(isVisible) {
    this.overlay.setVisible(isVisible);
    this.menuBoard.setVisible(isVisible);
    this.txtMenuTitle.setVisible(isVisible);

    if (isVisible) {
      this.txtMenuTitle.setText("Menu");
      this.btnTrangChu.setVisible(true);
      this.txtTrangChu.setVisible(true);
      this.btnCaiDat.setVisible(true);
      this.txtCaiDat.setVisible(true);
      this.btnPhuongTrinh.setVisible(true);
      this.txtPhuongTrinh.setVisible(true);

      this.txtEq1.setVisible(false);
      this.txtEq2.setVisible(false);
    } else {
      this.btnTrangChu.setVisible(false);
      this.txtTrangChu.setVisible(false);
      this.btnCaiDat.setVisible(false);
      this.txtCaiDat.setVisible(false);
      this.btnPhuongTrinh.setVisible(false);
      this.txtPhuongTrinh.setVisible(false);

      this.txtEq1.setVisible(false);
      this.txtEq2.setVisible(false);
    }
  }
}
