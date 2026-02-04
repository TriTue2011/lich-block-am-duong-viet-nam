// Lịch Âm Dương Việt Nam - Thiết kế lịch treo tường
// Phát triển bởi Nguyễn Tiến Khải - khaisilk1910
// HA custom card:
//   type: custom:lich-block-am-duong-viet-nam
//   background: transparent # normal(mặc định) hoặc transparent
//   background_opacity: 0.6 # 0-1 (0 là trong suốt, 1 là đậm)
//   center_entity: sensor.your_sensor # Sensor hiển thị ở giữa
//   grid_options:
//     columns: full

import {
  ABOUT,
  TK19,
  TK20,
  TK21,
  TK22,
  CAN,
  CHI,
  CHI_EMOJI,
  TUAN,
  GIO_HD,
  TIETKHI,
  NGAY_LE_DL,
  NGAY_LE_DL_STRING,
  NGAY_LE_AL,
  NGAY_LE_AL_STRING,
  THAP_NHI_TRUC,
  NHI_THAP_BAT_TU,
  NGAY_THONG_TIN,
  CAT_TINH,
  HUNG_TINH,
  THAN_SAT,
} from './lich-block-am-duong-viet-nam.data.js';
import { svg_12congiap } from './lich-block-am-duong-viet-nam.svg.js';

(function(){
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