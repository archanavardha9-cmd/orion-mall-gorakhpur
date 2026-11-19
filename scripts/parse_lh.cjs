const fs = require('fs');
const file = process.argv[2] || 'temp_lh_optimized.json';
const lh = JSON.parse(fs.readFileSync(file, 'utf8'));

console.log('=== ' + file.toUpperCase() + ' SCORES ===');
for (const [k, v] of Object.entries(lh.categories)) {
  console.log(`${v.title}: ${Math.round(v.score * 100)}`);
}

console.log('\n=== CORE WEB VITALS & METRICS ===');
const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'];
metrics.forEach(m => {
  const a = lh.audits[m];
  if (a) console.log(`${a.title}: ${a.displayValue} (score: ${a.score})`);
});

console.log('\n=== REMAINING WARNINGS (< 1.0) ===');
for (const [k, a] of Object.entries(lh.audits)) {
  if (a.score !== null && a.score < 1.0) {
    console.log(`[${k}] ${a.title}: ${a.displayValue || ''} (score: ${a.score})`);
    if (a.details && a.details.items && a.details.items.length) {
      console.log('   items:', JSON.stringify(a.details.items.slice(0, 2)));
    }
  }
}
