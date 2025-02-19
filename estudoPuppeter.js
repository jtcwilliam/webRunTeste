// npm install puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // open the target table URL
    await page.goto('http://servicos.guarulhos.sp.gov.br:8080/portalGuarulhos/TesteServico.do?id_servico=211326');

    // scrape the table data
    const tableData = await page.evaluate(() => {
        const rows = document.querySelectorAll('#product-catalog tbody tr');

        // empty array to collect scraped data
        const data = [];

        // iterate through the rows to collect their data
        rows.forEach((row) => {
            const product = {
                id: row.querySelector('.product-id').textContent.trim(),
                name: row.querySelector('.product-name').textContent.trim(),
                category: row
                    .querySelector('.product-category')
                    .textContent.trim(),
                price: row.querySelector('.product-price').textContent.trim(),
                inStock: row.querySelector('.product-stock').textContent.trim(),
            };
            data.push(product);
        });

        // return the extracted data
        return data;
    });

    // log the extracted data
    console.log(tableData);

    // close the browser
    await browser.close();
})();
