# 📦 PACKAGE HOÀN CHỈNH - Lịch Âm Dương Việt Nam

## ✅ CÁC FILE ĐÃ TẠO

### 🔥 FILES CHÍNH (Dùng để upload lên GitHub)

```
dist/
└── lich-block-am-duong-viet-nam.js  ← File JS chính (981 dòng)

hacs.json                              ← HACS config
README.md                              ← README cho GitHub
info.md                                ← Info cho HACS
LICENSE                                ← MIT License
HUONG_DAN_GITHUB_HACS.md              ← Hướng dẫn setup
```

### 📚 FILES THAM KHẢO (Các phiên bản khác)

```
lich-block-am-duong-viet-nam_data.js   ← Version tách module (data)
lich-block-am-duong-viet-nam_svg.js    ← Version tách module (svg)
lich-block-am-duong-viet-nam.js        ← Version tách module (main)
lich-block-am-duong-viet-nam-merged.js ← Version merged standalone
```

---

## 🚀 HƯỚNG DẪN UPLOAD LÊN GITHUB

### Bước 1: Tạo Repository

1. Truy cập: https://github.com/new
2. Repository name: `lich-block-am-duong-viet-nam`
3. Description: `Lịch âm dương Việt Nam cho Home Assistant`
4. Public
5. **KHÔNG** check "Add README" (vì bạn đã có)
6. Create repository

### Bước 2: Upload Files

**Option A: Qua GitHub Web (Đơn giản nhất)**

1. Vào repository vừa tạo
2. Click "uploading an existing file"
3. Drag & drop TẤT CẢ files sau:
   ```
   hacs.json
   README.md
   info.md
   LICENSE
   HUONG_DAN_GITHUB_HACS.md
   ```
4. Commit: "Initial commit - Add HACS files"
5. Tạo thư mục `dist`:
   - Click "Add file" → "Create new file"
   - Filename: `dist/.gitkeep`
   - Commit
6. Upload file JS:
   - Vào thư mục `dist`
   - Click "Add file" → "Upload files"
   - Upload file `lich-block-am-duong-viet-nam.js` (từ dist/)
   - Commit: "Add main JavaScript file"

**Option B: Qua Git Command Line**

```bash
# Clone repository
git clone https://github.com/TriTue2011/lich-block-am-duong-viet-nam.git
cd lich-block-am-duong-viet-nam

# Tạo cấu trúc
mkdir -p dist

# Copy các files (giả sử đang ở thư mục chứa files đã download)
cp hacs.json .
cp README.md .
cp info.md .
cp LICENSE .
cp HUONG_DAN_GITHUB_HACS.md .
cp dist/lich-block-am-duong-viet-nam.js dist/

# Commit và push
git add .
git commit -m "Initial commit - HACS compliant structure"
git push origin main
```

### Bước 3: Tạo Release (BẮT BUỘC!)

1. Trên GitHub repository, click tab **"Releases"**
2. Click **"Create a new release"**
3. Điền thông tin:
   - **Tag version:** `v1.0.0`
   - **Release title:** `Version 1.0.0 - First Release`
   - **Description:**
     ```markdown
     ## 🎉 First Release
     
     ### Features
     - ✅ Lịch Dương: Ngày tháng năm, thứ, ngày lễ
     - ✅ Lịch Âm: Can Chi, Con Giáp, Tiết khí
     - ✅ Phong Thủy: Giờ Hoàng Đạo, Thập Nhị Trực, Nhị Thập Bát Tú
     - ✅ Tương tác: Chuyển tháng/năm, xem chi tiết
     - ✅ Responsive design
     
     ### Installation
     See [README.md](https://github.com/TriTue2011/lich-block-am-duong-viet-nam#readme)
     ```
4. Click **"Publish release"**

---

## 🏠 HƯỚNG DẪN SỬ DỤNG TRONG HOME ASSISTANT

### Cách 1: Qua HACS (Sau khi đã upload lên GitHub)

1. Mở **HACS** trong Home Assistant
2. Chọn **"Frontend"**
3. Click **menu ⋮** (3 chấm) ở góc phải trên
4. Chọn **"Custom repositories"**
5. Thêm repository:
   - **Repository:** `https://github.com/TriTue2011/lich-block-am-duong-viet-nam`
   - **Category:** `Lovelace`
