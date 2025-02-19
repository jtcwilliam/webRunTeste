// npm install puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // open the target table URL
    await page.goto('http://servicos.guarulhos.sp.gov.br:8080/portalGuarulhos/TesteServico.do?id_servico=880');

    // scrape the table data
    const tableData = await page.evaluate(() => {
        const rows = document.querySelectorAll('body table tbody tr td table tbody tr td  table tbody tr td table   tbody  tr     ');

        // empty array to collect scraped data
        const data = new Array()

        // iterate through the rows to collect their data
        
        rows.forEach((row) => {

            product = row.querySelector(' td').innerText.trim();

          
          
            data.push(product);
        });

        // return the extracted data
        return data;
    });

  
    console.log(tableData[1]);
    console.log(tableData[2]);
    
    

    // close the browser
    await browser.close();
})();
