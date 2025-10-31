import puppeteer from "puppeteer";
import mysql2 from "mysql2";

(async () => {
  
    // launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.waitForNetworkIdle();

  let linksCarta = [
    [
      4020,
      "https://www.guarulhos.sp.gov.br/cartadeservicos/desenvolvimento-economico-e-trabalho-sdceti/5-manutencao-de-incentivos-fiscais",
      "5) MANUTENÇÃO DE INCENTIVOS FISCAIS CONFORME ART. 19 DA LEI 7.306/2014 (AMPLIAÇÃO PROPORCIONAL)",
      300,
    ],
    [
      4021,
      "https://www.guarulhos.sp.gov.br/cartadeservicos/desenvolvimento-social-protecao-e-defesa-civil-assistencia-social/servico-0",
      "Serviço Especializado para Pessoas em Situação de Rua",
      242,
    ] 
  ];

  for await (linksCarta of linksCarta) {
    await page.goto(linksCarta[1]);

    const text = await page.$eval(
      "#main > div > div > div > div > article > div > div > div > div.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item",
      (element) => element.innerHTML
    );

    //"INSERT INTO cartaServico (idLinkCarta, descricaoCarta,idSecretaria ,textoCartaServico, versaoCartaServico) VALUES (?, ?,?,?,?)";
    await inserirCartaCompleta(
      linksCarta[0],
      linksCarta[2],
      linksCarta[3],
      text,
      "Versao 1 - 2025"
    );
  }

  await browser.close();
})();

export default async function inserirCartaCompleta(
  //idLinkCarta, descricaoCarta,idSecretaria ,textoCartaServico, versaoCartaServico
  idLinkCarta,
  descricaoCarta,
  idSecretaria,
  textoCartaServico,
  versaoCartaServico
) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      

       `INSERT INTO cartaServico (idLinkCarta, descricaoCarta,idSecretaria ,textoCartaServico, versaoCartaServico) VALUES ('${idLinkCarta}', '${descricaoCarta}','${idSecretaria}','${textoCartaServico}','${versaoCartaServico}')`

    );
    console.log(res);
  } finally {
    client.release(); // Release the client back to the pool
  }

  
}
