import puppeteer from "puppeteer";
import mysql2 from "mysql2";

(async () => {
  // launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let maximo = 40;

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

      console.log(idSecretaria);
      

      //  await inserirBanco(caminho, informacao);
    }
  }
  await browser.close();
})();

export default async function inserirBanco(caminho, link) {
  try {
    const connection = mysql2.createConnection({
      host: "dbagenddev.mysql.dbaas.com.br",
      //  user: "u328184393_dev_appraiser",
      //  database: "u328184393_dev_appraiser",

      password: "Sge@4@5",
      user: "dbagenddev",
      database: "dbagenddev",
    });

    const promissePool = connection.promise();

    //

    try {
      const sql =
        "INSERT INTO linkCartaServico (linkCarta,descricaoCarta) VALUES (?, ?)";
      const [result] = await promissePool.query(sql, [caminho, link]);

      console.log(`User inserted with ID: ${result.insertId}`);
      console.log(`Affected rows: ${result.affectedRows}`);
    } catch (err) {
      console.error("Error inserting user:", err);
    } finally {
      connection.end();
    }

    //
  } catch (error) {
    reject(error);
  }
}
