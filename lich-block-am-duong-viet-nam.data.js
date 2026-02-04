// Dữ liệu tách riêng để dễ debug
// ===== Data tables (Hồ Ngọc Đức) =====
  export const ABOUT = "Âm lịch Việt Nam Home Assistant - Ver 20Aug2025 © 2025 Nguyễn Tiến Khải";

  // TK19: Years 1800-1899 (kept for completeness, used for <1900)
  export const TK19 = [
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
  export const TK20 = [
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
  export const TK21 = [
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
  export const TK22 = [
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

  export const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
  export const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
  // Mảng emoji riêng
  export const CHI_EMOJI = ["🐭","🐂","🐯","🐱","🐲","🐍","🐴","🐐","🐵","🐔","🐶","🐷"];
  export const TUAN = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
  export const GIO_HD = ["110100101100","001101001011","110011010010","101100110100","001011001101","010010110011"]; // Ty..Hoi

  export const TIETKHI = [
    "Xuân Phân","Thanh Minh","Cốc Vũ","Lập Hạ","Tiểu Mãn","Mang Chủng",
    "Hạ Chí","Tiểu Thử","Đại Thử","Lập Thu","Xử Thử","Bạch Lộ",
    "Thu Phân","Hàn lộ","Sương Giáng","Lập đông","Tiểu Tuyết","Đại Tuyết",
    "Đông Chí","Tiểu Hàn","Đại Hàn","Lập Xuân","Vũ Thủy","Kinh Trập"
  ];

  export const NGAY_LE_DL = [
    "1/1","9/1","3/2","14/2","27/2","8/3","20/3","22/3","26/3","31/3","1/4","30/4","1/5","7/5","12/5","19/5","1/6","18/6","21/6","28/6","11/7","27/7","28/7","19/8","2/9","10/9","1/10","10/10","13/10","16/10","17/10","20/10","31/10","9/11","19/11","20/11","23/11","28/11","29/11","1/12","19/12","25/12","22/12"
  ];
  export const NGAY_LE_DL_STRING = [
    "Tết Dương lịch","Truyền thống học sinh, sinh viên Việt Nam","Thành lập Đảng Cộng Sản Việt Nam","Lễ tình nhân","Thầy thuốc Việt Nam","Quốc tế Phụ nữ","Quốc tế Hạnh phúc","Nước sạch Thế giới","Thành lập Đoàn TNCS Hồ Chí Minh","Lễ Phục Sinh","Cá tháng Tư","Giải phóng Miền Nam","Quốc tế Lao động","Chiến thắng Điện Biên Phủ","Ngày của Mẹ","Ngày sinh Chủ tịch Hồ Chí Minh","Quốc tế Thiếu Nhi","Ngày của Cha","Báo chí Việt Nam","Gia đình Việt Nam","Dân số thế giới","Thương binh liệt sĩ","Thành lập công đoàn Việt Nam","Kỷ niệm Cách mạng Tháng 8 thành công","Quốc Khánh","Thành lập Mặt trận Tổ quốc Việt Nam","Quốc tế người cao tuổi","Ngày giải phóng Thủ Đô","Doanh nhân Việt Nam","Ngày Lương thực thế giới","Ngày quốc tế xóa nghèo","Phụ nữ Việt Nam (20.10.1930)","Halloween","Pháp luật Việt Nam","Quốc tế Nam giới","Nhà giáo Việt Nam","Thành lập Hội chữ thập đỏ Việt Nam","Lễ Tạ Ơn","Black Friday","Thế giới phòng chống AIDS","Toàn quốc kháng chiến","Lễ Giáng Sinh","Thành lập Quân đội nhân dân Việt Nam"
  ];
  export const NGAY_LE_AL = ["1/1","15/1","3/3","10/3","15/4","5/5","7/7","15/7","15/8","9/9","10/10","15/10","23/12"];
  export const NGAY_LE_AL_STRING = ["Tết Nguyên Đán","Tết Nguyên Tiêu","Tết Hàn Thực, Tiết Thanh Minh","Giỗ tổ Hùng Vương","Lễ Phật Đản","Tết Đoan Ngọ","Lễ Thất Tịch","Lễ Vu Lan","Tết Trung Thu","Tết Trùng Cửu","Tết Trùng Thập","Tết Hạ Nguyên","Ông Táo Về Trời"];










// ===== Thập nhị trực =====
export const THAP_NHI_TRUC = {
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
export const NHI_THAP_BAT_TU = {
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
export const CAT_TINH = {
  "Thiên Đức": "Tốt mọi việc, nhất là cầu tài, cầu phúc",
  "Nguyệt Đức": "Cưới hỏi, cầu phúc, khai trương",
  "Thiên Hỷ": "Hỷ sự, cưới hỏi, gặp gỡ",
  "Tam Hợp": "Mọi việc hanh thông, cầu tài lộc thuận",
  "Lục Hợp": "Hòa thuận, cưới hỏi, giao dịch"
};

export const HUNG_TINH = {
  "Thiên Cương": "Hung sự, kỵ xây dựng, khai trương",
  "Địa Tặc": "Kỵ xuất hành, mất mát",
  "Nguyệt Kỵ": "Ngày xấu, đại kỵ khởi sự lớn",
  "Không Vong": "Kỵ giao dịch, ký kết",
  "Tiểu Hồng Sa": "Kỵ cưới hỏi"
};

export const THAN_SAT = {
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
