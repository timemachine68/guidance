/* แนะให้แนว — site.js
   อ่านข้อมูลจาก activities.js แล้ววาดหน้าเว็บให้อัตโนมัติ
   ไม่ต้องแก้ไฟล์นี้ — ถ้าจะเพิ่มกิจกรรม ให้แก้ activities.js เท่านั้น */

var GRADE_LABEL = { 1:"มัธยมต้น", 2:"มัธยมต้น", 3:"มัธยมต้น", 4:"มัธยมปลาย", 5:"มัธยมปลาย", 6:"มัธยมปลาย" };
var COLOR_PALETTE = ["var(--cat-self)","var(--cat-career)","var(--cat-path)","var(--cat-story)","var(--cat-5)","var(--cat-6)"];

/* ---------- หน้าแรก ---------- */
function renderHome(){
  var el = document.getElementById('waypoints');
  if(!el) return;
  var html = '';
  for(var g=1; g<=6; g++){
    var count = window.ACTIVITIES.filter(function(a){ return a.grade === g; }).length;
    var label = GRADE_LABEL[g];
    if(count > 0){
      html += '<a class="waypoint" href="m'+g+'/index.html">'
            +   '<div class="pin">ม.'+g+'</div>'
            +   '<div class="waypoint-label">'+label+'</div>'
            +   '<div class="waypoint-status active">'+count+' กิจกรรม →</div>'
            + '</a>';
    } else {
      html += '<div class="waypoint soon">'
            +   '<div class="pin">ม.'+g+'</div>'
            +   '<div class="waypoint-label">'+label+'</div>'
            +   '<div class="waypoint-status">เร็วๆ นี้</div>'
            + '</div>';
    }
  }
  el.innerHTML = html;
}

/* ---------- หน้าแต่ละชั้น ---------- */
function renderGrade(grade){
  var el = document.getElementById('categories');
  if(!el) return;
  var items = window.ACTIVITIES.filter(function(a){ return a.grade === grade; });

  if(items.length === 0){
    el.innerHTML =
      '<div class="placeholder">'
      + '<div class="pin" style="width:64px;height:64px;font-size:1.3rem;background:transparent;color:#9aa192;border:2px dashed #b7bcaa;margin:0 auto 20px;">ม.'+grade+'</div>'
      + '<h2>กำลังเตรียมเส้นทางนี้</h2>'
      + '<p>กิจกรรมแนะแนวสำหรับชั้น ม.'+grade+' อยู่ระหว่างจัดทำ แวะมาดูใหม่เร็วๆ นี้</p>'
      + '<a class="back-link" href="../index.html">← กลับหน้าแรก</a>'
      + '</div>';
    return;
  }

  // จัดกลุ่มตาม category ตามลำดับที่พบก่อน-หลังใน activities.js
  var categoryOrder = [];
  var byCategory = {};
  items.forEach(function(a){
    if(!byCategory[a.category]){
      byCategory[a.category] = [];
      categoryOrder.push(a.category);
    }
    byCategory[a.category].push(a);
  });

  var html = '';
  categoryOrder.forEach(function(catName, idx){
    var color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
    var catItems = byCategory[catName];
    html += '<div class="category">'
          +   '<div class="category-head">'
          +     '<span class="dot" style="background:'+color+'"></span>'
          +     '<h2>'+catName+'</h2>'
          +     '<span class="category-count">'+catItems.length+' กิจกรรม</span>'
          +   '</div>'
          +   '<div class="card-grid">';
    catItems.forEach(function(a){
      html += '<a class="card" style="--card-accent:'+color+'" href="'+a.file+'">'
            +   '<h3>'+a.title+'</h3>'
            +   '<p>'+a.desc+'</p>'
            +   '<span class="go">เปิดกิจกรรม →</span>'
            + '</a>';
    });
    html += '</div></div>';
  });

  el.innerHTML = html;
}
