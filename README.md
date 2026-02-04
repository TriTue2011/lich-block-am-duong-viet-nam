# Lịch Âm Dương Việt Nam - Home Assistant Custom Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

Lịch âm dương Việt Nam hiển thị đầy đủ thông tin lịch Dương, lịch Âm, Giờ Hoàng Đạo, Thập Nhị Trực, Nhị Thập Bát Tú và các thông tin phong thủy cho Home Assistant.

## Tính năng

### 📅 Thông tin Dương lịch
- Ngày tháng năm Dương lịch
- Thứ trong tuần (Tiếng Việt)
- Các ngày lễ Việt Nam và Quốc tế

### 🌙 Thông tin Âm lịch
- Ngày tháng năm Âm lịch
- Can Chi (Ngày, Tháng, Năm)
- 12 Con Giáp với emoji
- Giờ Hoàng Đạo
- 24 Tiết khí
- Các ngày lễ Âm lịch (Tết, Rằm, Vu Lan, Trung Thu...)

### 🔮 Thông tin phong thủy
- Thập Nhị Trực
- Nhị Thập Bát Tú
- Sao Cát - Sao Hung
- Thần Sát
- Nên làm - Kiêng cữ

### ✨ Tính năng tương tác
- Chuyển tháng (◀ ▶)
- Chuyển năm (◀◀ ▶▶)
- Reset về hôm nay (📅)
- Click vào ngày để xem chi tiết popup
- Responsive design

## Cài đặt

### Qua HACS (Khuyến nghị)

1. Mở HACS trong Home Assistant
2. Chọn "Frontend"
3. Click menu 3 chấm ở góc phải trên
4. Chọn "Custom repositories"
5. Thêm URL: `https://github.com/TriTue2011/lich-block-am-duong-viet-nam`
6. Category: `Lovelace`
7. Click "Add"
8. Tìm "Lịch Âm Dương Việt Nam" và cài đặt
9. Restart Home Assistant
10. Clear browser cache (Ctrl + F5)

### Cài đặt thủ công

1. Download file `lich-block-am-duong-viet-nam.js` từ thư mục `dist/`
2. Copy vào `/config/www/community/lich-block-am-duong-viet-nam/`
3. Thêm resource trong Home Assistant:
   - Settings → Dashboards → Resources
   - Add Resource
   - URL: `/hacsfiles/lich-block-am-duong-viet-nam/lich-block-am-duong-viet-nam.js`
   - Type: `JavaScript Module`
4. Clear browser cache (Ctrl + F5)

## Cấu hình

### Cấu hình cơ bản

```yaml
type: custom:lich-block-am-duong-viet-nam
background: transparent
background_opacity: 0.6
grid_options:
  columns: full
```

### Các tùy chọn

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | `custom:lich-block-am-duong-viet-nam` |
| `background` | string | `normal` | Loại nền: `normal` hoặc `transparent` |
| `background_opacity` | number | `0.6` | Độ mờ nền (0-1) |
| `center_entity` | string | optional | Entity ID để hiển thị ở giữa |
| `grid_options` | object | optional | Tùy chọn lưới |

### Ví dụ nâng cao

```yaml
type: custom:lich-block-am-duong-viet-nam
background: transparent
background_opacity: 0.8
center_entity: sensor.inspirational_quote
grid_options:
  columns: full
```

## Xử lý lỗi

### "Custom element doesn't exist"

1. Kiểm tra file đã được cài đặt đúng vị trí
2. Kiểm tra Resource Type là `JavaScript Module`
3. Clear browser cache (Ctrl + F5)
4. Restart Home Assistant

### Card không hiển thị

1. Mở Developer Tools (F12)
2. Kiểm tra tab Console để xem lỗi
3. Đảm bảo YAML syntax đúng
4. Thử cấu hình cơ bản trước

## Thông tin phát triển

**Tác giả:** Nguyễn Tiến Khải (khaisilk1910)  
**Nguồn dữ liệu:** Hồ Ngọc Đức & xemlicham.com  
**Phiên bản:** 1.0.0  
**License:** MIT

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## Changelog

### Version 1.0.0 (2025-02-04)
- Phát hành phiên bản đầu tiên
- Hỗ trợ lịch âm dương Việt Nam
- Hiển thị thông tin phong thủy
- Tương tác chuyển tháng/năm
- Popup chi tiết từng ngày

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

**Nếu thấy hữu ích, hãy cho repo một ⭐ nhé!**
