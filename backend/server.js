const express = require("express");
const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors"); // Import thư viện
const app = express();
require("dotenv").config();

// Cấu hình CORS
app.use(cors());

app.use(express.json());

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

    if (!reactantIds || reactantIds.length < 2) {
      return res.status(400).json({ error: "Cần ít nhất 2 chất tham gia" });
    }

    // Sắp xếp để đảm bảo thứ tự không ảnh hưởng đến việc tìm kiếm (tùy vào cách bạn lưu DB)
    const sortedReactants = reactants.sort();

    // Logic mới: Tìm ReactionID mà cả 2 ChemicalID này đều tham gia làm Reactant
    const query = `
      SELECT r.* 
      FROM Reactions r
      JOIN Reaction_Chemicals rc1 ON r.ReactionID = rc1.ReactionID
      JOIN Reaction_Chemicals rc2 ON r.ReactionID = rc2.ReactionID
      WHERE rc1.ChemicalID = ? AND rc1.Role = 'Reactant'
        AND rc2.ChemicalID = ? AND rc2.Role = 'Reactant'
        AND rc1.ReactionID = rc2.ReactionID
    `;

    // Truy vấn kiểm tra phản ứng trong bảng Reactions
    // Giả sử bảng có các cột Reactant1, Reactant2...
    const [rows] = await pool.query(query, [reactantIds[0], reactantIds[1]]);

    if (rows.length > 0) {
      const reaction = rows[0];

      // Lấy thêm danh sách các sản phẩm để trả về cho Frontend
      const [products] = await pool.query(
        `SELECT c.NameVN, c.Formula, c.ChemicalID 
         FROM Chemicals c 
         JOIN Reaction_Chemicals rc ON c.ChemicalID = rc.ChemicalID 
         WHERE rc.ReactionID = ? AND rc.Role = 'Product'`,
        [reaction.ReactionID],
      );

      res.json({
        found: true,
        reactionDetails: reaction,
        products: products,
      });
    } else {
      res.json({ found: false, message: "Không tìm thấy phản ứng phù hợp" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi xử lý phản ứng" });
  }
});
// Lấy danh sách hóa chất kèm màu sắc để Phaser hiển thị
app.get("/chemicals", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ChemicalID, NameVN, Formula, Color, PhysicalState FROM Chemicals",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu hóa chất" });
  }
});

// Lấy danh sách dụng cụ
app.get("/equipment", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT EquipmentID, NameVN, FunctionType FROM Equipment",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu dụng cụ" });
  }
});
