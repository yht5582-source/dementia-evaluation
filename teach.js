/* 教學內容：示範病例（虛構）、考題、心智圖。病例判讀由 DG.evaluate 即時計算；tests/rules.test.cjs 交叉檢查。 */
/*CASES-START*/
DG.cases=[
 {id:'delirium',title:'急性混亂的 82 歲長者',tag:'安全關卡',
  story:'82 歲女性，平日可自行買菜、服藥。三天前開始發燒、頻尿，昨天起白天嗜睡、夜間躁動，認不得女兒。上週因失眠開始自購含 diphenhydramine 的感冒藥。家屬問：「是不是失智了？可以幫她做失智評估嗎？」',
  think:'現在適合判斷失智亞型嗎？第一步要做什麼？',
  yes:['acute','ill','medication'],no:['neuro','rapid'],
  expect:{gate:'urgent',active:[]},
  points:['急性發作、注意力與意識波動，加上感染與抗膽鹼藥物，應先當譫妄評估與處理。工具顯示優先就醫，並暫停亞型判讀。','住院中若分不清是譫妄、失智或譫妄合併失智，先當譫妄處理（NICE 1.2.32）；不可只靠標準化工具區分譫妄與譫妄合併失智（NICE 1.2.31）。','抗膽鹼負擔本身與認知障礙相關，用藥回顧是評估的一部分（NICE 1.6.1–1.6.2）。'],
  source:1},
 {id:'rapid',title:'八週內快速惡化',tag:'安全關卡',
  story:'67 歲男性，原本仍在工作。八週前開始算錯帳、走路不穩，之後出現肌躍與語言混亂，現在需要協助穿衣。無發燒、無突然單側無力，近期未換藥。腦部 CT 未見出血或腫塊。',
  think:'這個病程該走一般記憶門診流程嗎？',
  yes:['rapid','decline','independence','objective'],no:['acute','neuro','ill'],
  expect:{gate:'rapid',active:[]},
  points:['數週至數月的快速進展不走一般亞型整理：轉介可做腦脊髓液等檢查的神經科，評估 Creutzfeldt–Jakob 病及類似疾病（NICE 1.2.7）。','工具仍會顯示症候群摘要，但暫停亞型判讀，避免把可治療的感染、自體免疫、腫瘤或代謝病因歸成退化性疾病。','CT 未見異常不代表沒有問題，不能據此改回一般流程。'],
  source:1},
 {id:'scd',title:'擔心記憶力的 68 歲退休老師',tag:'症候群界線',
  story:'68 歲女性，近一年常覺得想不起人名，主動要求「抽血驗阿茲海默症」。仍自行理財、開車，先生未察覺生活功能改變。正式認知評估在教育校正後未見客觀障礙。情緒低落半年；長期服用 oxybutynin；聽力未矯正。',
  think:'這屬於 SCD、MCI 或失智？血液生物標記現在適合嗎？',
  yes:['decline','memory','informant','depression','medication','sensory'],no:['acute','neuro','ill','rapid','independence','objective','language','executive','spatial','alternatives','adBio','gradual'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'normal',cbc:'normal',imaging:'pending'},
  expect:{gate:'ready',active:['ad'],syndrome:'SCD',confounders:3},
  points:['主觀下降、客觀未證實、獨立性保留：符合 SCD 的描述，不是 MCI，也不能說已排除。正常分數不能單獨排除失智（NICE 1.2.4），應定期追蹤。','工具會因記憶主訴列出 AD 方向，這只代表使用者回報了線索，不代表有 AD 的證據；要和上面的 SCD 摘要一起解讀。','先處理可改變因素：憂鬱、抗膽鹼藥物、聽力（NICE 1.2.6、1.6.2）。請醫師或藥師檢視用藥，不要自行停藥。','血液生物標記指引適用於專科中有客觀認知障礙者（Alzheimer’s Association 2025）；目前的情況不符合這個使用範圍。'],
  source:1},
 {id:'ad',title:'兩年來反覆問同樣問題',tag:'阿茲海默症',
  story:'74 歲女性，兩年來逐漸健忘，一天問好幾次晚餐吃什麼，開始忘記繳費和吃藥，需女兒代管。神經學檢查無局部異常。認知評估以延遲回憶障礙最明顯。B12、TSH、代謝、血球皆正常；MRI 兩側內側顳葉萎縮，無明顯血管病變或腦室擴大。未做生物標記。聽力損失、LDL 偏高。',
  think:'可以寫「阿茲海默症」嗎？一定要做生物標記嗎？',
  yes:['decline','memory','executive','independence','informant','objective','alternatives','gradual'],no:['acute','neuro','ill','rapid','language','spatial','fluctuation','hallucination','rbd','parkinson','pdBefore','disinhibition','apathy','empathy','compulsive','oral','dysexecutive','stroke','vascularTime','languageFirst','gait','urine','depression','medication','sensory','dlbBio','ftdImage','vascularImage','ventricles'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'normal',cbc:'normal',imaging:'normal'},
  risks:{hearing:'yes',ldl:'yes',smoking:'no',diabetes:'no'},
  expect:{gate:'ready',active:['ad'],syndrome:'失智症症候群'},
  points:['臨床記憶型表現支持 AD 方向，但工具只列線索；AD 的臨床症候群與生物學診斷分開看。','懷疑 AD 時，評估應包含言語情節記憶測試（NICE 1.2.10）。','進一步檢查只在有助判斷亞型且會改變處置時才考慮（NICE 1.2.14）。APOE 基因型與腦波不用來診斷 AD（NICE 1.2.18）；CT／MRI 也不能單獨排除 AD（NICE 1.2.17）。'],
  source:1},
 {id:'dlb',title:'看到小孩在客廳的 71 歲男性',tag:'路易氏體',
  story:'71 歲男性，五年前起睡夢中揮拳踢腿。近兩年判斷與規劃變差、會迷路，白天有時清楚、有時恍神。反覆看到小孩坐在客廳。動作變慢、輕度僵硬，未診斷巴金森病。感染與藥物因素已排除。上月急診因夜間躁動打 haloperidol 後僵硬與嗜睡明顯加重。',
  think:'核心特徵有幾項？接下來用藥要注意什麼？',
  yes:['decline','executive','spatial','independence','informant','objective','alternatives','gradual','fluctuation','hallucination','rbd','parkinson'],no:['acute','neuro','ill','rapid','memory','language','pdBefore','disinhibition','apathy','empathy','compulsive','oral','dysexecutive','stroke','vascularTime','languageFirst','gait','urine','depression','medication','sensory','adBio','ftdImage','vascularImage','ventricles'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'normal',cbc:'normal',imaging:'normal'},
  expect:{gate:'ready',active:['dlb'],syndrome:'失智症症候群'},
  points:['四項核心特徵都有線索：波動、成形視幻覺、REM 睡眠行為障礙、巴金森症狀。失智成立且 ≥2 項核心特徵可支持 probable DLB，工具不直接核發分類（McKeith 2017）。','抗精神病藥可惡化動作症狀，也可能造成嚴重敏感反應（NICE 1.7.4）；共識也建議盡量避免。','診斷不確定時才用 123I-FP-CIT SPECT，無法取得時考慮 MIBG；結果正常也不能單獨排除 DLB（NICE 1.2.20–1.2.22）。'],
  source:3},
 {id:'bvftd',title:'個性大變的 58 歲業務主管',tag:'額顳葉',
  story:'58 歲男性，兩年來對陌生人講不得體的話、衝動消費，對太太生病毫不關心，不再主動做事，每天固定走同一路線，並大量吃甜食。曾被診斷憂鬱，治療無效。簡短認知篩檢正常；神經心理評估顯示執行功能障礙，記憶與視空間相對保留。已無法勝任工作。MRI 額葉與前顳葉萎縮。',
  think:'篩檢正常能排除嗎？possible 與 probable 差在哪裡？',
  yes:['decline','executive','independence','informant','objective','alternatives','gradual','disinhibition','apathy','empathy','compulsive','oral','dysexecutive','ftdImage'],no:['acute','neuro','ill','rapid','memory','language','spatial','fluctuation','hallucination','rbd','parkinson','pdBefore','stroke','vascularTime','languageFirst','gait','urine','depression','medication','sensory','adBio','dlbBio','vascularImage','ventricles'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'normal',cbc:'normal',imaging:'abnormal'},
  expect:{gate:'ready',active:['ftd'],syndrome:'失智症症候群'},
  points:['簡短篩檢正常不能排除，行為型表現尤其容易被漏掉（NICE 1.2.4）。','Possible bvFTD：進行性退化加六項特徵中至少三項，「早期」指症狀出現的前三年內。Probable 另需明顯功能下降與相符影像（Rascovsky 2011）。','仍須確認不能以其他疾病或精神疾病更好地解釋；本例先前的憂鬱診斷要重新檢視。'],
  source:4},
 {id:'mixed',title:'中風後又持續健忘',tag:'混合病因',
  story:'78 歲男性，三年前左側中風，之後認知階梯式變差；近一年沒有新中風，卻持續更健忘、反覆問話，需要家人管藥。MRI 有多發腔隙性梗塞與融合性白質病變，並有內側顳葉萎縮。高血壓、糖尿病多年。',
  think:'有中風史就是血管性失智嗎？',
  yes:['decline','memory','executive','independence','informant','objective','alternatives','gradual','stroke','vascularTime','vascularImage'],no:['acute','neuro','ill','rapid','language','spatial','fluctuation','hallucination','rbd','parkinson','pdBefore','disinhibition','apathy','empathy','compulsive','oral','dysexecutive','languageFirst','gait','urine','depression','medication','sensory','adBio','dlbBio','ftdImage','ventricles'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'abnormal',cbc:'normal',imaging:'abnormal'},
  risks:{hypertension:'yes',diabetes:'yes'},
  expect:{gate:'ready',active:['ad','vascular'],mixed:true,syndrome:'失智症症候群'},
  points:['血管與退化性線索可以並存：工具保留兩個方向並提示混合病因，但不會確認混合型失智。','不可只憑血管病灶量診斷血管性失智（NICE 1.2.27）。VASCOG 要求臨床與影像條件都符合，才是 probable VCD（Sachdev 2014）。','疑血管性失智而亞型不確定時，以 MRI 為優先，無法做或禁忌時用 CT（NICE 1.2.26）。'],
  source:5},
 {id:'inph',title:'走路像黏在地上',tag:'常壓性水腦症',
  story:'76 歲女性，一年半來走路小碎步、起步困難，常跌倒；半年前開始尿急、偶爾尿失禁，反應變慢，需要協助處理帳單。無中風或腦膜炎病史。MRI 腦室擴大（Evans index >0.3）、高位腦溝變窄、Sylvian 裂增寬。腰椎穿刺壓力正常、腦脊髓液成分正常；放液測試後步態未明顯改善。',
  think:'放液測試陰性就排除了嗎？目前算哪一級？',
  yes:['decline','executive','independence','informant','objective','alternatives','gradual','gait','urine','ventricles'],no:['acute','neuro','ill','rapid','memory','language','spatial','fluctuation','hallucination','rbd','parkinson','pdBefore','disinhibition','apathy','empathy','compulsive','oral','dysexecutive','stroke','vascularTime','languageFirst','depression','medication','sensory','adBio','dlbBio','ftdImage','vascularImage'],
  workup:{b12:'normal',thyroid:'normal',metabolic:'normal',cbc:'normal',imaging:'abnormal'},
  expect:{gate:'ready',active:['nph'],syndrome:'失智症症候群'},
  points:['影像符合 DESH（腦室擴大、Sylvian 裂增寬、高位腦溝狹窄），加上步態障礙與腦脊髓液壓力 ≤200 mmH₂O、成分正常，已可達 probable iNPH（Nakajima 2021）。','放液測試陰性不能排除 iNPH；指引引用的敏感度約 58%。','Definite iNPH 要在分流手術後症狀客觀改善才成立。工具不依三徵或腦室大小確診。'],
  source:7}
];
/*CASES-END*/
/*QUIZ-START*/
DG.quiz=[
 {level:'basic',topic:'安全關卡',stem:'82 歲長者昨天起突然混亂、發燒，家屬想先了解是哪一型失智。最適當的處理是：',opts:['優先評估急性病因，暫停亞型判讀','先完成認知篩檢，再決定是否就醫','先整理 14 項危險因子，下週回診','先安排 AD 血液生物標記確認病因'],ans:0,why:'數小時到數天內的混亂與急性疾病是警訊，要先評估譫妄與急性病因。工具此時會暫停亞型判讀。',src:'本工具規則；NICE NG97 1.2.32'},
 {level:'basic',topic:'安全關卡',stem:'四項安全問題中三項答「無」，「快速惡化」答「不清楚」。工具應如何處理？',opts:['視同「無」，放行亞型整理','視同「有」，直接建議住院','只顯示 AD 與 DLB 兩個方向','視為檢核未完成，暫不進行亞型判讀'],ans:3,why:'不清楚不等於沒有。四題都有明確回答且全部否認，才會放行亞型整理。',src:'本工具規則'},
 {level:'basic',topic:'症候群',stem:'正式評估已證實客觀認知障礙。要區分 MCI 與失智症症候群，關鍵是確認：',opts:['MMSE 是否低於固定的診斷切點','日常獨立性是否因認知下降受影響','MRI 是否有海馬迴萎縮','是否帶有 APOE ε4'],ans:1,why:'MCI 與失智症的界線在獨立生活功能，且必須是認知下降造成，而非單純肢體或感官障礙。',src:'本工具規則；DETeCD-ADRD'},
 {level:'basic',topic:'認知篩檢',stem:'家屬描述明顯退步，但簡短認知工具分數正常。下列何者正確？',opts:['不能只因分數正常就排除失智','分數正常即可排除失智','應改用更短的工具再測一次','只有分數異常才需要知情者病史'],ans:0,why:'NICE 明確建議不要只因認知工具分數正常就排除失智。',src:'NICE NG97 1.2.4'},
 {level:'basic',topic:'病史',stem:'初次評估疑似失智時，病史最好來自：',opts:['僅當事人本人，以尊重自主','僅家屬，因本人病識感常不足','當事人，並在可能時加上熟悉他的人','只需既往病歷與用藥紀錄'],ans:2,why:'NICE 要求向當事人取得病史，並在可能時向熟悉當事人的人（如家屬）取得。',src:'NICE NG97 1.2.1'},
 {level:'basic',topic:'快速進展',stem:'疑似快速進展型失智，應優先：',opts:['三個月後重做認知篩檢','轉介可做腦脊髓液等檢查的神經科','先試用乙醯膽鹼酯酶抑制劑','安排一般記憶門診，依例行順序候診'],ans:1,why:'應轉介至可做腦脊髓液等檢查的神經科，評估 CJD 及類似疾病。',src:'NICE NG97 1.2.7'},
 {level:'basic',topic:'DLB',stem:'下列何者不是 2017 DLB 共識的核心臨床特徵？',opts:['反覆成形視幻覺','認知波動','REM 睡眠行為障礙','嚴重抗精神病藥敏感'],ans:3,why:'核心特徵是波動、視幻覺、REM 睡眠行為障礙與巴金森症狀。嚴重抗精神病藥敏感屬支持性特徵。',src:'McKeith 2017'},
 {level:'basic',topic:'bvFTD',stem:'依 FTDC 2011，possible bvFTD 除進行性退化外，六項行為／認知特徵至少需要幾項？',opts:['一項','兩項','三項','六項全部'],ans:2,why:'需要六項中至少三項，且症狀須持續或反覆，不是單次或罕見事件。',src:'Rascovsky 2011'},
 {level:'basic',topic:'檢查選擇',stem:'下列哪一項不應用來診斷阿茲海默症？',opts:['言語情節記憶測試','APOE 基因型','結構性腦影像','腦脊髓液 tau 與 amyloid'],ans:1,why:'NICE 明確建議不要用 APOE 基因型或腦波來診斷 AD。',src:'NICE NG97 1.2.18'},
 {level:'basic',topic:'危險因子',stem:'關於 Lancet 2024 的危險因子，下列何者正確？',opts:['約 45% 是人口可歸因比例，不是個人風險','勾選項目越多，個人失智機率可依比例推算','處理全部因子可保證個人降低 45% 風險','2024 新增的兩項是睡眠與飲食'],ans:0,why:'約 45% 是人口層級的可歸因比例，不能換算成個人機率。2024 新增的是高 LDL 膽固醇與未治療視力損失。',src:'Lancet 失智症委員會 2024'},
 {level:'adv',topic:'DLB 分類',stem:'已成立失智症，唯一的核心特徵是疑似演夢行為；多頻道睡眠檢查證實 REM 睡眠無肌張力消失。依 2017 共識較符合：',opts:['Possible DLB','尚無法列入 DLB','Probable DLB','Definite DLB'],ans:2,why:'PSG 證實 REM 睡眠無肌張力消失是指標性生物標記。失智加一項核心特徵與一項指標性生物標記，可診斷 probable DLB。',src:'McKeith 2017'},
 {level:'adv',topic:'DLB 分類',stem:'已成立失智症，沒有任何核心臨床特徵，但 DAT 影像顯示基底核攝取降低。依 2017 共識：',opts:['可列 possible DLB','指標性生物標記異常即為 probable DLB','必須另有兩項核心特徵才能列任何 DLB 分類','應直接改診斷為巴金森病失智'],ans:0,why:'有指標性生物標記但無核心特徵，可列 possible DLB；共識明言 probable DLB 不應只憑生物標記診斷。',src:'McKeith 2017'},
 {level:'adv',topic:'DLB／PDD',stem:'巴金森病確診五年、動作症狀穩定，近一年出現多認知領域下降並影響生活，也有視幻覺。工具與一年慣例較支持：',opts:['DLB，因為視幻覺是 DLB 的核心特徵','PDD，失智在確立的 PD 之後','AD，因為多認知領域下降','無法區分，應暫停所有評估'],ans:1,why:'認知症狀在 PD 確診超過一年後才出現，依一年慣例較符合 PDD。一年是鑑別慣例，並非完整診斷準則。',src:'McKeith 2017；本工具規則'},
 {level:'adv',topic:'bvFTD 排除',stem:'符合三項行為特徵，有明顯功能下降及額葉萎縮，但生物標記強烈指向 AD。依 FTDC 2011 最多可列：',opts:['Probable bvFTD，因影像相符','Definite bvFTD','Possible bvFTD','任何 bvFTD 都不可列'],ans:2,why:'排除條件 A、B 對所有 bvFTD 都須為否；條件 C（生物標記強烈指向 AD 等）可在 possible 為陽性，但 probable 必須為陰性。',src:'Rascovsky 2011'},
 {level:'adv',topic:'PPA',stem:'以語言困難起病，自發言語中找詞困難且句子複述明顯受損，單字理解與文法相對保留。最符合哪一型？最常見的病理為何？',opts:['語意型；TDP-43','非流暢型；tau','Logopenic 型；FTLD','Logopenic 型；AD'],ans:3,why:'找詞與句子複述障礙是 logopenic 型的核心特徵，其最常見病理可能是 AD；但變異型與病理沒有一對一對應。',src:'Gorno-Tempini 2011；NICE NG97 1.5.15'},
 {level:'adv',topic:'血管性',stem:'沒有中風或 TIA 病史。依 VASCOG 2014，下列哪個組合支持血管性認知障礙的臨床條件？',opts:['速度、注意力或執行功能下降，加早期步態或排尿問題','情節記憶明顯受損為主，加上內側顳葉與海馬迴萎縮','單純有高血壓與糖尿病病史，認知下降原因未明','MRI 少量白質變化，認知測驗正常，功能也無影響'],ans:0,why:'無中風史時，需以處理速度、複雜注意力和／或額葉執行功能下降為主，並加上早期步態障礙、早期排尿症狀或人格情緒改變之一。',src:'Sachdev 2014'},
 {level:'adv',topic:'血管性',stem:'80 歲失智長者，MRI 有廣泛白質病變，家屬問是否就是血管性失智。最適當的回答是：',opts:['病灶負荷大即可確診為血管性失智','不可單憑病灶負荷診斷，需整合臨床','只要有血管危險因子就可診斷','有白質病變即可排除阿茲海默症的可能'],ans:1,why:'NICE 建議不要只憑血管病灶負荷診斷血管性失智；血管與 AD 等病因也可能並存。',src:'NICE NG97 1.2.27；Sachdev 2014'},
 {level:'adv',topic:'iNPH',stem:'步態障礙，影像符合 DESH，腦脊髓液壓力 180 mmH₂O、成分正常，但放液測試無明顯改善。依日本第三版指引：',opts:['放液陰性，已排除 iNPH','仍只是 possible iNPH','Definite iNPH，因為影像與步態都非常典型','Probable iNPH，放液陰性不能排除'],ans:3,why:'Probable 的第三項條件是「DESH 加步態障礙」或「放液／引流後改善」，符合其一即可。Definite 須在分流手術後客觀改善。',src:'Nakajima 2021'},
 {level:'adv',topic:'血液生物標記',stem:'依 Alzheimer’s Association 2025，要取代 amyloid PET 或 CSF 的血液檢測，敏感度／特異度至少需要：',opts:['各 75%','敏感度 90%／特異度 75%','各 90%','敏感度 75%／特異度 90%'],ans:2,why:'取代 PET／CSF 的檢測兩者都至少 90%；敏感度 90%、特異度 75% 是 triage 門檻。適用於專科中有客觀認知障礙者。',src:'Alzheimer’s Association 2025'},
 {level:'adv',topic:'譫妄',stem:'住院長者認知障礙原因不明，團隊無法判斷是譫妄、失智或譫妄合併失智。NICE 建議：',opts:['先當譫妄處理','出院後再做認知篩檢決定','以認知工具分數區分後再處理','先開立失智藥物觀察反應'],ans:0,why:'無法區分時先當譫妄處理；也不應只靠標準化工具來區分譫妄與譫妄合併失智。',src:'NICE NG97 1.2.31–1.2.32'}
];
/*QUIZ-END*/
/*MAP-START*/
DG.map={
 left:[
  {t:'安全檢核',s:'有警訊先處理，暫停亞型判讀',l:[
   ['急性混亂','數小時至數天的混亂、注意力或意識改變，優先評估譫妄'],
   ['神經症狀','突然單側無力、語言困難、劇烈頭痛、癲癇，立即就醫'],
   ['急病或用藥後','感染、脫水、低血糖或新用藥後的認知改變'],
   ['快速惡化','數週至數月惡化，轉介可做腦脊髓液檢查的神經科，評估 CJD 等（NICE 1.2.7）'],
   ['不清楚','不等於沒有；四題都答完才放行'],
   ['分不清譫妄或失智','先當譫妄處理（NICE 1.2.32）']]},
  {t:'認知與功能症候群',s:'與過去的自己比較，確認獨立性',l:[
   ['病史','本人，並在可能時加上知情者（NICE 1.2.1）'],
   ['認知工具','用驗證過的工具；分數正常不能單獨排除（NICE 1.2.3–1.2.4）'],
   ['SCD','主觀下降，客觀未證實，獨立性保留'],
   ['MCI','客觀障礙，獨立性保留'],
   ['失智症候群','客觀障礙，且認知下降影響獨立性'],
   ['功能差但測驗正常','查教育、語言、感官、天花板效應與憂鬱，必要時神經心理評估']]},
  {t:'可逆與共存因素',s:'項目依情境選擇，非固定套組',l:[
   ['核心項目','B12、TSH、血糖／電解質／鈣／腎肝功能、血球、結構影像（NICE 1.2.2、1.2.13；AAN 2001）'],
   ['視情境','尿液（疑譫妄或感染）；梅毒／HIV（臨床懷疑或高風險）'],
   ['共存因素','憂鬱、聽視力、抗膽鹼藥物負擔（NICE 1.2.6、1.6.2）'],
   ['正常結果','不代表已排除所有可治療病因']]},
  {t:'進階檢查原則',s:'有助判斷亞型且會改變處置才做',l:[
   ['AD','FDG-PET 或 CSF；CT／MRI 不能單獨排除；不用 APOE、腦波診斷（NICE 1.2.15–1.2.18）'],
   ['DLB','123I-FP-CIT SPECT，無法取得時考慮 MIBG；正常不能單獨排除（NICE 1.2.20–1.2.22）'],
   ['FTD','FDG-PET 或灌流 SPECT；影像不能單獨排除（NICE 1.2.23–1.2.24）'],
   ['血管性','優先 MRI；不單憑病灶負荷診斷（NICE 1.2.26–1.2.27）'],
   ['血液生物標記','專科、有客觀障礙者；triage 至少 90%／75%，取代 PET／CSF 至少 90%／90%'],
   ['無症狀者','不建議常規做 AD 生物標記診斷篩檢']]},
  {t:'14 項危險因子',s:'Lancet 2024；不作診斷或風險分級',stages:true,l:[
   ['解讀','約 45% 是人口可歸因比例，不能換算個人機率']]},
  {t:'報告界線',s:'保留可能性，不排名',l:[
   ['不做的事','不估機率、不依機率排序、不核發正式診斷分類'],
   ['「無」的回答','不能單獨排除病因'],
   ['混合病因','血管與退化性線索可並存，由臨床確認']]}
 ],
 right:[
  {t:'阿茲海默症（AD）',s:'情節記憶，逐漸惡化',l:[
   ['線索','反覆忘記近期事情；隱匿起病並漸進'],
   ['評估','包含言語情節記憶測試（NICE 1.2.10）'],
   ['生物學診斷','與臨床症候群分開看；核心生物標記由專科確認'],
   ['提醒','只有「漸進惡化」不算 AD 特異線索']]},
  {t:'路易氏體失智（DLB）',s:'波動、視幻覺、演夢、巴金森',l:[
   ['必要條件','失智症'],
   ['核心特徵','認知波動、反覆視幻覺、REM 睡眠行為障礙、巴金森症狀（一項主徵即可）'],
   ['指標性生物標記','DAT 攝取降低、MIBG 攝取降低、PSG 證實 REM 無肌張力消失'],
   ['Probable','≥2 項核心，或 1 項核心加 ≥1 項指標性；不可只憑生物標記'],
   ['Possible','1 項核心，或只有指標性生物標記'],
   ['用藥安全','抗精神病藥可惡化動作症狀並有嚴重敏感反應（NICE 1.7.4）']]},
  {t:'巴金森病失智（PDD）',s:'一年慣例',l:[
   ['時間關係','確立的 PD 超過一年後才出現失智，較符合 PDD'],
   ['限制','一年是鑑別慣例；本工具未實作完整 PDD 準則']]},
  {t:'行為型額顳葉（bvFTD）',s:'六項中至少三項',l:[
   ['六項特徵','早期失去抑制、冷漠、失去同理心、固著行為；飲食改變；執行功能障礙且記憶視空間相對保留'],
   ['早期','症狀出現的前三年內'],
   ['Possible','進行性退化加 ≥3 項，且持續或反覆'],
   ['Probable','另需明顯功能下降與相符影像，且無強烈 AD 等生物標記'],
   ['Definite','FTLD 病理或已知致病突變'],
   ['排除','不能以其他疾病或精神疾病更好解釋']]},
  {t:'血管性認知障礙',s:'臨床與影像都要符合',l:[
   ['有中風','認知下降與腦血管事件有時間關聯'],
   ['無中風','處理速度、複雜注意力或額葉執行功能下降，加早期步態、排尿或人格情緒改變之一'],
   ['影像','1 個大血管梗塞足以支持 mild，≥2 個通常才支持 major；或廣泛融合白質病變、多發腔隙'],
   ['Mild／Major','依獨立性是否受影響區分'],
   ['確定度','臨床與影像都符合才是 probable；無影像為 possible']]},
  {t:'原發性進行性失語（PPA）',s:'初期以語言障礙為主',l:[
   ['納入','初期有突出且獨立的語言障礙；語言以外的日常活動維持'],
   ['排除','初期顯著情節記憶或視空間障礙；中風、腫瘤等；明顯巴金森症候群'],
   ['非流暢型','文法缺失或言語費力（至少一項）'],
   ['語意型','命名障礙與單字理解障礙（兩者皆需）'],
   ['Logopenic','找詞與句子複述障礙（兩者皆需）；最常見病理可能是 AD']]},
  {t:'常壓性水腦症（iNPH）',s:'步態、認知、排尿加影像',l:[
   ['Possible','三徵至少一項，症狀無法以他病完全解釋，無明顯腦室擴大前因'],
   ['Probable','加上 CSF 壓力 ≤200 mmH₂O、成分正常，及 DESH 加步態障礙或放液／引流後改善'],
   ['Definite','分流手術後症狀客觀改善'],
   ['DESH','腦室擴大、Sylvian 裂增寬、高位腦溝狹窄'],
   ['放液測試','有助診斷與預測療效；陰性不能排除']]}
 ]
};
DG.map.left.find(b=>b.stages).l.unshift(...['早年','中年','晚年'].map(stage=>[stage,DG.risks.filter(r=>r.stage===stage).map(r=>r.name+(r.badge?'（2024 新增）':'')).join('、')]));
/*MAP-END*/
