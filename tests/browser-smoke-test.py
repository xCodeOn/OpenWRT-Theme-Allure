from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
p=Path(__file__).resolve().parents[1]
def inline(path):
 soup=BeautifulSoup(path.read_text(encoding='utf8'),'html.parser')
 for link in list(soup.find_all('link',href=True)):
  if link.get('rel')==['stylesheet']:
   f=(path.parent/link['href']).resolve();s=soup.new_tag('style');s.string=f.read_text(encoding='utf8');link.replace_with(s)
 for script in list(soup.find_all('script',src=True)):
  f=(path.parent/script['src']).resolve();script.extract()
  if f.name=='allure-ui.js': continue
  s=soup.new_tag('script');s.string=f.read_text(encoding='utf8');soup.body.append(s)
 return str(soup)
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for file in ['interface-system.html','interface-packages.html','interface-network.html','interface-firewall.html','interface-forkop-mobile.html','interface-new-plugin.html']:
  page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(inline(p/'preview'/file),wait_until='load');page.wait_for_timeout(170)
  before=page.evaluate('''() => ({w:innerWidth,doc:document.documentElement.scrollWidth, tables:[...document.querySelectorAll('#maincontent table, #maincontent .table')].length,adaptive:window.AllureAdaptive?.version})''')
  assert not errors,(file,errors)
  assert before['doc'] <= before['w']+2,(file,before)
  assert before['adaptive']=='1.7.0',(file,before)
  if file=='interface-new-plugin.html':
   # Opt-out applies even to newly inserted nodes
   page.evaluate('''() => {const node=document.createElement('div');node.setAttribute('data-allure-ignore','');node.innerHTML='<nav class="nav-tabs"><a href="#">No decoration</a></nav>';document.getElementById('view').appendChild(node)}''')
   page.wait_for_timeout(120)
   assert page.locator('[data-allure-ignore] nav').get_attribute('class')=='nav-tabs'
   assert page.locator('[data-allure-ignore] nav .allure-adaptive-icon').count()==0
  print(file, before, 'errors=0')
  page.close()
 b.close()
