// Lịch Âm Dương Việt Nam - Thiết kế lịch treo tường
// Phát triển bởi Nguyễn Tiến Khải - khaisilk1910
// HA custom card:
//   type: custom:lich-block-am-duong-viet-nam
//   background: transparent # normal(mặc định) hoặc transparent
//   background_opacity: 0.6 # 0-1 (0 là trong suốt, 1 là đậm)
//   center_entity: sensor.your_sensor # Sensor hiển thị ở giữa
//   grid_options:
//     columns: full

(function(){
  'use strict';

  // ===== Utilities =====
  const PI = Math.PI;
  function INT(d){ return Math.floor(d); }


  // TK19: Years 1800-1899 (kept for completeness, used for <1900)
  const TK19 = [
    0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0,
    0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4,
    0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0,
    0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0,
    0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4,
    0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0,
    0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
    0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3,
    0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550,
    0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50
  ];

  // TK20: Years 1900-1999
  const TK20 = [
    0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2,
    0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977,
    0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970,
    0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950,
    0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557,
    0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0,
    0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
    0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6,
    0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370,
    0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0
  ];

  // TK21: Years 2000-2099
  const TK21 = [
    0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5,
    0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930,
    0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520,
    0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25,
    0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60,
    0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0,
    0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
    0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0,
    0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160,
    0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952
  ];

  // TK22: Years 2100-2199
  const TK22 = [
    0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559,
    0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0,
    0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0,
    0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567,
    0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570,
    0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0,
    0x4ac950, 0x32d556, 0x58b4a0, 0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
    0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570, 0x3a5377, 0x6052b0, 0x4a6950,
    0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4, 0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550,
    0x465aa0, 0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250, 0x48b540, 0x33d556
  ];

  const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
  const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
  // Mảng emoji riêng
  const CHI_EMOJI = ["🐭","🐂","🐯","🐱","🐲","🐍","🐴","🐐","🐵","🐔","🐶","🐷"];
  const TUAN = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
  const GIO_HD = ["110100101100","001101001011","110011010010","101100110100","001011001101","010010110011"]; // Ty..Hoi

  const TIETKHI = [
    "Xuân Phân","Thanh Minh","Cốc Vũ","Lập Hạ","Tiểu Mãn","Mang Chủng",
    "Hạ Chí","Tiểu Thử","Đại Thử","Lập Thu","Xử Thử","Bạch Lộ",
    "Thu Phân","Hàn lộ","Sương Giáng","Lập đông","Tiểu Tuyết","Đại Tuyết",
    "Đông Chí","Tiểu Hàn","Đại Hàn","Lập Xuân","Vũ Thủy","Kinh Trập"
  ];

  const NGAY_LE_DL = [
    "1/1","9/1","3/2","14/2","27/2","8/3","20/3","22/3","26/3","31/3","1/4","30/4","1/5","7/5","12/5","19/5","1/6","18/6","21/6","28/6","11/7","27/7","28/7","19/8","2/9","10/9","1/10","10/10","13/10","16/10","17/10","20/10","31/10","9/11","19/11","20/11","23/11","28/11","29/11","1/12","19/12","25/12","22/12"
  ];
  const NGAY_LE_DL_STRING = [
    "Tết Dương lịch","Truyền thống học sinh, sinh viên Việt Nam","Thành lập Đảng Cộng Sản Việt Nam","Lễ tình nhân","Thầy thuốc Việt Nam","Quốc tế Phụ nữ","Quốc tế Hạnh phúc","Nước sạch Thế giới","Thành lập Đoàn TNCS Hồ Chí Minh","Lễ Phục Sinh","Cá tháng Tư","Giải phóng Miền Nam","Quốc tế Lao động","Chiến thắng Điện Biên Phủ","Ngày của Mẹ","Ngày sinh Chủ tịch Hồ Chí Minh","Quốc tế Thiếu Nhi","Ngày của Cha","Báo chí Việt Nam","Gia đình Việt Nam","Dân số thế giới","Thương binh liệt sĩ","Thành lập công đoàn Việt Nam","Kỷ niệm Cách mạng Tháng 8 thành công","Quốc Khánh","Thành lập Mặt trận Tổ quốc Việt Nam","Quốc tế người cao tuổi","Ngày giải phóng Thủ Đô","Doanh nhân Việt Nam","Ngày Lương thực thế giới","Ngày quốc tế xóa nghèo","Phụ nữ Việt Nam (20.10.1930)","Halloween","Pháp luật Việt Nam","Quốc tế Nam giới","Nhà giáo Việt Nam","Thành lập Hội chữ thập đỏ Việt Nam","Lễ Tạ Ơn","Black Friday","Thế giới phòng chống AIDS","Toàn quốc kháng chiến","Lễ Giáng Sinh","Thành lập Quân đội nhân dân Việt Nam"
  ];
  const NGAY_LE_AL = ["1/1","15/1","3/3","10/3","15/4","5/5","7/7","15/7","15/8","9/9","10/10","15/10","23/12"];
  const NGAY_LE_AL_STRING = ["Tết Nguyên Đán","Tết Nguyên Tiêu","Tết Hàn Thực, Tiết Thanh Minh","Giỗ tổ Hùng Vương","Lễ Phật Đản","Tết Đoan Ngọ","Lễ Thất Tịch","Lễ Vu Lan","Tết Trung Thu","Tết Trùng Cửu","Tết Trùng Thập","Tết Hạ Nguyên","Ông Táo Về Trời"];










// ===== Thập nhị trực =====
const THAP_NHI_TRUC = {
  "Kiến": { tot: "Khai trương, nhậm chức, cưới hỏi, trồng cây, đền ơn đáp nghĩa. Xuất hành đặng lợi, sinh con rất tốt.", xau: "Động thổ, chôn cất, đào giếng, lợp nhà." },
  "Trừ": { tot: "Động đất, ban nền đắp nền, thờ cúng Táo Thần, cầu thầy chữa bệnh bằng cách mổ xẻ hay châm cứu, bốc thuốc, xả tang, khởi công làm lò nhuộm lò gốm, nữ nhân khởi đầu uống thuốc chữa bệnh.", xau: "Đẻ con nhằm ngày này khó nuôi, nên làm Âm Đức cho con, nam nhân kỵ khởi đầu uống thuốc." },
  "Mãn": { tot: "Xuất hành, đi đường thủy, cho vay, thu nợ, mua hàng, bán hàng, nhập kho, đặt táng, kê gác, sửa chữa, lắp đặt máy, thuê thêm người, vào học kỹ nghệ, làm chuồng gà ngỗng vịt.", xau: "Lên quan lãnh chức, uống thuốc, vào làm hành chính, dâng nộp đơn từ." },
  "Bình": { tot: "Nhập vào kho, đặt táng, gắn cửa, kê gác, đặt yên chỗ máy, sửa chữa làm tàu, khai trương tàu thuyền, các việc bồi đắp thêm ( như bồi bùn, đắp đất, lót đá, xây bờ kè.) Lót giường đóng giường, thừa kế tước phong hay thừa kế sự nghiệp, các vụ làm cho khuyết thủng ( như đào mương, móc giếng, xả nước.)", xau: "Không có" },
  "Định": { tot: "Động thổ, san nền, đắp nền, làm hay sửa phòng bếp, lắp đặt máy móc, nhập học, làm lễ cầu thân, nộp đơn dâng sớ, sửa hay làm tàu thuyền, khai trương tàu thuyền, khởi công làm lò. Mua nuôi thêm súc vật.", xau: "Thưa kiện, xuất hành đi xa." },
  "Chấp": { tot: "Lập khế ước, giao dịch, động thổ san nền, cầu thầy chữa bệnh, đi săn thú cá, tìm bắt trộm cướp. Xây đắp nền-tường.", xau: "Dời nhà, đi chơi xa, mở cửa hiệu buôn bán, xuất tiền của." },
  "Phá": { tot: "Trị bệnh, Phá dỡ, Dọn dẹp", xau: "Là ngày Nhật Nguyệt tương xung. Ngày có trực Phá muôn việc làm vào ngày này đều bất lợi." },
  "Nguy": { tot: "Không nên làm gì", xau: "Nói đến Trực Nguy là nói đến sự Nguy hiểm, suy thoái. Chính vì thế ngày có trực Nguy là ngày xấu, tiến hành muôn việc đều hung." },
  "Thành":{ tot: "Lập khế ước, giao dịch, cho vay, thu nợ, mua hàng, bán hàng, xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, gắn cửa, đặt táng, kê gác, dựng xây kho vựa, làm hay sửa chữa phòng bếp, thờ phụng Táo Thần, lắp đặt máy móc ( hay các loại máy ), gặt lúa, đào ao giếng, tháo nước, cầu thầy chữa bệnh, mua gia súc, các việc trong vụ chăn nuôi, nhập học, làm lễ cầu thân, cưới gả, kết hôn, thuê người, nộp đơn dâng sớ, học kỹ nghệ, làm hoặc sửa tàu thuyền, khai trương tàu thuyền, vẽ tranh, tu sửa cây cối.", xau: "Kiện tụng, tranh chấp." },
  "Thu": { tot: "Cấy lúa, gặt lúa, mua trâu, nuôi tằm, đi săn thú cá, tu sửa cây cối. Động thổ, san nền đắp nền, nữ nhân khởi ngày uống thuốc chưa bệnh, lên quan lãnh chức, thừa kế chức tước hay sự nghiệp, vào làm hành chính, nộp đơn dâng sớ.", xau: "Bắt đầu công việc mới, kỵ đi du lịch, kỵ tang lễ." },
  "Khai": { tot: "Xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, dựng xây kho vựa, làm hay sửa phòng bếp, thờ cúng Táo Thần, đóng giường lót giường, may áo, lắp đặt cỗ máy dệt hay các loại máy, cấy lúa gặt lúa, đào ao giếng, tháo nước, các việc trong vụ chăn nuôi, mở thông hào rãnh, cầu thầy chữa bệnh, bốc thuốc, uống thuốc, mua trâu, làm rượu, nhập học, học kỹ ngh, vẽ tranh, tu sửa cây cối.", xau: "An táng, Chôn cất" },
  "Bế": { tot: "Xây đắp tường, đặt táng, gắn cửa, kê gác, làm cầu. Khởi công lò nhuộm lò gốm, uống thuốc, trị bệnh (nhưng chớ trị bệnh mắt), tu sửa cây cối.", xau: "Lên quan nhậm chức, thừa kế chức tước hay sự nghiệp, nhập học, chữa bệnh mắt." }
};

// ===== Nhị thập bát tú =====
const NHI_THAP_BAT_TU = {
  "Giác": {
    tenNgay: "Giác Mộc Giao - Đặng Vũ",
    danhGia: "Tốt (Bình Tú)",
    tuongTinh: "Tướng tinh con Giao Long, chủ trị ngày thứ 5.",
    nenLam: "Mọi việc tạo tác đều đặng được vinh xương và tấn lợi. Việc hôn nhân hay cưới gả sinh con quý tử. Công danh thăng tiến, khoa cử đỗ đạt cao.",
    kiengCu: "Chôn cất hoạn nạn phải ba năm. Dù xây đắp mộ phần hay sửa chữa mộ phần ắt có người chết. Vì vậy, để tránh điềm giữ quý bạn nên chọn một ngày tốt khác để tiến hành chôn cất. Sinh con nhằm ngày Sao Giác chiếu thì sẽ khó nuôi. Tốt nhất đặt tên con theo tên của Sao nó mới được an toàn. Không dùng tên sao này có thể dùng tên Sao của tháng hay của năm cũng mang ý nghĩa tương đương.",
    ngoaiLe: "- Sao Giác trúng vào ngày Dần là Đăng Viên mang ý nghĩa được ngôi vị cao cả, hay mọi sự đều tốt đẹp.\n- Sao Giác trúng vào ngày Ngọ là Phục Đoạn Sát: rất kỵ trong việc chôn cất, thừa kế, chia lãnh gia tài, xuất hành và cả khởi công lò nhuộm hoặc lò gốm. Tuy nhiên sao Giác vào ngày này lại nên làm các việc như lấp hang lỗ, xây tường, dứt vú trẻ em, làm cầu tiêu, kết dứt điều hung hại.\n- Sao Giác trúng ngày Sóc tức là Diệt Một Nhật: không nên làm rượu, làm hành chính, lập lò gốm lò nhuộm cũng như thừa kế. Đặc biệt Đại Kỵ đi thuyền.\n- Giác: Mộc Giao (con cá sấu): tức là Mộc tinh, sao tốt. Ý nghĩa đỗ đạt, hôn nhân thành tựu. Đồng thời kỵ cải táng và hung táng.",
    tho: "Giác tinh tọa tác chủ vinh xương\nNgoại tiến điền tài cập nữ lang\nGiá thú hôn nhân sinh quý tử\nVăn nhân cập đệ kiến Quân vương\nDuy hữu táng mai bất khả dụng\nTam niên chi hậu, chủ ôn đậu"
  },
  "Cang": {
    tenNgay: "Cang Kim Long - Ngô Hán",
    danhGia: "Tốt (Bình Tú)",
    tuongTinh: "Tướng tinh con Rồng, chủ trị ngày thứ 6.",
    nenLam: "Công việc liên quan đến cắt may áo màn sẽ đặng nhiều lộc ăn.",
    kiengCu: "Chôn cất bị Trùng tang. Vì vậy, để tránh điềm giữ quý bạn nên chọn một ngày tốt khác để tiến hành chôn cất. Nếu cưới gả e rằng phòng không giá lạnh. Nếu tranh đấu kiện tụng thì lâm bại. Nếu khởi dựng nhà cửa chết con đầu. Trong 10 hoặc 100 ngày sau thì gặp họa, rồi từ đó lần lần tiêu hết ruộng đất, còn nếu làm quan bị cách chức. Sao Cang thuộc vào Thất Sát Tinh, nhằm ngày này sanh con ắt sẽ khó nuôi. Cho nên lấy tên của Sao để đặt cho con thì được yên lành.",
    ngoaiLe: "- Sao Cang nhằm vào ngày Rằm là Diệt Một Nhật: Cữ làm rượu, thừa kế sự nghiệp, lập lò gốm, lò nhuộm hay vào làm hành chính, thứ nhất đi thuyền chẳng khỏi nguy hại (vì Diệt Một có nghĩa là chìm mất).\n- Sao Cang tại Mùi, Hợi, Mẹo thì trăm việc đều tốt. Thứ nhất tại Mùi.\n- Sao Cang: Kim Long (con rồng): Kim tinh, sao xấu. Kỵ gả cưới và xây cất. Đề phòng dễ bị tai nạn.",
    tho: "Can tinh tạo tác Trưởng phòng đường,\nThập nhật chi trung chủ hữu ương,\nĐiền địa tiêu ma, quan thất chức,\nĐầu quân định thị hổ lang thương.\nGiá thú, hôn nhân dụng thử nhật,\nNhi tôn, Tân phụ chủ không phòng,\nMai táng nhược hoàn phùng thử nhật,\nĐương thời tai họa, chủ trùng tang."
  },
  "Đê": {
    tenNgay: "Đê Thổ Lạc - Giả Phục",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Tướng tinh con Lạc Đà, chủ trị ngày thứ 7.",
    nenLam: "Sao Đê đại hung, không hợp để làm bất kỳ công việc trọng đại nào.",
    kiengCu: "Không nên khởi công xây dựng, chôn cất, cưới gả và xuất hành. Kỵ nhất là đường thủy. Ngày này sinh con chẳng phải điềm lành nên làm âm đức cho con. Đây chỉ là liệt kê các việc Đại Kỵ, còn các việc khác vẫn nên kiêng cữ. Vì vậy, nếu quý bạn có dự định các công việc liên quan đến khởi công xây dựng, chôn cất, cưới gả và xuất hành quý bạn nên chọn một ngày tốt khác để thực hiện.",
    ngoaiLe: "- Đê Thổ Lạc tại: Thân, Tý và Thìn trăm việc đều tốt. Trong đó, Thìn là tốt hơn hết bởi Sao Đê Đăng Viên tại Thìn.\n- Đê Thổ Lạc (con nhím): Thổ tinh, sao xấu. Khắc kỵ các việc: khai trương, động thổ, chôn cất và xuất hành.",
    tho: "Đê tinh tạo tác chủ tai hung,\nPhí tận điền viên, thương khố không,\nMai táng bất khả dụng thử nhật,\nHuyền thằng, điếu khả, họa trùng trùng,\nNhược thị hôn nhân ly biệt tán,\nDạ chiêu lãng tử nhập phòng trung.\nHành thuyền tắc định tạo hướng một,\nCánh sinh lung ách, tử tôn cùng."
  },
  // ... (nội dung tiếp tục giữ nguyên như file hiện tại)
};


// ===== Cát tinh / Hung tinh / Thần sát =====
const CAT_TINH = {
  "Thiên Đức": "Tốt mọi việc, nhất là cầu tài, cầu phúc",
  "Nguyệt Đức": "Cưới hỏi, cầu phúc, khai trương",
  "Thiên Hỷ": "Hỷ sự, cưới hỏi, gặp gỡ",
  "Tam Hợp": "Mọi việc hanh thông, cầu tài lộc thuận",
  "Lục Hợp": "Hòa thuận, cưới hỏi, giao dịch"
};

const HUNG_TINH = {
  "Thiên Cương": "Hung sự, kỵ xây dựng, khai trương",
  "Địa Tặc": "Kỵ xuất hành, mất mát",
  "Nguyệt Kỵ": "Ngày xấu, đại kỵ khởi sự lớn",
  "Không Vong": "Kỵ giao dịch, ký kết",
  "Tiểu Hồng Sa": "Kỵ cưới hỏi"
};

const THAN_SAT = {
  "Tý":  { cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
  "Sửu": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] },
  "Dần": { cat: ["Tam Hợp"], hung: ["Nguyệt Kỵ"] },
  "Mão": { cat: ["Thiên Hỷ"], hung: ["Không Vong"] },
  "Thìn":{ cat: ["Lục Hợp"], hung: ["Tiểu Hồng Sa"] },
  "Tỵ":  { cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
  "Ngọ": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] },
  "Mùi": { cat: ["Tam Hợp"], hung: ["Nguyệt Kỵ"] },
  "Thân":{ cat: ["Thiên Hỷ"], hung: ["Không Vong"] },
  "Dậu": { cat: ["Lục Hợp"], hung: ["Tiểu Hồng Sa"] },
  "Tuất":{ cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
  "Hợi": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] }
};

