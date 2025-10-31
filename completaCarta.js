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
    [
      2309,
      " https://www.guarulhos.sp.gov.br/cartadeservicos/saude/diagnostico-de-doencas-de-notificacao-compulsoria-dnc-tuberculose-latente",
      "DIAGNÓSTICO DE DOENÇAS DE NOTIFICAÇÃO COMPULSÓRIA (DNC) – TUBERCULOSE LATENTE – IGRA (INTERFERON GAMMA)",
      205,
    ],
    [
      2310,
      " https://www.guarulhos.sp.gov.br/cartadeservicos/verde-clima-e-sustentabilidade-meio-ambiente/licenca-ambiental-previa-e-de-0",
      "Licença Ambiental Prévia e de Instalação - LP LI para empresas em fase de implantação sem CNPJ",
      307,
    ],
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
    const sql =
      "INSERT INTO cartaServico (idLinkCarta, descricaoCarta,idSecretaria ,textoCartaServico, versaoCartaServico) VALUES ($1,$2,$3,$4,$5 )";
    const res = await client.query(sql, [
      idLinkCarta,
      descricaoCarta,
      idSecretaria,
      textoCartaServico,
      versaoCartaServico,
    ]);
    console.log(sql);
  } finally {
    client.release(); // Release the client back to the pool
  }
}
