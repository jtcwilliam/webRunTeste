// npm install puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // open the target table URL
    await page.goto('http://servicos.guarulhos.sp.gov.br:8080/portalGuarulhos/TesteServico.do?id_servico=211326');


    await page.setViewport({width: 1080, height: 1024});
    // scrape the table data

 console.log('william');

 

 

// Locate the full title with a unique string.
const textSelector = await page
  .locator('text/Customize and automate')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();Í

   
    
    

  

    // close the browser
    await browser.close();
})();
