"""產生可攜式單檔與 Pages 發布資料夾；不收集評估紀錄。"""
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
portable = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?[^"]*)?">',
                  lambda _: '<style>' + (ROOT / 'style.css').read_text(encoding='utf-8') + '</style>', html)
portable = re.sub(r'<script defer src="[^"]+"></script>', '', portable)
scripts = ''.join('<script>' + (ROOT / name).read_text(encoding='utf-8') + '</script>'
                  for name in ['data.js', 'engine.js', 'app.js'])
portable = portable.replace('</body>', scripts + '</body>')
(ROOT / '失智症互動評估.html').write_text(portable, encoding='utf-8')
site = ROOT / '_site'
site.mkdir(exist_ok=True)
for name in ['index.html', 'style.css', 'data.js', 'engine.js', 'app.js', '失智症互動評估.html']:
    shutil.copy2(ROOT / name, site / name)
(site / '.nojekyll').write_text('', encoding='utf-8')
print('Prepared static website: 7 files; no patient records or development files included.')
