const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Đọc dữ liệu từ file JSON (không cần database)
function getData() {
  const filePath = path.join(__dirname, '../db/data.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

// ✅ API 1: Lấy danh sách hóa chất
app.get('/chemicals', (req, res) => {
  try {
    const data = getData();
    res.json(data.chemicals);
  } catch (err) {
    res.status(500).json({ error: 'Không đọc được dữ liệu' });
  }
});

// ✅ API 2: Lấy danh sách thiết bị
app.get('/equipment', (req, res) => {
  try {
    const data = getData();
    res.json(data.equipment);
  } catch (err) {
    res.status(500).json({ error: 'Không đọc được dữ liệu' });
  }
});

// ✅ API 3: Kiểm tra phản ứng hóa học
// Gửi lên: { "reactants": ["HCl", "NaOH"] }
app.post('/reaction/check', (req, res) => {
  try {
    const { reactants } = req.body;

    if (!reactants || !Array.isArray(reactants)) {
      return res.status(400).json({ error: 'Thiếu danh sách chất phản ứng' });
    }

    const data = getData();
    const sorted = [...reactants].sort();

    // Tìm phản ứng khớp
    const match = data.reactions.find(r => {
      const rSorted = [...r.reactants].sort();
      return JSON.stringify(rSorted) === JSON.stringify(sorted);
    });

    if (match) {
      res.json({ found: true, reaction: match });
    } else {
      res.json({ found: false, message: 'Không có phản ứng xảy ra' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server ChemxLab đang chạy tại: http://localhost:${PORT}`);
});