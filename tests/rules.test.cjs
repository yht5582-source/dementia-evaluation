const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8').replace('window.DG = {};','var DG = {}; window.DG = DG;'),ctx);
vm.runInContext(fs.readFileSync('engine.js','utf8'),ctx);
const {DG}=ctx;let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name);}
function assess(answers={},mode='clinical',risks={}){return DG.evaluate({mode,answers,risks,meta:{}});}
const clear={acute:'no',neuro:'no',ill:'no',rapid:'no'};
test('空白資料保留缺口，不能放行安全檢核或計算風險',()=>{const r=assess();assert.equal(r.gate,'incomplete');assert.equal(r.safetyMissing.length,4);assert.equal(r.riskKnown,0);assert.equal(r.riskPositive.length,0);assert.match(r.syndrome,/資料不足/);});
test('任何急性警訊優先於其他已填資料',()=>{for(const k of ['acute','neuro','ill'])assert.equal(assess({...clear,[k]:'yes',rapid:'yes',memory:'yes',adBio:'yes'}).gate,'urgent');});
test('快速進展轉介優先',()=>assert.equal(assess({...clear,rapid:'yes'}).gate,'rapid'));
test('不清楚不等於無，即使其他安全問題已否認',()=>assert.equal(assess({...clear,acute:'unknown'}).gate,'incomplete'));
test('全數否認警訊才放行亞型整理',()=>assert.equal(assess(clear).gate,'ready'));
test('獨立性保留、客觀障礙支持 MCI 評估而非失智判定',()=>{const r=assess({...clear,decline:'yes',objective:'yes',independence:'no'});assert.match(r.syndrome,/MCI/);assert.ok(!r.syndrome.includes('確診'));});
test('功能下降但客觀證據缺失，仍為疑似',()=>{const r=assess({...clear,decline:'yes',independence:'yes'});assert.match(r.syndrome,/疑似/);assert.ok(r.cognitionMissing.some(x=>x.includes('客觀')));});
test('民眾模式不採用隱藏專業生物標記與認知資料',()=>{const r=assess({...clear,decline:'yes',independence:'no',objective:'yes',adBio:'yes'},'public');assert.ok(!r.syndrome.includes('可評估輕度'));assert.ok(!r.candidates.find(c=>c.id==='ad').support.some(s=>s.includes('核心生物')));});
test('單一 AD 生物標記不把全部症狀歸因 AD',()=>{const r=assess({...clear,adBio:'yes'});assert.match(r.candidates.find(c=>c.id==='ad').note,/不能將所有症狀/);assert.match(r.syndrome,/資料不足/);});
test('只有血管危險因子不觸發血管病因線索',()=>{const r=assess(clear,'clinical',{hypertension:{status:'yes'}});assert.equal(r.candidates.find(c=>c.id==='vascular').active,false);});
test('血管与退化性線索可並存，不排他分類',()=>{const r=assess({...clear,stroke:'yes',memory:'yes',gradual:'yes'});assert.equal(r.mixed,true);assert.ok(r.candidates.find(c=>c.id==='ad').active);assert.ok(r.candidates.find(c=>c.id==='vascular').active);});
test('三項 bvFTD 線索缺少進展與排除，不能輸出正式診斷',()=>{const r=assess({...clear,apathy:'yes',empathy:'yes',oral:'yes'});const c=r.candidates.find(c=>c.id==='ftd');assert.match(c.note,/3\/6/);assert.ok(c.missing.length>0);assert.ok(!Object.hasOwn(c,'diagnosis'));});
test('PPA 與 iNPH 線索不確定病理或直接確診',()=>{const r=assess({...clear,languageFirst:'yes',gait:'yes',urine:'yes'});assert.match(r.candidates.find(c=>c.id==='ppa').note,/不同病理/);assert.match(r.candidates.find(c=>c.id==='nph').note,/不足以確診/);});
test('14項不重複且兩項新增正確；未知未列為陰性',()=>{assert.equal(DG.risks.length,14);assert.equal(new Set(DG.risks.map(r=>r.id)).size,14);assert.equal(DG.risks.filter(r=>r.badge).length,2);const r=assess(clear,'clinical',{ldl:{status:'yes'},vision:{status:'unknown'},diabetes:{status:'no'}});assert.equal(r.riskKnown,2);assert.equal(r.riskPositive.length,1);assert.equal(r.riskPositive[0].id,'ldl');});
console.log(`${count} clinical rule checks passed`);
