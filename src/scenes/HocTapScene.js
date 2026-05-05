import Phaser from "../lib/phaser.js";

export default class HocTapScene extends Phaser.Scene {
  constructor() {
    super("HocTapScene");
    // Khởi tạo mảng rỗng để chứa dữ liệu từ database[cite: 1, 2]
    this.reactionsData = [];
    // Mảng quản lý các đối tượng text phương trình trong menu để tránh tạo trùng lặp[cite: 3]
    this.equationTextObjects = [];
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

  async create() {
    const camerawidth = this.cameras.main.width;
    const cameraheight = this.cameras.main.height;
    const centerX = camerawidth / 2;
    const centerY = cameraheight / 2;

    // --- 1. Tải dữ liệu từ API Backend ---[cite: 2]
    await this.fetchReactions();

    // --- 2. Khởi tạo Background & UI cơ bản ---[cite: 3, 5]
    const simg = this.add.image(0, 0, "lab").setOrigin(0, 0);
    simg.setScale(camerawidth / simg.width, cameraheight / simg.height);

    // Bảng hiển thị phương trình chính trên bảng trắng[cite: 3]
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

    // Dòng hiển thị mô tả phương trình ngay phía dưới[cite: 2, 3]
    this.txtDescription = this.add
      .text(centerX, centerY - 40, "", {
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        fontSize: "22px",
        fontStyle: "italic",
        color: "#333333",
        align: "center",
        wordWrap: { width: 700 } // Tự động xuống dòng nếu mô tả dài[cite: 3]
      })
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

    // Lớp phủ tối màn hình khi mở menu[cite: 3]
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

    // --- 3. Các nút chức năng trong Menu ---[cite: 3]
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

    // --- 4. Sự kiện Pointer ---[cite: 3]
    this.menuIcon.on("pointerup", () => this.showPauseMenu(true));
    this.overlay.on("pointerup", () => this.showPauseMenu(false));

    const goHome = () => this.scene.start("mainMenu");
    this.btnTrangChu.on("pointerup", goHome);
    this.txtTrangChu.setInteractive({ cursor: "pointer" }).on("pointerup", goHome);

    // Sự kiện khi nhấn nút PHƯƠNG TRÌNH để xem danh sách[cite: 3]
    const showEquationsMenu = () => {
      this.toggleMainMenuButtons(false);
      this.txtMenuTitle.setText("Chọn Phương Trình");
      this.displayReactionList();
    };
    this.btnPhuongTrinh.on("pointerup", showEquationsMenu);
    this.txtPhuongTrinh.setInteractive({ cursor: "pointer" }).on("pointerup", showEquationsMenu);

    this.setupPeriodicTable(centerX, centerY, camerawidth, cameraheight, btnTextStyle);
  }

  // Hàm Fetch dữ liệu thực từ API đã cấu hình CORS[cite: 2]
  async fetchReactions() {
    try {
        const response = await fetch('https://anguished-liberty-galley.ngrok-free.dev/api/reactions', {
            method: 'GET',
            headers: {
                // ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT ĐỂ CHẠY TRÊN TRÌNH DUYỆT
                'ngrok-skip-browser-warning': 'true', 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.reactionsData = await response.json();
        console.log("Dữ liệu tải thành công:", this.reactionsData);
    } catch (error) {
        console.error("Lỗi khi kết nối server:", error);
        this.reactionsData = [{ id: 0, content: "Lỗi kết nối Server", description: "Vui lòng kiểm tra lại" }];
    }
}

  // Vẽ danh sách phương trình vào menu[cite: 3]
  displayReactionList() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const style = { fontFamily: "Comic Sans MS", fontSize: "20px", color: "#000000", fontStyle: "bold" };

    // Xóa danh sách cũ để làm mới[cite: 3]
    this.equationTextObjects.forEach(obj => obj.destroy());
    this.equationTextObjects = [];

    this.reactionsData.forEach((data, index) => {
      const txt = this.add.text(centerX, centerY - 50 + (index * 40), data.content, style)
        .setOrigin(0.5)
        .setDepth(12)
        .setInteractive({ cursor: "pointer" });

      txt.on("pointerup", () => {
        // Cập nhật phương trình và mô tả lên bảng[cite: 2, 3]
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
      this.txtDescription.setVisible(false); // Ẩn mô tả khi mở menu để tránh bị đè[cite: 3]
    } else {
      this.toggleMainMenuButtons(false);
      this.equationTextObjects.forEach(obj => obj.setVisible(false));
      // Giữ nguyên hiển thị txtDescription nếu đang có nội dung[cite: 3]
    }
  }

  setupPeriodicTable(centerX, centerY, camerawidth, cameraheight, btnTextStyle) {
    this.overlay2 = this.add.rectangle(0, 0, camerawidth, cameraheight, 0x000000, 0.6).setOrigin(0).setDepth(10).setVisible(false);
    this.periodicTable = this.add.image(centerX, centerY, "bth").setVisible(false).setDepth(11);
    this.periodicTable.setScale(camerawidth / this.periodicTable.width / 1.1, cameraheight / this.periodicTable.height / 1.1);
    
    let isTableOpen = false;
    this.periodicTableBtn = this.add.text(camerawidth - 20, 20, "Mở Bảng", btnTextStyle).setOrigin(1, 0).setDepth(12).setInteractive({ cursor: "pointer" });

    this.periodicTableBtn.on("pointerup", () => {
      isTableOpen = !isTableOpen;
      this.overlay2.setVisible(isTableOpen);
      this.periodicTable.setVisible(isTableOpen);
      this.periodicTableBtn.setText(isTableOpen ? "Đóng Bảng" : "Mở Bảng");
    });
  }
}