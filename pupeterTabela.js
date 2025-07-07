   
const puppeteer = require('puppeteer');

 
 
(async () => {
    // launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const objetoLinks = [];
 
 
   

        let maximo = 40;


        for (let index = 0; index < 9; index++) {
           
          
            
            
            
        }

        for (let index = 0; index <= 39; index++) {
            
          
            

            await page.goto(`https://www.guarulhos.sp.gov.br/cartadeservicos?combine=&field_servicos_target_id=All&page=${index}`);


            const options = await page.$$eval(' .views-field-title .field-content a', options => {
                let caminho = options.map(option => option.href);
                let informacao = options.map(option => option.text);

                objetoInformacoes = {
                    "links": caminho,
                    "textos": informacao
                }

                return objetoInformacoes;



            });


            console.log(options);
            
            



        }
    await browser.close();

    })();
    

    //console.log(`o link: ${objetoLinks[0]['links'][0]} corresponde ao texto ${objetoLinks[0]['textos'][0]}`);







 
