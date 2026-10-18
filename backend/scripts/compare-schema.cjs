const fs = require('fs');
const path = require('path');
const base = path.resolve(__dirname, '../../database/BBDD LAST VERSION');
function read(file) {
  const buf = fs.readFileSync(path.join(base, file));
  return buf.toString(buf[0] === 255 && buf[1] === 254 ? 'utf16le' : 'utf8').replace(/^\uFEFF/, '');
}
function norm(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/--[^\r\n]*/g, '')
    .replace(/\s+COLLATE\s+\w+/gi, '')
    .replace(/(?:PAD_INDEX\s*=\s*OFF|ALLOW_ROW_LOCKS\s*=\s*ON|ALLOW_PAGE_LOCKS\s*=\s*ON|SORT_IN_TEMPDB\s*=\s*OFF)\s*,?\s*/gi, '')
    .replace(/,\s*\)/g, ')').replace(/[\[\]]/g, '').replace(/\s+/g, '').toLowerCase();
}
function objects(text) {
  const result = new Map();
  for (const raw of text.split(/^\s*GO\s*$/mi)) {
    const batch = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/--[^\r\n]*/g, '').trim()
      .replace(/^(CREATE\s+VIEW)\s+(\w+)\.(\w+)/i, '$1 [$2].[$3]');
    let key;
    let m = batch.match(/^CREATE\s+(TABLE|VIEW|TRIGGER|PROCEDURE|FUNCTION)\s+(\[[^\]]+\]\.\[[^\]]+\])/i);
    if (m) key = m[1].toUpperCase() + ' ' + m[2];
    else if ((m = batch.match(/^CREATE\s+(?:UNIQUE\s+)?(?:NONCLUSTERED\s+|CLUSTERED\s+)?INDEX\s+(\[[^\]]+\])\s+ON\s+(\[[^\]]+\]\.\[[^\]]+\])/i))) key = 'INDEX ' + m[2] + '.' + m[1];
    else if ((m = batch.match(/^ALTER TABLE\s+(\[[^\]]+\]\.\[[^\]]+\])[\s\S]*?ADD\s+(?:CONSTRAINT\s+(\[[^\]]+\])\s+)?/i))) {
      const named = batch.match(/\bCONSTRAINT\s+(\[[^\]]+\])/i);
      const column = batch.match(/\bFOR\s+(\[[^\]]+\])/i);
      key = 'ALTER ' + m[1] + ' ' + (named?.[1] || column?.[1] || norm(batch));
    } else if ((m = batch.match(/^ALTER TABLE\s+(\[[^\]]+\]\.\[[^\]]+\])\s+(CHECK CONSTRAINT|ENABLE TRIGGER)\s+(\[[^\]]+\])/i))) key = m[2].toUpperCase() + ' ' + m[1] + '.' + m[3];
    if (key) result.set(key, batch);
  }
  return result;
}
const a = objects(read('GestionDriza_SCHEMA.sql'));
const b = objects(read('GestionDriza_SCHEMA_actual.sql'));
const added = [...b.keys()].filter(k => !a.has(k));
const removed = [...a.keys()].filter(k => !b.has(k));
const changed = [...a.keys()].filter(k => b.has(k) && norm(a.get(k)) !== norm(b.get(k)));
console.log(JSON.stringify({oldObjects:a.size,newObjects:b.size,added,removed,changed}, null, 2));
for (const key of changed) {
  const aa = a.get(key).split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const bb = b.get(key).split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  console.log(JSON.stringify({object:key,oldOnly:aa.filter(s=>!bb.some(t=>norm(t)===norm(s))),newOnly:bb.filter(s=>!aa.some(t=>norm(t)===norm(s)))},null,2));
}
