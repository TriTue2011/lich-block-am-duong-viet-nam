# Lịch Âm Dương Việt Nam - Home Assistant Custom Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

Lịch âm dương Việt Nam hiển thị giống như lịch ngày xưa.

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
- Các ngày lễ Âm lịch (Tết, Rằm, Vu Lan, Trung Thu...)


### ✨ Tính năng tương tác
- Chuyển ngày <img width="102" height="38" alt="image" src="https://github.com/user-attachments/assets/3d0e3822-b87f-4aac-b396-5b1ebdf2fe96" />
và <img width="101" height="36" alt="image" src="https://github.com/user-attachments/assets/9c8d8c7d-67be-49a0-8951-342e8bbd2c86" />
- Reset về hôm nay <img width="99" height="34" alt="image" src="https://github.com/user-attachments/assets/77ab40c1-4773-45df-9dad-b3b469ee1e77" />
- Click vào ngày để xem chi tiết popup
- Chọn ngày để xem gồm âm hoặc dương
## Cài đặt
1. Tải file lich-block-am-duong.js
2. Upload vào folder www
3. Vào bảng điều khiển hoặc Dashboard
4. Kích vào 3 chấm góc trên cùng bên phải, chọn tài nguyên hoặc Resources
5. Thêm tài nguyên hoặc add Resources
6. Url: /local/lich-block-am-duong.js và Resource type tự động là Loại tài nguyên (JavaScript) module (Mô-đun JavaScript)
7. Tạo thẻ thủ công (custom card)
 ```
type: custom:lich-am-duong-card
background: normal
quote_entity: sensor.daily_quote
 ```
or
 ```
type: custom:lich-am-duong-card
background: transparent 
background_opacity: 0.3  # 0-1
quote_entity: sensor.daily_quote  # optional
 ```
10. Restart Home Assistant
11. Clear browser cache (Ctrl + F5)