6. Click **"Add"**
7. Tìm **"Lịch Âm Dương Việt Nam"** trong danh sách
8. Click **"Download"**
9. **Restart Home Assistant**
10. **Clear browser cache** (Ctrl + F5)

### Cách 2: Cài đặt thủ công (Không cần GitHub)

1. Download file `lich-block-am-duong-viet-nam.js` (từ dist/)
2. Upload vào `/config/www/` của Home Assistant
3. Thêm resource:
   - **Settings** → **Dashboards** → **Resources**
   - **Add Resource**
   - **URL:** `/local/lich-block-am-duong-viet-nam.js`
   - **Type:** `JavaScript Module`
4. Clear cache (Ctrl + F5)

### Thêm card vào Dashboard

```yaml
type: custom:lich-block-am-duong-viet-nam
background: transparent
background_opacity: 0.6
grid_options:
  columns: full
```

---

## 📋 CHECKLIST TRƯỚC KHI PUBLISH

### GitHub Repository

- [ ] Repository đã public
- [ ] Có thư mục `dist/`
- [ ] File `dist/lich-block-am-duong-viet-nam.js` tồn tại
- [ ] File `hacs.json` có đầy đủ thông tin
- [ ] File `README.md` đầy đủ hướng dẫn
- [ ] File `info.md` tồn tại
- [ ] File `LICENSE` tồn tại
- [ ] Đã tạo **release v1.0.0** với tag

### HACS Compliance

- [ ] `hacs.json` có trường `name` và `filename`
- [ ] `filename` trong `hacs.json` = tên file trong `dist/`
- [ ] Repository structure đúng format
- [ ] Có ít nhất 1 release

### Testing

- [ ] Test cài đặt qua HACS
- [ ] Test cài đặt thủ công
- [ ] Test card hiển thị đúng
- [ ] Test responsive mobile/desktop
- [ ] Test popup chi tiết ngày

---

## 🐛 TROUBLESHOOTING

### "Repository structure is not compliant"

✅ **Giải pháp:**
1. Đảm bảo file JS nằm trong thư mục `dist/`
2. Kiểm tra `hacs.json` có đúng format
3. Tên file phải khớp giữa `hacs.json` và thực tế

### "No releases found"

✅ **Giải pháp:**
1. Tạo release trên GitHub (tab Releases)
2. Tag phải bắt đầu bằng `v` (v1.0.0)
3. Đợi vài phút để HACS refresh

### "Custom element doesn't exist"

✅ **Giải pháp:**
1. Clear browser cache (Ctrl + F5)
2. Restart Home Assistant
3. Kiểm tra Console (F12) để xem lỗi
4. Đảm bảo Resource Type là `JavaScript Module`

---

## 📁 CẤU TRÚC CUỐI CÙNG TRÊN GITHUB

```
lich-block-am-duong-viet-nam/
│
├── dist/
│   └── lich-block-am-duong-viet-nam.js    (981 dòng)
│
├── hacs.json                               (HACS config)
├── README.md                               (Main README)
├── info.md                                 (HACS info)
├── LICENSE                                 (MIT License)
└── HUONG_DAN_GITHUB_HACS.md               (Setup guide)
```

---

## 🎯 TÓM TẮT NHANH

**3 bước để publish:**

1. **Upload files lên GitHub** theo cấu trúc trên
2. **Tạo release v1.0.0** trên GitHub
3. **Thêm vào HACS** → người dùng có thể cài đặt

**Người dùng cài đặt:**

1. **HACS** → Frontend → Custom repositories
2. Thêm URL: `https://github.com/TriTue2011/lich-block-am-duong-viet-nam`
3. Download và sử dụng

---

## 💡 TIPS

1. **Screenshot:** Thêm ảnh vào thư mục `screenshots/` và embed trong README
2. **CHANGELOG:** Tạo file `CHANGELOG.md` để track thay đổi
3. **Issues:** Enable GitHub Issues để nhận feedback
4. **Star:** Khuyến khích users star repo

---

**Chúc bạn publish thành công! 🎉**

**Có thắc mắc? Đọc file `HUONG_DAN_GITHUB_HACS.md` để biết chi tiết!**
