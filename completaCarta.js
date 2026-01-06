// eu, tu, 2 bota nela


import puppeteer from "puppeteer";
import { Pool } from "pg";
let contRes = 1;
const pool = new Pool({
  user: "dbagenddevpost",
  host: "dbagenddevpost.postgresql.dbaas.com.br",
  database: "dbagenddevpost",
  password: "Sge@4@5",
  port: 5432,
});

(async () => {
  // launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.waitForNetworkIdle();

  let linksCarta = [

    [2710, ' https://www.guarulhos.sp.gov.br/cartadeservicos/saude/liberacao-de-obitos ', ' 205']
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
      text,
      "Versao 1 - 2025"
    );
  }




  await browser.close();
})();

export default async function inserirCartaCompleta(
  //idLinkCarta, descricaoCarta,idSecretaria ,textoCartaServico, versaoCartaServico
  idLinkCarta,
  idSecretaria,
  textoCartaServico,
  versaoCartaServico
) {
  const client = await pool.connect();

  try {
    const sql =
      "INSERT INTO carta_servico (id_nome_carta_servico,id_secretaria ,texto_carta_servico, versao_carta_servico) VALUES ($1,$2,$3,$4 )";
    const res = await client.query(sql, [
      idLinkCarta,
      idSecretaria,
      textoCartaServico,
      versaoCartaServico
    ]);
    console.log(sql);
  } finally {
    client.release(); // Release the client back to the pool
  }
}
