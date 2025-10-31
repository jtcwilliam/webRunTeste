import puppeteer from "puppeteer";

import { Pool } from "pg";

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

  for (let index = 0; index <= 1; index++) {
    await page.goto(
      `https://www.guarulhos.sp.gov.br/cartadeservicos?combine=&field_servicos_target_id=All&page=${index}`
    );

    const options = await page.$$eval(
      " .views-field-title .field-content a",
      (options) => {
        let caminho = options.map((option) => option.href);
        let informacao = options.map((option) => option.text);

        return { caminho, informacao };
      }
    );

    const secretaria = await page.$$eval(
      " .views-field-field-servicos .field-content a",
      (secretaria) => {
        let nomeSecretaria = secretaria.map((sec) => sec.text);
        let caminhoSecretaria = secretaria.map((sec) => sec.href);

        return { nomeSecretaria, caminhoSecretaria };
      }
    );

    console.log(secretaria["nomeSecretaria"]);

    for (let index = 0; index < options["informacao"].length; index++) {
      const informacao = options["informacao"][index];
      const caminho = options["caminho"][index];

      const nomeSec = secretaria["nomeSecretaria"][index];
      const caminhoSecretaria = secretaria["caminhoSecretaria"][index];
      const idSecretaria = caminhoSecretaria.split("/")[5];

      //console.log(informacao);

      await inserirBanco(caminho, informacao, nomeSec, idSecretaria);
    }
  }
  await browser.close();
})();

let proximoId = 0;

export default async function inserirBanco(
  caminho,
  link,
  nomeSecretaria,
  idSecretaria
) {
  const client = await pool.connect();

  try {
    const proximo = client.query(
      `select nextval('linkcartaservico_idlinkcartaservico_seq')`
    );
    proximoId = (await proximo).rows;

    //console.log(proximoId[0].nextval);

    for (const element of proximoId) {
      console.log(element.nextval);

      const res = await client.query(
        `INSERT INTO linkCartaServico (idlinkcartaservico, linkCarta,descricaoCarta, nomeSecretaria, idSecretaria) VALUES ( '${element.nextval}' ,'${caminho}','${link}','${nomeSecretaria}','${idSecretaria}')`
      );
    }
  } finally {
    client.release(); // Release the client back to the pool
    return false;
  }
}
