// npm install puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // open the target table URL
    await page.goto('http://servicos.guarulhos.sp.gov.br:8080/portalGuarulhos/TesteServico.do?id_servico=25');

 
    



    
          //aqui pega dados menos travados (legislação links, etc, etc)
          const dataB = await page.$$eval('body table tbody tr  td  table tbody tr td  table tbody tr td table tbody tr td table tbody     ',
            tds => tds.map((td) => {
           
               dataB= td.innerHTML.trim()
    
    
               return dataB;
    
         }));
         

      
      
         console.log('REquisitos');
         console.log(dataB[5]);
       
    
         //final dos dados menos travados


    //aqui pega dados mais travados (legislação links, etc, etc)
    const data = await page.$$eval('body table tbody tr  td  table tbody tr td  table tbody tr td table tbody          ',
         tds => tds.map((td) => {
        
            data= td.innerText.trim()


            return data;

      }));
      
 
 


      
          
      //final dos dados mais travados



 
    
    
    

    // close the browser
    await browser.close();
})();
