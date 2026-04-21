const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

// 1. KHỞI TẠO app TRƯỚC (Đây là dòng bạn có thể đang thiếu hoặc để dưới cùng)
const app = express();
app.use(express.json());

// 2. Cấu hình kết nối Database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "chemxlab_user",
  password: process.env.DB_PASSWORD || "chemxlab_password",
  database: process.env.DB_NAME || "chemxlab",
  waitForConnections: true,
  connectionLimit: 10,
});

// 3. ĐỊNH NGHĨA ROUTE (Bây giờ mới dùng được biến app)
app.get("/chemicals", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Chemicals");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi kết nối database" });
  }
});

// 4. KHỞI CHẠY SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});

// --- Thêm route GET /equipments ---
app.get("/equipments", async (req, res) => {
  try {
    // Giả sử bạn đã có bảng Equipments trong MySQL
    const [rows] = await pool.query("SELECT * FROM Equipments");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy danh sách dụng cụ" });
  }
});

// --- Thêm route POST /chemicalsreactions ---
app.post("/chemicalsreactions", async (req, res) => {
  try {
    const { reactants } = req.body; // reactants là mảng ["HCl", "NaOH"]

    if (!reactants || !Array.isArray(reactants) || reactants.length < 2) {
      return res.status(400).json({ error: "Cần ít nhất 2 chất tham gia" });
    }

    // Sắp xếp để đảm bảo thứ tự không ảnh hưởng đến việc tìm kiếm (tùy vào cách bạn lưu DB)
    const sortedReactants = reactants.sort();

    // Truy vấn kiểm tra phản ứng trong bảng Reactions
    // Giả sử bảng có các cột Reactant1, Reactant2...
    const [rows] = await pool.query(
      "SELECT * FROM Reactions WHERE (Reactant1 = ? AND Reactant2 = ?) OR (Reactant1 = ? AND Reactant2 = ?)",
      [
        sortedReactants[0],
        sortedReactants[1],
        sortedReactants[1],
        sortedReactants[0],
      ],
    );

    if (rows.length > 0) {
      res.json({ found: true, reaction: rows[0] });
    } else {
      res.json({ found: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi xử lý phản ứng" });
  }
});
