/* 純函式規則：不補值、不排名、不估計機率，不作正式診斷。 */
DG.evaluate = function(state) {
 const a={...state.answers};
 if(state.mode!=='clinical') Object.values(DG.sections).flat().filter(q=>q.clinical).forEach(q=>delete a[q.id]);
 const yes=k=>a[k]==='yes', unknown=k=>!['yes','no'].includes(a[k]);
 const all=Object.values(DG.sections).flat();
 const label=k=>{const q=all.find(q=>q.id===k);if(!q)return k;return q.clinical&&state.mode!=='clinical'?q.label+'（由醫療人員評估）':q.label;};
 const urgent=['acute','neuro','ill'].filter(yes);
 const safetyMissing=['acute','neuro','ill','rapid'].filter(unknown);
 const gate=urgent.length?'urgent':yes('rapid')?'rapid':safetyMissing.length?'incomplete':'ready';
 let syndrome='資料不足，無法判斷認知與功能狀態。';
 if(yes('objective')) {
  if(yes('independence')) syndrome='有客觀認知障礙與獨立生活受影響的紀錄：需由醫師確認失智症症候群及其他原因。';
  else if(a.independence==='no') syndrome='有客觀認知障礙且目前未記錄獨立生活受影響：可評估輕度認知障礙（MCI），仍需完整臨床判斷。';
  else syndrome='有客觀認知障礙：需確認日常獨立性是否因認知下降而受影響，才能區分 MCI 與失智症症候群。';
  if(!yes('decline')) syndrome+='尚未記錄較以往的下降，請向本人與知情者確認病程，並考慮長期低基線或其他原因。';
 } else if(yes('decline')) {
  if(a.objective==='no'&&yes('independence')) syndrome='回報認知下降與獨立性受影響，但正式評估未證實客觀障礙：檢視測驗是否受教育、語言、感官或天花板效應影響，並考慮憂鬱、藥物及其他原因；必要時神經心理評估或追蹤再評估。';
  else if(a.objective==='no') syndrome='有主觀認知下降疑慮，正式評估未證實客觀障礙，且未記錄獨立性受影響：符合主觀認知下降（SCD）的描述，建議處理可改變因素並定期追蹤。';
  else if(yes('independence')) syndrome='認知下降伴日常獨立性受影響：疑似失智症症候群，需正式認知與功能評估。';
  else syndrome='已有認知下降疑慮：需確認客觀認知表現及日常功能，不能據此區分主觀下降、MCI 或失智。';
 } else if(a.decline==='no') syndrome='目前未回報較以往的認知下降；不能以此或正常測試分數單獨排除認知障礙。';
 const cognitionMissing=['decline','independence','informant','objective','alternatives'].filter(unknown).map(label);
 const candidates=[];
 function add(id,name,keys,required,next,source,note,specific=keys) {
  const support=keys.filter(yes).map(label), missing=required.filter(unknown).map(label), absent=required.filter(k=>a[k]==='no').map(label);
  candidates.push({id,name,support,missing,absent,next,source,note,active:specific.some(yes)});
 }
 add('ad','阿茲海默症（AD）',['gradual','memory','adBio'],['decline','objective','independence','alternatives','gradual','adBio'],'評估情節記憶、完整症候群及結構影像；需要病因確認且會改變處置時，轉介專科討論適當生物標記。',2,yes('adBio')?'已輸入專科確認的生物標記異常；仍需核實方法、效能及共病，不能將所有症狀歸因於 AD。':'臨床記憶型表現不等同 AD 生物學診斷；不建議對無症狀者進行常規 AD 生物標記診斷篩檢。'+(yes('gradual')&&!yes('memory')&&!yes('adBio')?' 只有「漸進惡化」屬各類退化性疾病共通表現，未單獨列為 AD 線索。':''),['memory','adBio']);
 const dlbKeys=['fluctuation','hallucination','rbd','parkinson'];
 const dlbCount=dlbKeys.filter(yes).length;
 add('dlb','路易氏體失智症（DLB）',[...dlbKeys,'dlbBio'],['decline','objective','independence','alternatives',...dlbKeys,'dlbBio'],'神經科確認核心特徵、排除譫妄與藥物影響，必要時安排 DAT、PSG 或其他合適檢查。',3,`已回報 ${dlbCount}/4 項核心特徵線索，非診斷分數。需先成立失智症；共識中兩項核心特徵或一項核心加指標性生物標記可支持 probable DLB，仍需完整排除與時間關係審查。疑似 DLB 需留意抗精神病藥敏感性，勿自行調藥。`+(yes('pdBefore')?' 已回報巴金森病確診超過一年後才出現認知症狀：依一年慣例較符合 PDD，而非 DLB。':''));
 add('pdd','巴金森病相關失智症（PDD）',['pdBefore'],['pdBefore','decline','objective','independence','alternatives'],'由神經科確認既有 PD 診斷、認知症狀發生時間及多認知領域影響。',3,'超過一年時間關係僅是 DLB／PDD 的鑑別慣例；本網站未實作完整 PDD 診斷準則。');
 const ftdKeys=['disinhibition','apathy','empathy','compulsive','oral','dysexecutive'];
 add('ftd','行為型額顳葉失智症（bvFTD）',[...ftdKeys,'ftdImage'],['gradual',...ftdKeys,'alternatives','independence','ftdImage'],'確認早期且持續的行為變化、神經心理表現、精神疾病鑑別及額顳葉影像。',4,`已回報 ${ftdKeys.filter(yes).length}/6 項 FTDC 特徵線索。possible 需進行性退化、至少三項並完成排除；probable 另需功能下降與相符影像。本工具不直接核發診斷分類。`);
 add('vascular','血管性認知障礙',['stroke','vascularTime','vascularImage'],['objective','independence','vascularImage','vascularTime','alternatives'],'整合腦血管影像、病變位置／負荷及認知症候群；評估血管與 AD 等混合病因。',5,'有血管危險因子或中風病史，不代表目前認知障礙必由血管病變造成；緩慢進展也不能排除血管病因。');
 add('ppa','語言主導症候群／PPA',['languageFirst'],['languageFirst','gradual','objective','alternatives'],'安排語言與神經心理評估、影像及專科鑑別；必要時評估 AD 或 FTLD 病理。',6,'PPA 是症候群，可涉及不同病理；本網站不依單一問句判定語意型、非流暢型或 logopenic 亞型。');
 add('nph','常壓性水腦症（iNPH）',['gait','urine','ventricles'],['decline','gait','urine','ventricles','alternatives'],'若認知／步態變化伴相關影像，轉介神經科／神經外科，評估影像型態及適當腦脊髓液測試。',7,'步態、認知、排尿三徵及腦室擴大仍不足以確診；亦須排除其他步態與排尿病因。'+(yes('urine')&&!yes('gait')&&!yes('ventricles')?' 只有排尿症狀在高齡者常見且非特異，未單獨列為 iNPH 線索。':''),['gait','ventricles']);
 const workup=state.mode==='clinical'?DG.workup.map(w=>({...w,status:state.workup?.[w.id]||'pending'})):[];
 const workupAbnormal=workup.filter(w=>w.status==='abnormal').map(w=>w.name);
 const workupPending=workup.filter(w=>w.core&&w.status==='pending').map(w=>w.name);
 const confounders=['depression','medication','sensory'].filter(yes).map(label);
 const riskKnown=DG.risks.filter(r=>['yes','no'].includes(state.risks[r.id]?.status));
 const riskPositive=DG.risks.filter(r=>state.risks[r.id]?.status==='yes');
 const mixed= candidates.find(c=>c.id==='vascular').active && (candidates.find(c=>c.id==='ad').active || candidates.find(c=>c.id==='dlb').active);
 return {gate,urgent:urgent.map(label),safetyMissing:safetyMissing.map(label),syndrome,cognitionMissing,candidates,confounders,mixed,riskKnown:riskKnown.length,riskPositive,workup,workupAbnormal,workupPending};
};
