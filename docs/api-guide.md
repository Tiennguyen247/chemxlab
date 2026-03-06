# ChemxLab API Guide

Base URL: http://localhost:3000

## 1. Lấy danh sách hóa chất
GET /chemicals

Kết quả trả về:
[{ "id": 1, "name": "Axit Clohydric", "formula": "HCl", "danger_level": 3 }, ...]

## 2. Lấy danh sách thiết bị
GET /equipment

Kết quả trả về:
[{ "id": 1, "name": "Cốc thủy tinh 250ml", "type": "container" }, ...]

## 3. Kiểm tra phản ứng hóa học
POST /reaction/check
Content-Type: application/json

Gửi lên:
{ "reactants": ["HCl", "NaOH"] }

Nếu có phản ứng:
{ "found": true, "reaction": { "equation": "HCl + NaOH → NaCl + H₂O", ... } }

Nếu không có phản ứng:
{ "found": false, "message": "Không có phản ứng xảy ra" }
```

**Bước 3:** Push lên GitHub để cả nhóm thấy:

Trong Terminal VS Code gõ lần lượt:
```
git add .
git commit -m "feat: add JSON data, clean server, add API guide"
git push origin main