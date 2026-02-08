// Lịch Âm Dương Việt Nam - Enhanced Version
// Phát triển dựa trên code của Nguyễn Tiến Khải
// Version: 2.1 - February 2026 - TRANSPARENT BACKGROUND SUPPORT

(function(){
  'use strict';

  // ===== LUNAR CALENDAR DATA =====
  const PI = Math.PI;
  function INT(d) { return Math.floor(d); }

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

  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const TUAN_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const TUAN_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const GIO_HD = ["110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011"];
  const THANG_AM = ["", "Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Một", "Chạp"];

  const DEFAULT_QUOTES = [
    { text: "Người nóng nảy, nóng nổi, hẹp hòi thì xử việc, việc hay hỏng, tiếp người, người hay giận, mà chính mình cũng phải thiệt trời.", author: "Lã Khân" },
    { text: "Học, học nữa, học mãi.", author: "V.I. Lenin" },
    { text: "Không có gì quý hơn độc lập tự do.", author: "Hồ Chí Minh" },
    { text: "Thất bại là mẹ thành công.", author: "Tục ngữ Việt Nam" },
    { text: "Học thầy không tày học bạn.", author: "Tục ngữ Việt Nam" },
    { text: "Ăn quả nhớ kẻ trồng cây.", author: "Tục ngữ Việt Nam" },
    { text: "Có công mài sắt có ngày nên kim.", author: "Tục ngữ Việt Nam" },
    { text: "Uống nước nhớ nguồn.", author: "Tục ngữ Việt Nam" }
  ];

  const NGAY_LE_DL = [
    "1/1", "9/1", "3/2", "14/2", "27/2", "8/3", "20/3", "22/3", "26/3", "31/3", "1/4", "30/4", "1/5", "7/5", "12/5", "19/5", "1/6", "18/6", "21/6", "28/6", "11/7", "27/7", "28/7", "19/8", "2/9", "10/9", "1/10", "10/10", "13/10", "16/10", "17/10", "20/10", "31/10", "9/11", "19/11", "20/11", "23/11", "28/11", "29/11", "1/12", "19/12", "25/12", "22/12"
  ];

  const NGAY_LE_DL_STRING = [
    "Tết Dương lịch", "Ngày học sinh sinh viên VN", "Thành lập Đảng CSVN", "Lễ tình nhân", "Ngày thầy thuốc VN", "Quốc tế Phụ nữ", "Quốc tế Hạnh phúc", "Ngày nước sạch TG", "Thành lập Đoàn TNCS HCM", "Lễ Phục Sinh", "Cá tháng Tư", "Giải phóng Miền Nam", "Quốc tế Lao động", "Chiến thắng Điện Biên Phủ", "Ngày của Mẹ", "Ngày sinh Chủ tịch HCM", "Quốc tế Thiếu Nhi", "Ngày của Cha", "Báo chí Việt Nam", "Gia đình Việt Nam", "Dân số thế giới", "Thương binh liệt sĩ", "Thành lập công đoàn VN", "Cách mạng Tháng 8", "Quốc Khánh", "Thành lập Mặt trận Tổ quốc", "Quốc tế người cao tuổi", "Giải phóng Thủ Đô", "Doanh nhân Việt Nam", "Lương thực thế giới", "Quốc tế xóa nghèo", "Phụ nữ Việt Nam", "Halloween", "Pháp luật Việt Nam", "Quốc tế Nam giới", "Nhà giáo Việt Nam", "Thành lập Hội chữ thập đỏ", "Lễ Tạ Ơn", "Black Friday", "Thế giới phòng chống AIDS", "Toàn quốc kháng chiến", "Lễ Giáng Sinh", "Thành lập Quân đội nhân dân VN"
  ];

  const NGAY_LE_AL = ["1/1", "15/1", "3/3", "10/3", "15/4", "5/5", "7/7", "15/7", "15/8", "9/9", "10/10", "15/10", "23/12"];
  const NGAY_LE_AL_STRING = ["Tết Nguyên Đán", "Tết Nguyên Tiêu", "Tết Hàn Thực, Thanh Minh", "Giỗ tổ Hùng Vương", "Lễ Phật Đản", "Tết Đoan Ngọ", "Lễ Thất Tịch", "Lễ Vu Lan", "Tết Trung Thu", "Tết Trùng Cửu", "Tết Trùng Thập", "Tết Hạ Nguyên", "Ông Táo Về Trời"];

  // ===== LUNAR CALCULATION FUNCTIONS =====
  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }

  function getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone / 24);
  }

  function getLunarMonth11(yy, timeZone) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = INT(getSunLongitude(nm, timeZone) / 30);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = INT(getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) / 30);
    do {
      last = arc;
      i++;
      arc = INT(getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) / 30);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  function getSunLongitude(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * (INT(L / (PI * 2)));
    return INT(L / PI * 6);
  }

  function getMonthDays(mm, yy) {
    const k = INT(0.5 + (jdFromDate(1, 1, yy) - 2415021.076998695) / 29.530588853);
    let monthStart, monthEnd;
    if (mm < 11) {
      monthStart = getNewMoonDay(k + mm, 7);
      monthEnd = getNewMoonDay(k + mm + 1, 7);
    } else {
      monthStart = getNewMoonDay(k + mm, 7);
      monthEnd = getLunarMonth11(yy + 1, 7);
    }
    return monthEnd - monthStart;
  }

  function getLunarMonthAndYear(jd, timeZone) {
    const year = jdToDate(jd)[2];
    const a11 = getLunarMonth11(year, timeZone);
    const b11 = getLunarMonth11(year - 1, timeZone);
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let off, lunarYear, lunarMonth, lunarLeap;

    if (jd < a11) {
      off = jd - b11;
      lunarYear = year - 1;
    } else {
      off = jd - a11;
      lunarYear = year;
    }

    const k = INT(off / 29.0 + 0.5);
    lunarMonth = k - leapOff;

    if (lunarMonth === 0) {
      lunarMonth = 12;
    }
    if (k === leapOff && leapOff > 0) {
      lunarMonth = k - leapOff + 1;
      lunarLeap = 1;
    } else {
      lunarLeap = 0;
    }

    return [lunarMonth, lunarYear, lunarLeap];
  }

  function convertSolar2Lunar(dd, mm, yy, timeZone) {
    const jd = jdFromDate(dd, mm, yy);
    const [lunarMonth, lunarYear, lunarLeap] = getLunarMonthAndYear(jd, timeZone);
    const a11 = getLunarMonth11(lunarYear, timeZone);
    const b11 = getLunarMonth11(lunarYear - 1, timeZone);
    const leapOff = getLeapMonthOffset(a11, timeZone);

    let monthStart;
    if (jd < a11) {
      monthStart = b11 + INT((lunarMonth + leapOff) * 29.530588853 + 0.5);
    } else {
      monthStart = a11 + INT((lunarMonth + leapOff - 12) * 29.530588853 + 0.5);
    }

    const lunarDay = jd - monthStart + 1;
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }

  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) {
      a = jd + 32044;
      b = INT((4 * a + 3) / 146097);
      c = a - INT((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    const d = INT((4 * c + 3) / 1461);
    const e = c - INT((1461 * d) / 4);
    const m = INT((5 * e + 2) / 153);
    const day = e - INT((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * INT(m / 10);
    const year = b * 100 + d - 4800 + INT(m / 10);
    return [day, month, year];
  }

  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
    if (lunarMonth < 1 || lunarMonth > 12 || lunarDay < 1 || lunarDay > 30) {
      return [0, 0, 0];
    }

    const a11 = getLunarMonth11(lunarYear, timeZone);
    const b11 = getLunarMonth11(lunarYear - 1, timeZone);
    const leapOff = getLeapMonthOffset(a11, timeZone);

    let monthStart;
    if (lunarMonth < 11) {
      monthStart = a11 + INT((lunarMonth + leapOff - 12) * 29.530588853 + 0.5);
    } else {
      monthStart = b11 + INT((lunarMonth + leapOff) * 29.530588853 + 0.5);
    }

    const jd = monthStart + lunarDay - 1;
    return jdToDate(jd);
  }

  function getCanChiYear(year) {
    return CAN[(year + 6) % 10] + ' ' + CHI[(year + 8) % 12];
  }

  function getCanChiMonth(month, year) {
    const canIndex = (year * 12 + month + 3) % 10;
    const chiIndex = (month + 1) % 12;
    return CAN[canIndex] + ' ' + CHI[chiIndex];
  }

  function getCanChiDay(jd) {
    const canIndex = (jd + 9) % 10;
    const chiIndex = (jd + 1) % 12;
    return CAN[canIndex] + ' ' + CHI[chiIndex];
  }

  function getGioHoangDao(jd) {
    const chiIndex = (jd + 1) % 12;
    const gioHD = GIO_HD[chiIndex % 6];
    const ret = [];
    for (let i = 0; i < 12; i++) {
      if (gioHD.charAt(i) === '1') {
        ret.push(CHI[i]);
      }
    }
    return ret;
  }

  function getFestivals(dd, mm, ld, lm) {
    const festivals = [];
    const solarKey = mm + '/' + dd;
    const lunarKey = lm + '/' + ld;

    const solarIndex = NGAY_LE_DL.indexOf(solarKey);
    if (solarIndex >= 0) {
      festivals.push(NGAY_LE_DL_STRING[solarIndex]);
    }

    const lunarIndex = NGAY_LE_AL.indexOf(lunarKey);
    if (lunarIndex >= 0) {
      festivals.push(NGAY_LE_AL_STRING[lunarIndex]);
    }

    return festivals;
  }

  // ===== WEB COMPONENT =====
  class LichAmDuongCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.currentDate = new Date();
      this.isLunarMode = false;
    }

    setConfig(config) {
      if (!config) {
        throw new Error('Invalid configuration');
      }

      this.config = {
        background: config.background || 'normal',
        background_opacity: config.background_opacity !== undefined ? config.background_opacity : 0,
        quote_entity: config.quote_entity || ''
      };

      this.render();
      
      // Wait for render to complete before updating
      setTimeout(() => {
        this.updateCalendar();
      }, 50);
    }

    getQuoteFromSensor() {
      if (this.config.quote_entity && this.hass) {
        const state = this.hass.states[this.config.quote_entity];
        if (state && state.state) {
          const attrs = state.attributes || {};
          return {
            text: state.state,
            author: attrs.author || attrs.attribution || 'Tác giả ẩn danh'
          };
        }
      }

      const randomIndex = Math.floor(Math.random() * DEFAULT_QUOTES.length);
      return DEFAULT_QUOTES[randomIndex];
    }

    set hass(hass) {
      this._hass = hass;
      if (this.config && this.config.quote_entity) {
        const state = hass.states[this.config.quote_entity];
        if (state && state.state !== this._lastQuoteState) {
          this._lastQuoteState = state.state;
          this.updateCalendar();
        }
      }
    }

    get hass() {
      return this._hass;
    }

    render() {
      const bgType = this.config.background;
      const opacity = this.config.background_opacity;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .calendar-wrapper {
            padding: 0;
            box-sizing: border-box;
            border-radius: 16px;
          }

          /* Background styles */
          ${bgType === 'transparent' ? `
            .calendar-wrapper {
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
          ` : `
            .calendar-wrapper {
              background: var(--ha-card-background, #fff);
            }
          `}

          .calendar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            min-height: 500px;
          }

          .month-year-section {
            text-align: center;
            margin-bottom: 20px;
          }

          .month-year-vi {
            font-size: 1.8em;
            font-weight: bold;
            margin: 0;
            color: ${bgType === 'transparent' ? '#ffffff' : 'var(--primary-text-color, #000)'};
          }

          .month-year-en {
            font-size: 1.1em;
            font-weight: 300;
            opacity: 0.8;
            margin: 5px 0;
            color: ${bgType === 'transparent' ? '#ffffff' : 'var(--primary-text-color, #000)'};
          }

          .main-display {
            display: flex;
            gap: 30px;
            width: 100%;
            max-width: 900px;
            margin-bottom: 20px;
          }

          .left-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .solar-day-large {
            font-size: 8em;
            font-weight: bold;
            line-height: 1;
            margin: 10px 0;
            color: ${bgType === 'transparent' ? '#ffff99' : '#FFC000'};
          }

          .solar-day-large.sunday {
            color: #e74c3c !important;
          }

          .solar-day-large.new-day {
            color: ${bgType === 'transparent' ? '#ffff99' : '#3498db'} !important;
          }

          .quote-section {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            background: ${bgType === 'transparent' ? 'transparent' : 'rgba(100,100,100,0.1)'};
            max-width: 300px;
          }

          .quote-text {
            font-style: italic;
            margin-bottom: 8px;
            font-size: 0.95em;
            color: ${bgType === 'transparent' ? '#ffff99' : 'var(--primary-text-color, #333)'};
          }

          .quote-author {
            font-size: 0.85em;
            opacity: 0.8;
            color: ${bgType === 'transparent' ? '#ffffff' : 'var(--secondary-text-color, #666)'};
          }

          .right-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .weekday-section {
            text-align: center;
          }

          .weekday-en {
            font-size: 2em;
            font-weight: 600;
            margin: 0;
            color: ${bgType === 'transparent' ? '#ffffff' : 'var(--primary-text-color, #000)'};
          }

          .weekday-vi {
            font-size: 1.2em;
            font-weight: 300;
            opacity: 0.9;
            margin: 0;
            color: ${bgType === 'transparent' ? '#ffffff' : 'var(--primary-text-color, #000)'};
          }

          .weekday-en.sunday, .weekday-vi.sunday {
            color: #e74c3c;
          }

          .festivals-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .festival-item {
            background: rgba(231, 76, 60, 0.1);
            padding: 8px 12px;
            border-radius: 5px;
            border-left: 3px solid #e74c3c;
            font-size: 0.9em;
            color: ${bgType === 'transparent' ? '#ffffff' : 'inherit'};
          }

          .lunar-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            padding: 15px;
            border-radius: 8px;
            background: ${bgType === 'transparent' ? 'transparent' : 'rgba(255,255,255,0.1)'};
            ${bgType === 'transparent' ? 'border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
          }

          .lunar-info-item {
            display: flex;
            flex-direction: column;
          }

          .lunar-label {
            font-size: 0.75em;
            opacity: 0.7;
            margin-bottom: 3px;
            color: ${bgType === 'transparent' ? '#ffffff' : 'inherit'};
          }

          .lunar-value {
            font-size: 1.1em;
            font-weight: 600;
            color: ${bgType === 'transparent' ? '#ffff99' : '#0066cc'};
          }

          .lunar-day-big {
            font-size: 3em;
            font-weight: bold;
            color: #e74c3c;
          }

          .controls-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 600px;
            margin-top: 20px;
            background: ${bgType === 'transparent' ? 'transparent' : 'rgba(255,255,255,0.05)'};
            padding: 15px;
            border-radius: 8px;
            ${bgType === 'transparent' ? 'border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
          }

          .nav-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
          }

          button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s;
            background: ${bgType === 'transparent' ? 'rgba(255, 255, 255, 0.1)' : 'var(--primary-color, #3498db)'};
            color: ${bgType === 'transparent' ? '#ffffff' : 'white'};
          }

          button:hover {
            transform: translateY(-2px);
            background: ${bgType === 'transparent' ? 'rgba(255, 255, 255, 0.2)' : 'var(--primary-color, #2980b9)'};
          }

          .date-input-section {
            display: none;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            padding: 10px;
            background: ${bgType === 'transparent' ? 'transparent' : 'rgba(255,255,255,0.05)'};
            border-radius: 8px;
            margin-top: 5px;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 0.3s ease, max-height 0.3s ease;
          }

          .date-input-section.show {
            display: flex;
            opacity: 1;
            max-height: 200px;
          }

          .toggle-mode {
            display: flex;
            gap: 10px;
            width: 100%;
          }

          .toggle-mode button {
            flex: 1;
          }

          .toggle-mode button.active {
            background: #e74c3c;
          }

          .date-inputs {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          input[type="number"] {
            width: 80px;
            padding: 8px;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 5px;
            text-align: center;
            font-size: 1em;
            background: ${bgType === 'transparent' ? 'rgba(255,255,255,0.1)' : 'white'};
            color: ${bgType === 'transparent' ? '#ffffff' : '#000'};
          }

          .toggle-date-picker {
            width: 100%;
            background: ${bgType === 'transparent' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 255, 0.2)'};
            color: ${bgType === 'transparent' ? '#ffffff' : 'white'};
          }

          .hidden {
            display: none;
          }

          @media (max-width: 768px) {
            .main-display {
              flex-direction: column;
              gap: 20px;
            }

            .solar-day-large {
              font-size: 6em;
            }

            .weekday-en {
              font-size: 1.5em;
            }
          }
        </style>

        <div class="calendar-wrapper">
          <div class="calendar-container">
            <div class="month-year-section">
              <h2 class="month-year-vi" id="monthYearVi">Loading...</h2>
              <p class="month-year-en" id="monthYearEn"></p>
            </div>

            <div class="main-display">
              <div class="left-panel">
                <div id="solarDay" class="solar-day-large">1</div>
                <div class="quote-section">
                  <div class="quote-text" id="quoteText"></div>
                  <div class="quote-author" id="quoteAuthor"></div>
                </div>
              </div>

              <div class="right-panel">
                <div class="weekday-section">
                  <div id="weekdayEn" class="weekday-en">Monday</div>
                  <div id="weekdayVi" class="weekday-vi">Thứ Hai</div>
                </div>

                <div id="festivalsRow" class="festivals-row"></div>

                <div class="lunar-info">
                  <div class="lunar-info-item">
                    <span class="lunar-label">Ngày âm</span>
                    <span class="lunar-value lunar-day-big" id="lunarDay">1</span>
                  </div>
                  <div class="lunar-info-item">
                    <span class="lunar-label">Tháng âm</span>
                    <span class="lunar-value" id="lunarMonth">Giêng</span>
                  </div>
                  <div class="lunar-info-item">
                    <span class="lunar-label">Ngày Can Chi</span>
                    <span class="lunar-value" id="dayCanChi">Giáp Tý</span>
                  </div>
                  <div class="lunar-info-item">
                    <span class="lunar-label">Tháng Can Chi</span>
                    <span class="lunar-value" id="monthCanChi">Bính Dần</span>
                  </div>
                  <div class="lunar-info-item">
                    <span class="lunar-label">Năm Can Chi</span>
                    <span class="lunar-value" id="yearCanChi">Giáp Thìn</span>
                  </div>
                  <div class="lunar-info-item">
                    <span class="lunar-label">Giờ hoàng đạo</span>
                    <span class="lunar-value" id="gioHoangDao">Tý, Sửu, Dần</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="controls-section">
              <div class="nav-buttons">
                <button id="btnPrevDay">← Ngày trước</button>
                <button id="btnToday">Hôm nay</button>
                <button id="btnNextDay">Ngày sau →</button>
              </div>

              <button class="toggle-date-picker" id="btnTogglePicker">Chọn ngày 🔽</button>

              <div class="date-input-section" id="datePickerSection">
                <div class="toggle-mode">
                  <button id="toggleSolar" class="active">Dương lịch</button>
                  <button id="toggleLunar">Âm lịch</button>
                </div>

                <div class="date-inputs" id="solarInputs">
                  <input type="number" id="inputDay" min="1" max="31" value="1" />
                  <span>/</span>
                  <input type="number" id="inputMonth" min="1" max="12" value="1" />
                  <span>/</span>
                  <input type="number" id="inputYear" min="1900" max="2100" value="2024" />
                  <button id="btnGotoSolar">Đi tới</button>
                </div>

                <div class="date-inputs hidden" id="lunarInputs">
                  <input type="number" id="inputLunarDay" min="1" max="30" value="1" />
                  <span>/</span>
                  <input type="number" id="inputLunarMonth" min="1" max="12" value="1" />
                  <span>/</span>
                  <input type="number" id="inputLunarYear" min="1900" max="2100" value="2024" />
                  <button id="btnGotoLunar">Đi tới</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this.setupEventListeners();
    }

    setupEventListeners() {
      const $ = (id) => this.shadowRoot.getElementById(id);

      $('btnPrevDay').addEventListener('click', () => this.changeDay(-1));
      $('btnNextDay').addEventListener('click', () => this.changeDay(1));
      $('btnToday').addEventListener('click', () => this.gotoToday());
      $('btnGotoSolar').addEventListener('click', () => this.gotoDate());
      $('btnGotoLunar').addEventListener('click', () => this.gotoDate());
      $('toggleSolar').addEventListener('click', () => this.toggleInputMode(false));
      $('toggleLunar').addEventListener('click', () => this.toggleInputMode(true));
      
      $('btnTogglePicker').addEventListener('click', () => {
        const section = $('datePickerSection');
        const btn = $('btnTogglePicker');
        
        if (section.classList.contains('show')) {
          section.classList.remove('show');
          btn.textContent = 'Chọn ngày 🔽';
        } else {
          section.classList.add('show');
          btn.textContent = 'Thu gọn 🔼';
        }
      });
    }

    toggleInputMode(isLunar) {
      this.isLunarMode = isLunar;
      const $ = (id) => this.shadowRoot.getElementById(id);
      
      const solarInputs = $('solarInputs');
      const lunarInputs = $('lunarInputs');
      const toggleSolar = $('toggleSolar');
      const toggleLunar = $('toggleLunar');

      if (isLunar) {
        solarInputs.classList.add('hidden');
        lunarInputs.classList.remove('hidden');
        toggleSolar.classList.remove('active');
        toggleLunar.classList.add('active');
      } else {
        solarInputs.classList.remove('hidden');
        lunarInputs.classList.add('hidden');
        toggleSolar.classList.add('active');
        toggleLunar.classList.remove('active');
      }
    }

    gotoDate() {
      const $ = (id) => this.shadowRoot.getElementById(id);
      
      if (this.isLunarMode) {
        const lunarDay = parseInt($('inputLunarDay').value);
        const lunarMonth = parseInt($('inputLunarMonth').value);
        const lunarYear = parseInt($('inputLunarYear').value);
        
        const solar = convertLunar2Solar(lunarDay, lunarMonth, lunarYear, 0, 7);
        
        if (solar[0] === 0) {
          alert('Ngày âm lịch không hợp lệ!');
          return;
        }
        
        this.currentDate = new Date(solar[2], solar[1] - 1, solar[0]);
        this.updateCalendar();
      } else {
        const day = parseInt($('inputDay').value);
        const month = parseInt($('inputMonth').value);
        const year = parseInt($('inputYear').value);

        if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
          const newDate = new Date(year, month - 1, day);
          if (newDate.getMonth() === month - 1) {
            this.currentDate = newDate;
            this.updateCalendar();
          } else {
            alert('Ngày không hợp lệ!');
          }
        } else {
          alert('Vui lòng nhập ngày hợp lệ!');
        }
      }
    }

    changeDay(delta) {
      this.currentDate.setDate(this.currentDate.getDate() + delta);
      this.updateCalendar();
    }

    gotoToday() {
      this.currentDate = new Date();
      this.updateCalendar();
    }

    updateCalendar() {
      // Wait for DOM to be ready
      if (!this.shadowRoot) return;
      
      const $ = (id) => this.shadowRoot.getElementById(id);
      
      // Check if elements exist
      if (!$('monthYearVi')) {
        // DOM not ready yet, try again in a moment
        setTimeout(() => this.updateCalendar(), 100);
        return;
      }
      
      const dd = this.currentDate.getDate();
      const mm = this.currentDate.getMonth() + 1;
      const yy = this.currentDate.getFullYear();
      const dayOfWeek = this.currentDate.getDay();

      const lunar = convertSolar2Lunar(dd, mm, yy, 7);
      const lunarDay = lunar[0];
      const lunarMonth = lunar[1];
      const lunarYear = lunar[2];
      const lunarLeap = lunar[3];

      const jd = jdFromDate(dd, mm, yy);
      const canChiYear = getCanChiYear(lunarYear);
      const canChiMonth = getCanChiMonth(lunarMonth, lunarYear);
      const canChiDay = getCanChiDay(jd);
      const canChiHour = CAN[(jd + 9) % 10];
      
      const gioHoangDao = getGioHoangDao(jd);
      const line1 = gioHoangDao.slice(0, 3).join(', ');
      const line2 = gioHoangDao.slice(3).join(', ');
      
      let lunarMonthName = THANG_AM[lunarMonth];
      if (lunarLeap) lunarMonthName = 'Nhuận ' + lunarMonthName;
      
      const monthDays = getMonthDays(lunarMonth, lunarYear);
      const monthType = monthDays === 30 ? "(Đ)" : "(T)";
      
      const festivals = getFestivals(dd, mm, lunarDay, lunarMonth);
      const quote = this.getQuoteFromSensor();

      const monthsVi = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 
                        'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

      $('monthYearVi').textContent = `${monthsVi[mm - 1]} ${yy}`;
      $('monthYearEn').textContent = monthsEn[mm - 1];
      
      const solarDayEl = $('solarDay');
      solarDayEl.textContent = dd;
      solarDayEl.className = 'solar-day-large';
      if (dayOfWeek === 0) solarDayEl.classList.add('sunday');
      else if (dd === 1) solarDayEl.classList.add('new-day');
      
      $('quoteText').textContent = quote.text;
      $('quoteAuthor').textContent = quote.author;
      
      const weekdayEnEl = $('weekdayEn');
      const weekdayViEl = $('weekdayVi');
      weekdayEnEl.textContent = TUAN_EN[dayOfWeek];
      weekdayViEl.textContent = TUAN_VI[dayOfWeek];
      weekdayEnEl.className = 'weekday-en';
      weekdayViEl.className = 'weekday-vi';
      if (dayOfWeek === 0) {
        weekdayEnEl.classList.add('sunday');
        weekdayViEl.classList.add('sunday');
      }
      
      const festivalsRow = $('festivalsRow');
      if (festivals.length > 0) {
        festivalsRow.innerHTML = festivals.map(f => `<div class="festival-item">${f}</div>`).join('');
      } else {
        festivalsRow.innerHTML = '';
      }
      
      $('lunarMonth').textContent = `Tháng ${lunarMonthName} ${monthType}`;
      $('lunarDay').textContent = lunarDay;
      $('monthCanChi').textContent = canChiMonth;
      $('dayCanChi').textContent = canChiDay;
      $('hourCanChi').textContent = `${canChiHour} ${CHI[0]}`;
      $('yearCanChi').textContent = canChiYear;
      $('gioHoangDao').innerHTML = `${line1}<br>${line2}`;
      
      $('inputDay').value = dd;
      $('inputMonth').value = mm;
      $('inputYear').value = yy;
    }

    static getConfigElement() {
      return document.createElement('lich-am-duong-card-editor');
    }

    static getStubConfig() {
      return {
        background: 'normal',
        background_opacity: 0,
        quote_entity: ''
      };
    }
  }

  customElements.define('lich-am-duong-card', LichAmDuongCard);
  
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'lich-am-duong-card',
    name: 'Lịch Âm Dương Việt Nam',
    description: 'Lịch bloc âm dương với nền trong suốt',
    preview: true
  });

  console.info(
    '%c LỊCH-ÂM-DƯƠNG-CARD %c Version 2.1 - Transparent Support ',
    'color: white; background: #7b1fa2; font-weight: 700;',
    'color: #7b1fa2; background: white; font-weight: 700;'
  );

})();