// ===== SVG 12 Con Giáp =====
	const svg_12congiap = [
		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M10.77 56.62c-.18 0-.37-.05-.54-.15l-5.83-4.1c-.51-.3-.68-.96-.38-1.47c.3-.51.96-.69 1.47-.38l5.83 4.11c.51.3.68.96.38 1.47c-.21.33-.57.52-.93.52z" fill="#6ba3ab"></path><path d="M1.75 57.47c-.58 0-1.06-.46-1.07-1.04c-.02-.59.45-1.09 1.04-1.1l8.61 1.12c.6-.03 1.09.45 1.1 1.04c.02.59-.45 1.09-1.04 1.1l-8.61-1.12h-.03z" fill="#6ba3ab"></path><path d="M2.83 63.18a1.075 1.075 0 0 1 .11-2.02l7.66-2.27a1.075 1.075 0 1 1 .62 2.06l-7.66 2.27c-.25.07-.51.05-.73-.04z" fill="#6ba3ab"></path><path d="M86.86 97.6s-5.82-1.28-10.35 0s-6.49 4.53-5.67 6.42c.76 1.74 6.19-.15 11.78-.15s15.26-.23 16.92-1.28c1.66-1.06.3-7.18.3-7.18L86.86 97.6z" fill="#fdd3b1"></path><path d="M39.27 97.38s-1.28.6-2.64 1.74c-1.44 1.2-3.17 2.87-2.04 4.31s3.4.6 3.4.6s-.3 1.13 1.96 1.59c2.27.45 7.18-2.42 7.18-2.42l-7.86-5.82z" fill="#fdd3b1"></path><path d="M106.95 81.66s4.76.45 10.5 4.53c5.43 3.86 11.75 10.93 9.14 21.45c-2.64 10.65-14.43 16.69-28.93 15.86c-13.89-.8-28.28-9.4-35.81-8.84c-12.16.91-15.79 7.86-16.85 7.33c-1.06-.53.53-8.91 10.65-11.94c8.37-2.5 15.41-1.06 24.85 1.89c9.44 2.95 29.16 7.95 35.96-2.79c7.4-11.71-4.83-16.39-8.61-18.21c-3.77-1.8-.9-9.28-.9-9.28z" fill="#fdd3b1"></path><path d="M53.85 34.15s.19-2.44-1.28-5.14c-1.18-2.17-3.02-4.91-8.01-5.36c-11.15-1.01-13.92 11.41-14.05 14.65c-.15 3.78.98 8.38.98 8.38l16.69-1.81l5.67-10.72z" fill="#6da3af"></path><path d="M42.52 77.74s-.37 9.24-.53 11.94c-.3 5.14-3.85 5.51-4 7.86c-.23 3.52 5.44 1.74 5.44 1.74l10.65-13.45l-11.56-8.09z" fill="#6da3af"></path><path d="M56.87 91.63S42.44 101 43.73 102.05c1.06.87 2.6 1.69 5.06 1.44c2.87-.3 9.9-3.02 12.46-5.44c1.67-1.57 3.25-4.23 3.25-4.23s4.61 1.36 7.78 1.51c3.17.15 7.86-.23 7.86-.23s7.48 8.91 18.66 6.42s11.26-12.84 11.26-12.84L99.33 67.54L77.05 58.1L56.87 78.87v12.76z" fill="#6da3af"></path><path d="M60.27 54.92s4.37-2.62 6.95-6.82c2.19-3.56 2.93-8.35.3-12.82c-2.78-4.72-7.79-5.62-11.63-4.54c-7.22 2.03-8.31 9.6-8.31 9.6s-2.19-1.81-7.03-1.74c-4.83.08-10.95 2.12-16.24 5.29c-5.29 3.17-6.35 4.91-10.05 6.72c-3.7 1.81-5.74 1.89-5.89 3.85c-.15 1.96.6 4.76 3.55 7.71c2.95 2.95 8.84 4.83 10.95 5.51s4.83 1.89 7.78 2.12c2.95.23 5.06.23 5.06.23s.98 3.1 4.23 7.1c3.25 4 8.91 8.84 8.91 8.84s-.83 5.59-1.89 7.1c-1.06 1.51-6.42 5.14-4.31 8.01s7.18.68 11.1-1.13s5.44-2.19 7.25-4.46c1-1.25 2.42-4.15 2.42-4.15s2.64.91 6.95 1.59c4.31.68 7.71.38 7.71.38s-7.4-8.76-6.87-16.39c.53-7.63 5.14-13.52 9.44-14.13c4.31-.6-1.98 4.85-3.17 7.18c-1.51 2.95-4.08 10.12.53 17.45s12.76 13.27 20.77 11.94c7.71-1.28 11.41-6.27 11.71-13.14c.21-4.69-.23-18.89-5.59-26.44c-5.36-7.55-12.97-12.36-24.75-11c-10.19 1.15-19.88 6.14-19.88 6.14z" fill="#b5c2c8"></path><path d="M62.08 37.17c-3.59-3.05-8.86-.05-10.12 4.78c-1.26 4.83.44 8.92 6.95 6.3c5.49-2.22 6.2-8.51 3.17-11.08z" fill="#ffd3b0"></path><path d="M9.56 59.38l4.13-4.03s-.81-1.56-2.97-2.27s-2.72.81-2.57 3.03c.15 2.21.95 3.12 1.41 3.27z" fill="#ffd3b0"></path><path d="M37.37 54.84c-1.04 1.8-2.68 2.47-4.14 1.94c-1.36-.49-1.43-2.76-.39-4.56c1.04-1.8 2.39-2.63 4.17-2.01c1.36.48 1.39 2.83.36 4.63z" fill="#2d2b2e"></path><path d="M51.31 63.91c1.04 1.71-3.01 4.37-5.84 5.59c-5.29 2.27-9.77 2.57-17.63.96c-7.24-1.49-12.44-4.18-15.36-6.6c-1.93-1.6-3.02-3.22-2.77-3.88c.66-1.71 2.75 1.37 4.08 2.37c2.97 2.22 6.06 3.09 7.72 3.16c3.21.12 6.43-2.15 7.44-1.09c1.91 2.01-3.83 3.02-3.83 3.02s6.35 1.91 10.53 1.41s8.61-2.06 10.83-3.53c2.21-1.46 4.12-2.57 4.83-1.41z" fill="#6ba3ab"></path><path d="M14.44 55.5c.79 1.01-1.31 2.72-2.22 3.47c-.91.76-2.01 2.17-2.52 1.01c-.5-1.16-.3-1.51 1.41-3.07c1.72-1.56 2.43-2.57 3.33-1.41z" fill="#2d2b2e"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M119.88 74.83s-2.21-4.43-2.67-7.6c-.56-3.87-1.29-6.06-1.62-8.66c-.44-3.44-1.55-5-2.11-5.91l-.42 5.21s-2.28 4.91.07 10.28c3.14 7.17 3.24 6.76 3.24 6.76l3.51-.08z" fill="#858585"></path><path d="M115.1 87.08c-2.33-3.14-2.87-5.56-2.25-8.94c.63-3.46 1.89-6.18 5.28-5.98c2.39.14 4.01 2.11 3.45 5.98c-.36 2.45-2.02 3.62-1.41 6.12c.84 3.45 3.15 3.82 3.6 4.65c.45.82-5.31 2.7-8.67-1.83z" fill="#5d6265"></path><path d="M52.17 84.83L41.4 89.05s3.24 4.15 3.38 5.56c.14 1.41.14 8.24-.07 9.08c-.21.84-3.45 5.49-2.39 6.69c1.06 1.2 4.29 1.62 7.04 1.34s4.79-2.46 4.93-3.45c.14-.99.28-6.97.42-8.45s1.9-11.97 1.9-11.97l-4.44-3.02z" fill="#858585"></path><path d="M95.32 85.25l-7.18 4.01s.63 3.38.21 5.28s-2.39 3.87-1.48 5c.92 1.13 4.58 1.06 6.41.92s3.66-1.13 3.94-2.11c.28-.99.35-12.67.35-12.67l-2.25-.43z" fill="#858585"></path><path d="M57.52 59L27.39 72.3l-11.54-5.63s-.36 2.32-.21 3.73c.28 2.6 1.69 10.14 12.53 11.76c10.84 1.62 18.86-3.73 18.86-3.73l20.48-10.7L57.52 59z" fill="#858585"></path><path d="M47.66 25.37s-11.91-1.5-19.29 5.35s-7 17.08-7 19.9s.38 4.69-.66 6.48c-1.04 1.78-4.87 5.14-4.94 9.64c-.06 3.58 29.05 3.12 29.05 3.12s5.11-.47 7.85-3c2.74-2.53 4.09-5.68 4.09-5.68s1.35 5.09-2.69 8.66c-2.74 2.42-6.4 2.56-6.4 2.56s-.47 3.85-5.01 7.13c-3.84 2.78-8.41 2.82-8.41 2.82S36.5 88.72 47 91.63c10.49 2.91 13.9 2.72 13.9 2.72s1.51 9.57 1.61 11.36c.09 1.78-.66 10.61-.19 11.45c.47.84 3.5 3.28 6.43 3c2.93-.28 4.16-3.47 4.16-4.79c0-1.31-.47-7.98-.57-9.29c-.09-1.31.85-9.85.85-9.85s4.82.47 10.78-1.22c5.96-1.69 9.26-6.48 13.52-6.66s7.37 3.47 7.28 7.41c-.09 3.94-1.89 7.79-1.13 8.92s2.55 1.88 5.2 1.78c2.65-.09 4.92-1.41 5.2-2.44c.28-1.03.57-12.67.66-14.55c.09-1.88 2.65-12.86 3.03-19.99c.38-7.13-1.04-15.58-4.54-19.8c-3.5-4.22-7.94-6.01-9.64-6.48c-1.7-.47-7.1-.9-8.79-1.69c-8.04-3.75-11.63-14.36-26.66-18.3c-8.49-2.22-18.09 1.4-20.44 2.16z" fill="#adadb7"></path><path d="M28 60.29c-9.85-.56-12.15 4.13-12.39 7.7c-.28 4.22 3.73 10.61 11.08 12.01c8.92 1.69 17.13-.66 18.11-8.92C45.74 63.2 34 60.63 28 60.29z" fill="#dfdfdf"></path><path d="M48.65 53.34c0 2.23-1.41 4.13-2.86 4.04c-1.42-.09-2.58-1.81-2.58-4.04s1.17-3.82 2.58-4.04c1.83-.28 2.86 1.81 2.86 4.04z" fill="#333"></path><ellipse cx="25.48" cy="50.29" rx="2.47" ry="3.8" fill="#333"></ellipse><ellipse transform="rotate(-26.285 35.013 72)" cx="35.02" cy="72" rx="3.19" ry="2.26" fill="#333"></ellipse><ellipse transform="rotate(-42.212 22.257 69.927)" cx="22.26" cy="69.93" rx="2.2" ry="3.19" fill="#333"></ellipse><path d="M39.92 25.63s-2.8-3.4-9.67-2.04c-4.84.96-7.19 5.33-9.67 8.26c-2.06 2.44-5.65 3.05-7.51 1.13c-1.38-1.43-1.16-2.88-.91-3.96c.56-2.37 3.12-3.68 3.25-4.58c.19-1.31-5.89-1.69-8.8 2.82s-1.9 12.39 2.6 15.2c4.5 2.82 9.01 4.32 15.02-.94s10.68-11.94 11.94-13.21c2.39-2.4 3.75-2.68 3.75-2.68z" fill="#b79277"></path><path d="M47.71 26.5s2.88-1.76 6.99-1.08c4.65.77 9.15 7.09 10.65 8.78c1.5 1.69 5.91 6.87 12.58 4.81c2.99-.93 4.17-3 4.62-5.36c.55-2.9-.04-5.2-.39-6.31c-.29-.92-1.34-2.63-.07-3.54c.87-.63 2.39.14 3.24 1.55c.84 1.41 2.75 7.44 1.81 11.57S80.76 49.4 72.59 49.31s-18.96-3.47-23.37-8.73s-4.14-12.11-1.51-14.08z" fill="#b79277"></path><path d="M21.43 47.24s-1.77.93-4.39 1.09c-2.7.16-5.95-.29-9.36-3.7c-1.69-1.69-3.03-5.23-3.33-7.34c-.68-4.71 1.64-8.92 1.64-8.92s-.72 13.34 10.28 13.9c7.41.38 12.86-8.17 14.92-10.04s3-1.31 3-1.31s-2.34 5.3-5.26 8.26c-2.96 3-6.62 4.62-7.04 5.12c-.41.48-.46 2.94-.46 2.94z" fill="#895a4e"></path><path d="M48.27 26.22c.65-.67-5.26 1.22-4.6 7.32c.66 6.1 8.96 12.81 14.64 15.3c6.85 3 17.08 4.22 23.56.19c6.48-4.04 7.88-12.48 6.76-17.36c-1.13-4.88-4.13-8.35-5.73-7.88c-.94.28.8 2.05 1.92 5.02c.78 2.05.9 5.11.7 6.8c-.42 3.68-1.78 6.28-3.59 8.19c-2.33 2.45-6.03 4.13-11.83 3.73c-4.87-.34-9.42-2.13-12.91-4.26c-4.23-2.57-7.19-5.75-8.27-7.19c-1.96-2.64-3.84-6.58-.65-9.86z" fill="#895a4e"></path></svg>',

		'<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 763.66 411.99"><g id="flipped-wrapper" transform="scale(-1,1) translate(-763.66,0)"> <defs> <style> .cls-1 { fill: #fcb1a4; } .cls-2 { fill: url(#linear-gradient-61); } .cls-3 { fill: url(#linear-gradient-15); } .cls-4 { fill: url(#linear-gradient-13); } .cls-5 { fill: url(#linear-gradient-28); } .cls-6 { fill: url(#linear-gradient-65); } .cls-7 { fill: url(#linear-gradient-69); } .cls-8 { fill: url(#linear-gradient-53); } .cls-9 { fill: url(#linear-gradient-42); } .cls-10 { fill: url(#linear-gradient-46); } .cls-11 { fill: url(#linear-gradient-70); } .cls-12 { fill: url(#linear-gradient-60); } .cls-13 { fill: url(#linear-gradient-2); } .cls-14 { fill: url(#linear-gradient-87); } .cls-15 { fill: url(#linear-gradient-64); } .cls-16 { fill: url(#linear-gradient-56); } .cls-17 { fill: url(#linear-gradient-43); } .cls-18 { fill: url(#linear-gradient-25); } .cls-19 { fill: url(#linear-gradient-82); } .cls-20 { fill: url(#linear-gradient-10); } .cls-21 { fill: url(#linear-gradient-12); } .cls-22 { fill: url(#linear-gradient-40); } .cls-23 { fill: url(#linear-gradient-27); } .cls-24 { fill: url(#linear-gradient-68); } .cls-25 { fill: #82797f; } .cls-26 { fill: url(#linear-gradient-37); } .cls-27 { fill: url(#linear-gradient-75); } .cls-28 { fill: url(#linear-gradient-55); } .cls-29 { fill: #fff; } .cls-30 { fill: url(#linear-gradient-39); } .cls-31 { fill: url(#linear-gradient-89); } .cls-32 { fill: #e37c6f; } .cls-33 { fill: url(#linear-gradient-52); } .cls-34 { fill: #b6a9b1; } .cls-35 { fill: url(#linear-gradient-58); } .cls-36 { fill: url(#linear-gradient-47); } .cls-37 { fill: url(#linear-gradient-26); } .cls-38 { fill: url(#linear-gradient-74); } .cls-39 { fill: url(#linear-gradient-72); } .cls-40 { fill: url(#linear-gradient-4); } .cls-41 { fill: url(#radial-gradient-5); } .cls-42 { fill: #944f08; } .cls-43 { fill: url(#linear-gradient-35); } .cls-44 { fill: url(#linear-gradient-30); } .cls-45 { fill: url(#linear-gradient-76); } .cls-46 { fill: url(#radial-gradient); } .cls-47 { fill: url(#radial-gradient-3); } .cls-48 { fill: url(#linear-gradient-73); } .cls-49 { fill: url(#linear-gradient-71); } .cls-50 { fill: url(#linear-gradient-44); } .cls-51 { fill: url(#linear-gradient-49); } .cls-52 { fill: url(#linear-gradient-3); } .cls-53 { fill: url(#linear-gradient-34); } .cls-54 { fill: #ffffd2; } .cls-55 { fill: url(#linear-gradient-5); } .cls-56 { fill: #d47c1e; } .cls-57 { fill: url(#linear-gradient-38); } .cls-58 { fill: url(#linear-gradient-91); } .cls-59 { fill: url(#linear-gradient-22); } .cls-60 { fill: url(#linear-gradient-24); } .cls-61 { fill: url(#linear-gradient-54); } .cls-62 { fill: url(#linear-gradient-92); } .cls-63 { fill: url(#linear-gradient-90); } .cls-64 { fill: url(#linear-gradient-33); } .cls-65 { fill: url(#linear-gradient-79); } .cls-66 { fill: url(#linear-gradient-78); } .cls-67 { fill: url(#linear-gradient-51); } .cls-68 { fill: url(#linear-gradient-8); } .cls-69 { fill: url(#linear-gradient-66); } .cls-70 { fill: url(#linear-gradient-57); } .cls-71 { fill: url(#linear-gradient-77); } .cls-72 { fill: url(#linear-gradient-88); } .cls-73 { fill: url(#radial-gradient-2); } .cls-74 { fill: url(#linear-gradient-14); } .cls-75 { fill: url(#linear-gradient-62); } .cls-76 { fill: url(#linear-gradient-29); } .cls-77 { fill: url(#linear-gradient-20); } .cls-78 { fill: url(#radial-gradient-4); } .cls-79 { fill: url(#linear-gradient-67); } .cls-80 { fill: url(#linear-gradient-17); } .cls-81 { fill: url(#linear-gradient-50); } .cls-82 { fill: url(#linear-gradient-7); } .cls-83 { fill: url(#linear-gradient-9); } .cls-84 { fill: #c4aca0; } .cls-85 { fill: url(#linear-gradient-59); } .cls-86 { fill: url(#linear-gradient-11); } .cls-87 { fill: url(#linear-gradient-19); } .cls-88 { fill: url(#linear-gradient-80); } .cls-89 { fill: url(#linear-gradient-6); } .cls-90 { fill: url(#linear-gradient-83); } .cls-91 { fill: url(#linear-gradient-36); } .cls-92 { fill: url(#linear-gradient-21); } .cls-93 { fill: #c5c790; } .cls-94 { fill: url(#linear-gradient-45); } .cls-95 { fill: url(#linear-gradient-85); } .cls-96 { fill: url(#linear-gradient-81); } .cls-97 { fill: #351200; } .cls-98 { fill: url(#linear-gradient-84); } .cls-99 { fill: url(#radial-gradient-6); } .cls-100 { fill: url(#linear-gradient-48); } .cls-101 { fill: url(#linear-gradient-32); } .cls-102 { fill: url(#linear-gradient-86); } .cls-103 { fill: url(#linear-gradient-41); } .cls-104 { fill: url(#linear-gradient-16); } .cls-105 { fill: url(#linear-gradient); } .cls-106 { fill: url(#linear-gradient-23); } .cls-107 { fill: url(#linear-gradient-31); } .cls-108 { fill: url(#linear-gradient-63); } . cls-109 { fill: #f0a212; } .cls-110 { fill: #fc9592; } .cls-111 { fill: url(#linear-gradient-18); } </style> <linearGradient id="linear-gradient" x1="114.18" y1="408.51" x2="116.85" y2="248.85" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#994e08"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-2" x1="83.65" y1="220.59" x2="88.97" y2="360.29" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffffd2"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-3" x1="637.49" y1="218.75" x2="742.76" y2="430.63" xlink:href="#linear-gradient"/> <linearGradient id="linear-gradient-4" x1="316.56" y1="221.21" x2="421.67" y2="432.75" xlink:href="#linear-gradient"/> <linearGradient id="linear-gradient-5" x1="596.52" y1="395.77" x2="587.21" y2="373.16" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-6" x1="688.28" y1="362.2" x2="721.54" y2="312.98" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset="1" stop-color="#bd9581"/> </linearGradient> <linearGradient id="linear-gradient-7" x1="398.84" y1="365.18" x2="378.44" y2="315.63" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-8" x1="116.02" y1="404.17" x2="108.03" y2="382.88" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-9" x1="653.81" y1="353.17" x2="517.54" y2="250.63" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#9a3d00"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-10" x1="22.56" y1="308.18" x2="11.91" y2="325.48" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-11" x1="625.97" y1="105.09" x2="556.79" y2="133.47" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-12" x1="624.42" y1="212.64" x2="584.51" y2="178.94" xlink:href="#linear-gradient-5"/> <radialGradient id="radial-gradient" cx="325.99" cy="440.29" fx="325.99" fy="440.29" r="149.22" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset=".97" stop-color="#e8ba89"/> </radialGradient> <radialGradient id="radial-gradient-2" cx="-106.1" cy="221.25" fx="-106.1" fy="221.25" r="318.51" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffffd2"/> <stop offset="1" stop-color="#d47c1e"/> </radialGradient> <linearGradient id="linear-gradient-13" x1="396.86" y1="237.76" x2="406.62" y2="124.24" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-14" x1="524.04" y1="291.15" x2="547.98" y2="287.61" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-15" x1="416.47" y1="152.66" x2="382.77" y2="293.67" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-16" x1="671.74" y1="278.34" x2="646.91" y2="193.2" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-17" x1="627.04" y1="196.93" x2="623.46" y2="233.5" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#762f00"/> <stop offset="1" stop-color="#b06719"/> </linearGradient> <linearGradient id="linear-gradient-18" x1="388.98" y1="173.58" x2="407.6" y2="70.7" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#edc792"/> <stop offset=".49" stop-color="#ffd47c"/> <stop offset="1" stop-color="#c57200"/> </linearGradient> <radialGradient id="radial-gradient-3" cx="405.18" cy="-112.6" fx="405.18" fy="-112.6" r="272.65" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ba5d0a"/> <stop offset="1" stop-color="#d47c1e"/> </radialGradient> <linearGradient id="linear-gradient-19" x1="487.53" y1="15.64" x2="547.83" y2="135.37" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-20" x1="114.98" y1="404.32" x2="103.92" y2="396.42" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#000"/> <stop offset=".97" stop-color="#6e4110"/> </linearGradient> <linearGradient id="linear-gradient-21" x1="114.91" y1="404.27" x2="104.56" y2="396.88" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#000"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-22" x1="639.98" y1="355" x2="628.92" y2="347.09" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-23" x1="639.91" y1="354.95" x2="629.56" y2="347.55" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-24" x1="668.01" y1="357.15" x2="657.73" y2="349.81" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-25" x1="667.95" y1="357.1" x2="658.33" y2="350.24" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-26" x1="1047.2" y1="1087.46" x2="1041.19" y2="1083.16" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-27" x1="1047.16" y1="1087.43" x2="1041.57" y2="1083.44" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-28" x1="958.57" y1="1105.77" x2="953.74" y2="1102.32" gradientTransform="translate(2112.43 55.46) rotate(118.46) skewX(-.12)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-29" x1="958.56" y1="1105.72" x2="954.12" y2="1102.55" gradientTransform="translate(2112.43 55.46) rotate(118.46) skewX(-.12)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-30" x1="1042.08" y1="1079.86" x2="1036.07" y2="1075.57" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-31" x1="1042.04" y1="1079.84" x2="1036.45" y2="1075.84" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-32" x1="808.54" y1="1064.36" x2="801.09" y2="1059.04" gradientTransform="translate(1915.91 -187.21) rotate(102.15) skewX(-.1)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-33" x1="808.49" y1="1064.33" x2="801.52" y2="1059.35" gradientTransform="translate(1915.91 -187.21) rotate(102.15) skewX(-.1)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-34" x1="491.13" y1="837.78" x2="483.68" y2="832.46" gradientTransform="translate(1087 -554.24) rotate(52.77) skewX(-.22)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-35" x1="491.08" y1="837.75" x2="484.11" y2="832.77" gradientTransform="translate(1087 -554.24) rotate(52.77) skewX(-.22)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-36" x1="677.51" y1="349.9" x2="669.16" y2="343.94" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20…

  'use strict';

  // ===== Utilities =====
  const PI = Math.PI;
  function INT(d){ return Math.floor(d); }

  // ===== Core astronomy helpers =====
  function jdn(dd, mm, yy){
    let a = INT((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    let jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
    return jd;
  }

  function jdn2dateFunc(jd){
    let Z, A, alpha, B, C, D, E, dd, mm, yyyy;
    Z = jd;
    if (Z < 2299161) {
      A = Z;
    } else {
      alpha = INT((Z-1867216.25)/36524.25);
      A = Z + 1 + alpha - INT(alpha/4);
    }
    B = A + 1524;
    C = INT((B-122.1)/365.25);
    D = INT(365.25*C);
    E = INT((B-D)/30.6001);
    dd = INT(B - D - INT(30.6001*E));
    if (E < 14) mm = E - 1; else mm = E - 13;
    if (mm < 3) yyyy = C - 4715; else yyyy = C - 4716;
    return [dd, mm, yyyy];
  }

  function decodeLunarYear(yy, k){
    let monthLengths = [29,30];
    let regularMonths = new Array(12);
    let offsetOfTet = k >> 17;
    let leapMonth = k & 0xf;
    let leapMonthLength = monthLengths[(k >> 16) & 0x1];
    let solarNY = jdn(1,1,yy);
    let currentJD = solarNY + offsetOfTet;
    let j = k >> 4;
    for (let i=0;i<12;i++){
      regularMonths[12 - i - 1] = monthLengths[j & 0x1];
      j >>= 1;
    }
    let ly = [];
    if (leapMonth === 0){
      for (let mm=1; mm<=12; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
    } else {
      for (let mm=1; mm<=leapMonth; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
      ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
      currentJD += leapMonthLength;
      for (let mm=leapMonth+1; mm<=12; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
    }
    return ly;
  }

  function getYearInfo(yyyy){
    let yearCode;
    if (yyyy < 1900) yearCode = TK19[yyyy - 1800];
    else if (yyyy < 2000) yearCode = TK20[yyyy - 1900];
    else if (yyyy < 2100) yearCode = TK21[yyyy - 2000];
    else yearCode = TK22[yyyy - 2100];
    return decodeLunarYear(yyyy, yearCode);
  }

  function LunarDate(dd, mm, yy, leap, jd){
    this.day = dd; this.month = mm; this.year = yy; this.leap = leap; this.jd = jd;
  }

  const FIRST_DAY = jdn(25,1,1800);
  const LAST_DAY = jdn(31,12,2199);

  function findLunarDate(jd, ly){
    if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd){
      return new LunarDate(0,0,0,0,jd);
    }
    let i = ly.length-1;
    while (jd < ly[i].jd) i--;
    let off = jd - ly[i].jd;
    return new LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
  }

  function getLunarDate(dd, mm, yyyy){
    let ly = getYearInfo(yyyy);
    let jd = jdn(dd, mm, yyyy);
    if (jd < ly[0].jd){
      ly = getYearInfo(yyyy - 1);
    }
    return findLunarDate(jd, ly);
  }

  function SunLongitude(jd){
    let T = (jd - 2451545.0) / 36525;
    let T2 = T*T;
    let dr = PI/180;
    let M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2;
    let L0 = 280.46645 + 36000.76983*T + 0.0003032*T2;
    let DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
    DL = DL + (0.019993 - 0.000101*T)*Math.sin(2*dr*M) + 0.000290*Math.sin(3*dr*M);
    let L = (L0 + DL) * dr;
    L = L - PI*2*INT(L/(PI*2));
    return L;
  }

  function getSunLongitude(dayNumber, timeZone){
    return INT(SunLongitude(dayNumber - 0.5 - timeZone/24.0) / PI * 12);
  }

  function getYearCanChi(year){
    return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
  }

  function getCanChi(lunar){
    let dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd+1)%12];
    let monthName = CAN[(lunar.year*12 + lunar.month + 3) % 10] + " " + CHI[(lunar.month+1)%12];
    if (lunar.leap === 1) monthName += " (nhuận)";
    let yearName = getYearCanChi(lunar.year);
    return [dayName, monthName, yearName];
  }

  function getGioHoangDao(jd){
    const chiOfDay = (jd + 1) % 12;
    const gioHD = GIO_HD[chiOfDay % 6];
    let ret = "";
    let count = 0;
    for (let i=0; i<12; i++){
      if (gioHD.charAt(i) === '1'){
        ret += CHI[i] + " " + CHI_EMOJI[i] + 
               ' (' + ((i*2+23)%24) + '-' + ((i*2+1)%24) + 'h)';
        if (count++ < 5) ret += ", ";
      }
    }
    return ret;
  }

  function getCanChiNgay(jd) {
    const can = CAN[(jd + 9) % 10];
    const chi = CHI[(jd + 1) % 12];
    return [can, chi];
  }

  function convertSolar2Lunar(dd, mm, yy) {
    if (typeof getLunarDate === 'function') {
      const lunar = getLunarDate(dd, mm, yy);
      return [lunar.day, lunar.month, lunar.year, lunar.leap];
    }
    return [dd, mm, yy, 0];
  }

  function convertLunar2Solar(dd, mm, yy, leap) {
    if (typeof getYearInfo !== 'function' || typeof jdn2dateFunc !== 'function') {
      return null;
    }
    const ly = getYearInfo(yy);
    const monthInfo = ly.find((item) => item.month === mm && item.leap === leap);
    if (!monthInfo) return null;
    const jd = monthInfo.jd + dd - 1;
    const [day, month, year] = jdn2dateFunc(jd);
    return { day, month, year };
  }

  // ===== UI Rendering =====
  const MONTH_NAMES_VI = ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu",
                          "Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Chạp"];
  const MONTH_NAMES_EN = ["January","February","March","April","May","June",
                          "July","August","September","October","November","December"];

  function printStyle(backgroundType = 'normal'){
    let res = '<style>\n';
    
    // Base styles
    res += `
      :host { display: block; }
      .lunar-card { font-family: Arial, sans-serif; }
      
      /* Main container - Wall calendar style */
      .wall-calendar {
        position: relative;
        width: 100%;
        aspect-ratio: 0.7;
        background: linear-gradient(180deg, #ff6b9d 0%, #ff8fb3 50%, #ffc0d4 100%);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      /* Header section */
      .calendar-header {
        background: rgba(255, 255, 255, 0.9);
        padding: 8px 16px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
      }
      
      .header-month-year {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: clamp(14px, 2.5vw, 18px);
        font-weight: bold;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        background: linear-gradient(90deg, #ff6b9d, #ff8fb3);
        padding: 6px 12px;
        border-radius: 8px 8px 0 0;
        margin: -8px -16px 8px -16px;
      }
      
      .header-month { flex: 1; text-align: left; }
      .header-year { flex: 1; text-align: center; font-size: clamp(18px, 3vw, 24px); }
      .header-en-month { flex: 1; text-align: right; font-size: clamp(12px, 2vw, 16px); }
      
      /* Large date display */
      .large-date-container {
        position: relative;
        padding: 20px;
        text-align: center;
      }
      
      .large-date {
        font-size: clamp(120px, 25vw, 200px);
        font-weight: 900;
        line-height: 0.9;
        color: #fff;
        text-shadow: 
          -3px -3px 0 rgba(255,107,157,0.5),
          3px 3px 0 rgba(255,107,157,0.5),
          0 0 20px rgba(255,255,255,0.5);
        letter-spacing: -0.05em;
      }
      
      /* Center sensor area */
      .center-sensor {
        min-height: 60px;
        padding: 12px 20px;
        margin: 10px 20px;
        background: rgba(255, 255, 255, 0.85);
        border-radius: 8px;
        text-align: center;
        font-size: clamp(13px, 2.2vw, 16px);
        line-height: 1.4;
        color: #c41e3a;
        font-style: italic;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Bottom info section */
      .bottom-info {
        background: rgba(255, 107, 157, 0.85);
        padding: 16px 20px;
        color: #fff;
        border-radius: 0 0 12px 12px;
      }
      
      .weekday-lunar-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
      }
      
      .weekday-box {
        background: rgba(255, 255, 255, 0.25);
        padding: 8px 12px;
        border-radius: 8px;
        text-align: center;
      }
      
      .weekday-label {
        font-size: clamp(11px, 1.8vw, 14px);
        opacity: 0.9;
        display: block;
      }
      
      .weekday-value {
        font-size: clamp(14px, 2.4vw, 18px);
        font-weight: bold;
        display: block;
        margin-top: 2px;
      }
      
      .lunar-date-box {
        background: rgba(255, 255, 255, 0.3);
        padding: 10px;
        border-radius: 8px;
        text-align: center;
      }
      
      .lunar-label {
        font-size: clamp(11px, 1.8vw, 13px);
        opacity: 0.9;
        display: block;
      }
      
      .lunar-day-large {
        font-size: clamp(32px, 6vw, 48px);
        font-weight: 900;
        display: block;
        line-height: 1;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }
      
      .lunar-month {
        font-size: clamp(12px, 2vw, 15px);
        font-weight: bold;
        display: block;
        margin-top: 4px;
      }
      
      .animal-hour {
        font-size: clamp(14px, 2.4vw, 18px);
        display: block;
        margin-top: 4px;
      }
      
      .canchi-box {
        background: rgba(255, 255, 255, 0.25);
        padding: 8px 10px;
        border-radius: 8px;
        text-align: right;
      }
      
      .canchi-item {
        font-size: clamp(11px, 1.9vw, 14px);
        display: block;
        margin: 2px 0;
      }
      
      /* Auspicious hours */
      .auspicious-hours {
        margin-top: 12px;
        background: rgba(0, 0, 0, 0.2);
        padding: 10px 12px;
        border-radius: 6px;
      }
      
      .hours-label {
        font-size: clamp(12px, 2vw, 14px);
        font-weight: bold;
        margin-bottom: 4px;
        display: block;
      }
      
      .hours-content {
        font-size: clamp(10px, 1.7vw, 13px);
        line-height: 1.4;
        opacity: 0.95;
      }
      
      /* Popup styles */
      .ha-popup {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 99999 !important;
        display: none;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
      }
      
      .ha-popup.show { display: flex !important; }
      
      .ha-selector {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 99999 !important;
        display: none;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
      }
      
      .ha-selector.show { display: flex !important; }
      
      .ha-selector-box {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        width: 90%;
        max-width: 400px;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      }
      
      .ha-selector-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 1.3em;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid rgba(0,0,0,0.1);
      }
      
      .ha-popup-close {
        font-size: 28px;
        cursor: pointer;
        padding: 0 8px;
        line-height: 1;
        color: #ff6b9d;
      }
      
      .ha-selector-mode {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        font-weight: 600;
      }
      
      .ha-selector-mode label {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .ha-selector-grid {
        display: grid;
        gap: 12px;
      }
      
      .ha-selector-section {
        border: 2px solid rgba(255, 107, 157, 0.3);
        border-radius: 12px;
        padding: 16px;
      }
      
      .ha-selector-title {
        font-weight: 700;
        margin-bottom: 12px;
        color: #ff6b9d;
        font-size: 1.1em;
      }
      
      .ha-selector-inputs {
        display: grid;
        gap: 10px;
      }
      
      .ha-selector-inputs label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        font-size: 0.95em;
      }
      
      .ha-selector-inputs input[type="number"] {
        width: 120px;
        padding: 8px 12px;
        border-radius: 8px;
        border: 2px solid rgba(0,0,0,0.2);
        font-size: 16px;
        text-align: center;
      }
      
      .ha-selector-checkbox {
        justify-content: flex-start !important;
      }
      
      .ha-selector-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      
      .ha-selector-ok {
        padding: 10px 24px;
        border-radius: 8px;
        border: none;
        background: linear-gradient(135deg, #ff6b9d, #ff8fb3);
        color: #fff;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(255, 107, 157, 0.3);
        transition: transform 0.2s;
      }
      
      .ha-selector-ok:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(255, 107, 157, 0.4);
      }
      
      .ha-selector[data-mode="solar"] .ha-selector-section[data-mode="lunar"] {
        display: none;
      }
      
      .ha-selector[data-mode="lunar"] .ha-selector-section[data-mode="solar"] {
        display: none;
      }
    `;
    
    res += '</style>\n';
    return res;
  }

  function printCalendar(displayDate, centerText = "") {
    const mm = displayDate.getMonth() + 1;
    const yy = displayDate.getFullYear();
    const dd = displayDate.getDate();
    
    const jd = jdn(dd, mm, yy);
    const currentLunarDate = getLunarDate(dd, mm, yy);
    const dow = (currentLunarDate.jd + 1) % 7;
    
    const chiHourIndex = Math.floor(((displayDate.getHours() + 1) % 24) / 2);
    const animalHour = `${CHI_EMOJI[chiHourIndex]} ${CHI[chiHourIndex]}`;
    
    const canChiNgay = `${CAN[(jd + 9) % 10]} ${CHI[(jd+1)%12]}`;
    const canChiThang = getCanChi(currentLunarDate)[1];
    const canChiNam = getYearCanChi(currentLunarDate.year);
    
    const gioHoangDao = getGioHoangDao(jd);
    
    const isLeap = currentLunarDate.leap === 1;
    const lunarMonth = MONTH_NAMES_VI[currentLunarDate.month - 1] + (isLeap ? " Nhuận" : "");
    
    const d_m = `${dd}/${mm}`;
    const idxDL = NGAY_LE_DL.indexOf(d_m);
    const leDuongLich = idxDL !== -1 ? NGAY_LE_DL_STRING[idxDL] : "";
    
    const d_m_al = `${currentLunarDate.day}/${currentLunarDate.month}`;
    const idxAL = NGAY_LE_AL.indexOf(d_m_al);
    const leAmLich = idxAL !== -1 ? NGAY_LE_AL_STRING[idxAL] : "";
    
    let res = `
      <div class="wall-calendar">
        <!-- Header -->
        <div class="calendar-header" onclick="window.haOpenDateSelector && window.haOpenDateSelector(new Date(${yy}, ${mm-1}, ${dd}))">
          <div class="header-month-year">
            <div class="header-month">${MONTH_NAMES_VI[mm-1]}</div>
            <div class="header-year">${yy}</div>
            <div class="header-en-month">${MONTH_NAMES_EN[mm-1]}</div>
          </div>
        </div>
        
        <!-- Large Date -->
        <div class="large-date-container">
          <div class="large-date">${dd}</div>
        </div>
        
        <!-- Center Sensor -->
        <div class="center-sensor">${centerText || 'Người nông nổi, nóng nổi, hẹp hòi thì xử việc, việc hay hỏng, tiếp người, người hay giận, mà chính mình cũng phải thiệt trồi.'}</div>
        
        <!-- Bottom Info -->
        <div class="bottom-info">
          <div class="weekday-lunar-row">
            <!-- Weekday -->
            <div class="weekday-box">
              <span class="weekday-label">CHỦ NHẬT</span>
              <span class="weekday-value">${TUAN[dow].toUpperCase()}</span>
            </div>
            
            <!-- Lunar Date -->
            <div class="lunar-date-box">
              <span class="lunar-label">Mậu Tý</span>
              <span class="lunar-day-large">${currentLunarDate.day}</span>
              <span class="lunar-month">${lunarMonth}</span>
              <span class="animal-hour">${animalHour}</span>
            </div>
            
            <!-- Can Chi -->
            <div class="canchi-box">
              <span class="canchi-item">Ngày: ${canChiNgay}</span>
              <span class="canchi-item">Tháng: ${canChiThang}</span>
              <span class="canchi-item">Năm: ${canChiNam}</span>
            </div>
          </div>
          
          <!-- Auspicious Hours -->
          <div class="auspicious-hours">
            <span class="hours-label">🌟 GIỜ HOÀNG ĐẠO</span>
            <div class="hours-content">${gioHoangDao}</div>
          </div>
          
          ${leDuongLich || leAmLich ? `
          <div style="margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.2); border-radius: 6px; text-align: center; font-size: clamp(11px, 1.9vw, 14px);">
            ${leDuongLich ? `<div>🎉 ${leDuongLich}</div>` : ''}
            ${leAmLich ? `<div>🎊 ${leAmLich}</div>` : ''}
          </div>
          ` : ''}
        </div>
      </div>
    `;
    
    return res;
  }

  // ===== Custom Element =====
  class LunarCalendarCard extends HTMLElement {
    set hass(hass){
      this._hass = hass;
      if (!this.config) return;
      this._render();
    }

    setConfig(config){
      this.config = config;
      if (!this.card){
        this.card = document.createElement('ha-card');
        this.appendChild(this.card);
      }

      // Create date selector popup
      if (!document.getElementById('ha-lich-selector')) {
        const selector = document.createElement('div');
        selector.id = 'ha-lich-selector';
        selector.className = 'ha-selector';
        selector.innerHTML = `
          <div class="ha-selector-box">
            <div class="ha-selector-header">
              <span>📅 Chọn ngày</span>
              <span class="ha-popup-close" onclick="window.haCloseDateSelector()">×</span>
            </div>
            <div class="ha-selector-mode">
              <label><input type="radio" name="ha-date-mode" value="solar" checked onclick="window.haToggleDateMode('solar')" /> Dương lịch</label>
              <label><input type="radio" name="ha-date-mode" value="lunar" onclick="window.haToggleDateMode('lunar')" /> Âm lịch</label>
            </div>
            <div class="ha-selector-grid">
              <div class="ha-selector-section" data-mode="solar">
                <div class="ha-selector-title">Dương lịch</div>
                <div class="ha-selector-inputs">
                  <label>Ngày <input id="ha-solar-day" type="number" min="1" max="31"></label>
                  <label>Tháng <input id="ha-solar-month" type="number" min="1" max="12"></label>
                  <label>Năm <input id="ha-solar-year" type="number" min="1800" max="2199"></label>
                </div>
              </div>
              <div class="ha-selector-section" data-mode="lunar">
                <div class="ha-selector-title">Âm lịch</div>
                <div class="ha-selector-inputs">
                  <label>Ngày <input id="ha-lunar-day" type="number" min="1" max="30"></label>
                  <label>Tháng <input id="ha-lunar-month" type="number" min="1" max="12"></label>
                  <label>Năm <input id="ha-lunar-year" type="number" min="1800" max="2199"></label>
                  <label class="ha-selector-checkbox"><input id="ha-lunar-leap" type="checkbox"> Tháng nhuận</label>
                </div>
              </div>
            </div>
            <div class="ha-selector-actions">
              <button class="ha-selector-ok" onclick="window.haApplyDateSelection()">OK</button>
            </div>
          </div>
        `;
        document.body.appendChild(selector);
      }
    }

    setDisplayDate(date){
      if (!(date instanceof Date) || isNaN(date.getTime())) return;
      this.displayDate = date;
      this._render();
    }

    _render(){
      const displayDate = this.displayDate || new Date();
      const centerText = this.config?.center_text
        || (this.config?.center_entity && this._hass?.states?.[this.config.center_entity]?.state)
        || "";

      const backgroundType = this.config.background || 'normal';

      const html = [
        printStyle(backgroundType),
        printCalendar(displayDate, centerText)
      ].join('');

      this.card.innerHTML = `<div class="lunar-card">${html}</div>`;
    }

    getCardSize(){ return 6; }
  }

  if (!customElements.get('lich-block-am-duong-viet-nam')){
    customElements.define('lich-block-am-duong-viet-nam', LunarCalendarCard);
  }

  // ===== Global Functions =====
  window.haToggleDateMode = function(mode) {
    const selector = document.getElementById('ha-lich-selector');
    if (!selector) return;
    selector.dataset.mode = mode;
  };

  window.haOpenDateSelector = function(dateObj) {
    const selector = document.getElementById('ha-lich-selector');
    if (!selector || !(dateObj instanceof Date)) return;
    selector.classList.add('show');
    selector.dataset.mode = 'solar';

    const solarDay = selector.querySelector('#ha-solar-day');
    const solarMonth = selector.querySelector('#ha-solar-month');
    const solarYear = selector.querySelector('#ha-solar-year');
    if (solarDay) solarDay.value = dateObj.getDate();
    if (solarMonth) solarMonth.value = dateObj.getMonth() + 1;
    if (solarYear) solarYear.value = dateObj.getFullYear();

    const [lDay, lMonth, lYear, lLeap] = convertSolar2Lunar(
      dateObj.getDate(),
      dateObj.getMonth() + 1,
      dateObj.getFullYear()
    );
    const lunarDay = selector.querySelector('#ha-lunar-day');
    const lunarMonth = selector.querySelector('#ha-lunar-month');
    const lunarYear = selector.querySelector('#ha-lunar-year');
    const lunarLeap = selector.querySelector('#ha-lunar-leap');
    if (lunarDay) lunarDay.value = lDay;
    if (lunarMonth) lunarMonth.value = lMonth;
    if (lunarYear) lunarYear.value = lYear;
    if (lunarLeap) lunarLeap.checked = lLeap === 1;
  };

  window.haCloseDateSelector = function() {
    const selector = document.getElementById('ha-lich-selector');
    if (selector) selector.classList.remove('show');
  };

  window.haApplyDateSelection = function() {
    const selector = document.getElementById('ha-lich-selector');
    if (!selector) return;
    const mode = selector.dataset.mode || 'solar';
    let selectedDate = null;

    if (mode === 'solar') {
      const day = parseInt(selector.querySelector('#ha-solar-day')?.value, 10);
      const month = parseInt(selector.querySelector('#ha-solar-month')?.value, 10);
      const year = parseInt(selector.querySelector('#ha-solar-year')?.value, 10);
      if (!Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)) {
        selectedDate = new Date(year, month - 1, day);
      }
    } else {
      const day = parseInt(selector.querySelector('#ha-lunar-day')?.value, 10);
      const month = parseInt(selector.querySelector('#ha-lunar-month')?.value, 10);
      const year = parseInt(selector.querySelector('#ha-lunar-year')?.value, 10);
      const leap = selector.querySelector('#ha-lunar-leap')?.checked ? 1 : 0;
      if (!Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)) {
        const solar = convertLunar2Solar(day, month, year, leap);
        if (solar) {
          selectedDate = new Date(solar.year, solar.month - 1, solar.day);
        }
      }
    }

    if (selectedDate && window.haDateSelectorTarget?.setDisplayDate) {
      window.haDateSelectorTarget.setDisplayDate(selectedDate);
    }
    window.haCloseDateSelector();
  };

  // Store target reference
  document.addEventListener('click', function(e) {
    const card = e.target.closest('lich-block-am-duong-viet-nam');
    if (card) {
      window.haDateSelectorTarget = card;
    }
  });


})();
