const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://servicos.guarulhos.sp.gov.br:8080/portalGuarulhos/TesteServico.do?id_servico=211326');
  
  const pageUrls = await page.evaluate(() => {
    const urlArray = Array.from(document.links).map((link) => link.href);
    const uniqueUrlArray = [...new Set(urlArray)];
    return uniqueUrlArray;
  });

  console.log(pageUrls);
 
  await browser.close();
})();
