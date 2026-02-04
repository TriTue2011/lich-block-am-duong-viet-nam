# Hướng Dẫn Cấu Trúc Repository Cho HACS

## 📁 Cấu trúc thư mục yêu cầu

Repository GitHub của bạn cần có cấu trúc như sau:

```
lich-block-am-duong-viet-nam/
├── dist/
│   └── lich-block-am-duong-viet-nam.js    # File chính (REQUIRED)
├── hacs.json                               # HACS config (REQUIRED)
├── README.md                               # README (REQUIRED)
├── info.md                                 # Info for HACS (REQUIRED)
├── LICENSE                                 # License file (REQUIRED)
└── screenshots/                            # Screenshots (Optional)
    ├── desktop.png
    ├── mobile.png
    └── detail.png
```

## 📝 Các file bắt buộc

### 1. `hacs.json`
```json
{
  "name": "Lịch Âm Dương Việt Nam",
  "render_readme": true,
  "content_in_root": false,
  "filename": "lich-block-am-duong-viet-nam.js"
}
```

### 2. `dist/lich-block-am-duong-viet-nam.js`
- Đây là file JavaScript chính
- Phải đặt trong thư mục `dist/`
- Tên file phải khớp với `filename` trong `hacs.json`

### 3. `README.md`
- File markdown chính mô tả project
- Chứa hướng dẫn cài đặt, cấu hình
- Hiển thị trên GitHub và HACS

### 4. `info.md`
- Mô tả ngắn gọn cho HACS
- Hiển thị trong HACS UI

### 5. `LICENSE`
- File license (khuyến nghị MIT)

## 🚀 Các bước setup

### Bước 1: Tạo repository trên GitHub

1. Truy cập https://github.com/new
2. Repository name: `lich-block-am-duong-viet-nam`
3. Description: `Lịch âm dương Việt Nam cho Home Assistant`
4. Public repository
5. Create repository

### Bước 2: Upload files

**Cách 1: Qua GitHub Web Interface**

1. Click "Add file" → "Upload files"
2. Upload các files theo cấu trúc trên
3. Commit changes

**Cách 2: Qua Git Command Line**

```bash
# Clone repository
git clone https://github.com/TriTue2011/lich-block-am-duong-viet-nam.git
cd lich-block-am-duong-viet-nam

# Tạo cấu trúc thư mục
mkdir -p dist

# Copy các files
cp hacs.json .
cp README.md .
cp info.md .
cp LICENSE .
cp lich-block-am-duong-viet-nam.js dist/

# Commit và push
git add .
git commit -m "Initial commit - HACS compliant structure"
git push origin main
```

### Bước 3: Tạo release (Bắt buộc cho HACS)

1. Trên GitHub, click "Releases" → "Create a new release"
2. Tag version: `v1.0.0`
3. Release title: `Version 1.0.0`
4. Description: 
   ```
   ## First Release
   - Initial release
   - Full Vietnamese Lunar Calendar support
   - Feng Shui information
   ```
5. Click "Publish release"

### Bước 4: Thêm vào HACS

Sau khi có release, người dùng có thể thêm vào HACS:

1. HACS → Frontend → ⋮ menu → Custom repositories
2. Repository: `https://github.com/TriTue2011/lich-block-am-duong-viet-nam`
3. Category: `Lovelace`
4. Add

## ✅ Checklist kiểm tra

- [ ] Repository public trên GitHub
- [ ] Có thư mục `dist/`
- [ ] File `dist/lich-block-am-duong-viet-nam.js` tồn tại
- [ ] File `hacs.json` tồn tại và đúng format
- [ ] File `README.md` đầy đủ
- [ ] File `info.md` tồn tại
- [ ] File `LICENSE` tồn tại
- [ ] Đã tạo ít nhất 1 release (tag v1.0.0)

## 🐛 Xử lý lỗi

### "Repository structure is not compliant"

**Nguyên nhân:**
- Thiếu file `hacs.json`
- Thiếu thư mục `dist/`
- File chính không nằm trong `dist/`
- Tên file không khớp với `hacs.json`

**Giải pháp:**
1. Kiểm tra có đầy đủ files theo cấu trúc trên
2. File JS phải nằm trong `dist/`
3. Tên file trong `hacs.json` phải khớp với file thực tế

### "No releases found"

**Nguyên nhân:**
- Chưa tạo release trên GitHub

**Giải pháp:**
1. Tạo release với tag `v1.0.0`
2. Đợi vài phút để HACS cập nhật

### "Invalid hacs.json"

**Nguyên nhân:**
- Format JSON sai
- Thiếu trường bắt buộc

**Giải pháp:**
1. Kiểm tra JSON syntax tại https://jsonlint.com
2. Đảm bảo có đầy đủ: `name`, `filename`

## 📚 Tài liệu tham khảo

- [HACS Documentation](https://hacs.xyz/docs/publish/start)
- [HACS Plugin Requirements](https://hacs.xyz/docs/publish/plugin)

## 💡 Tips

1. **Đặt tên file nhất quán:** Tên file trong `dist/` phải khớp với `filename` trong `hacs.json`
2. **README chi tiết:** README tốt giúp người dùng dễ cài đặt và sử dụng
3. **Screenshots:** Thêm ảnh minh họa vào `screenshots/` và nhúng vào README
4. **Versioning:** Sử dụng [Semantic Versioning](https://semver.org/) (v1.0.0, v1.1.0, v2.0.0...)
5. **Changelog:** Cập nhật CHANGELOG.md sau mỗi release

## 🎯 Checklist cuối cùng

Trước khi publish, đảm bảo:

```bash
# Kiểm tra cấu trúc
tree -L 2
# Output mong đợi:
# .
# ├── dist
# │   └── lich-block-am-duong-viet-nam.js
# ├── hacs.json
# ├── README.md
# ├── info.md
# └── LICENSE

# Kiểm tra hacs.json
cat hacs.json
# Phải có: name, filename

# Kiểm tra file tồn tại
ls -lh dist/lich-block-am-duong-viet-nam.js
# Phải có output

# Push lên GitHub
git add .
git commit -m "HACS compliant structure"
git push

# Tạo release
# (Làm trên GitHub UI)
```

---

**Sau khi làm theo hướng dẫn này, repository của bạn sẽ HACS compliant! ✅**
