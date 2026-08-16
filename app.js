/* ── Muyong — โค้ดส่วนกลาง ───────────────────────────────────────
   หน้าเว็บโหลด data.json ผ่านไฟล์นี้
   เพิ่ม/แก้เรื่อง ทำที่ data.json อย่างเดียว ไม่ต้องแตะไฟล์นี้        */

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DAY_META = {
  mon: { code: 'MON', label: 'จันทร์' },
  tue: { code: 'TUE', label: 'อังคาร' },
  wed: { code: 'WED', label: 'พุธ' },
  thu: { code: 'THU', label: 'พฤหัสบดี' },
  fri: { code: 'FRI', label: 'ศุกร์' },
  sat: { code: 'SAT', label: 'เสาร์' },
  sun: { code: 'SUN', label: 'อาทิตย์' }
};

const STATUS_META = {
  ongoing:   { label: 'กำลังแปล' },
  completed: { label: 'แปลจบแล้ว' }
};

/* cache: 'no-cache' เพื่อให้เห็นข้อมูลใหม่ทันทีหลังอัพไฟล์
   ไม่ต้องรอแคชเบราว์เซอร์หมดอายุ */
async function loadData() {
  const res = await fetch('data.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('โหลด data.json ไม่ได้ (' + res.status + ')');
  return res.json();
}

/* ลิงก์อ่านที่ใช้ได้จริงเท่านั้น — ค่าว่างหรือข้อความ placeholder ให้ถือว่าไม่มี */
function readLink(s) {
  const url = (s.readUrl || '').trim();
  return /^https?:\/\//i.test(url) && !/ใส่ลิงก์/.test(url) ? url : '';
}

/* ── helper สร้าง element ───────────────────────────────────────── */

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  for (const k in (attrs || {})) {
    if (k === 'class') node.className = attrs[k];
    else if (k === 'text') node.textContent = attrs[k];
    else if (k === 'html') node.innerHTML = attrs[k];
    else if (attrs[k] != null) node.setAttribute(k, attrs[k]);
  }
  for (const c of (children || [])) if (c) node.appendChild(c);
  return node;
}

/* รูป — ถ้าไฟล์ยังไม่มี ให้เหลือกล่องเปล่าแทนไอคอนรูปแตก */
function coverImg(src, alt, cls) {
  const img = el('img', {
    class: cls || 'cover',
    src: src || '',
    alt: alt || '',
    loading: 'lazy'
  });
  img.addEventListener('error', () => { img.removeAttribute('src'); });
  return img;
}

function showError(msg) {
  const main = document.getElementById('main') || document.body;
  main.innerHTML = '';
  main.appendChild(el('div', { class: 'empty', html: msg }));
}
