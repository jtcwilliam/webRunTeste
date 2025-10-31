import puppeteer from "puppeteer";
import { Pool } from "pg";
import { inserirBanco } from "inserirBanco";

let dadosInformacao = [];

const pool = new Pool({
  user: "dbagenddevpost",
  host: "dbagenddevpost.postgresql.dbaas.com.br",
  database: "dbagenddevpost",
  password: "Sge@4@5",
  port: 5432,
});

export default async function pegarServico() {
  // launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let index = 0; index < 1; index++) {
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

    let jk = 0;
    for (let index = 0; index < options["informacao"].length; index++) {
      const informacao = options["informacao"][index];
      const caminho = options["caminho"][index];

      const nomeSec = secretaria["nomeSecretaria"][index];
      const caminhoSecretaria = secretaria["caminhoSecretaria"][index];
      const idSecretaria = caminhoSecretaria.split("/")[5];

      inserirBanco(caminho, link, nomeSecretaria, idSecretaria);
    }
  }

 