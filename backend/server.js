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
