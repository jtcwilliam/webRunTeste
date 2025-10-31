import { Pool } from "pg";

const pool = new Pool({
  user: "dbagenddevpost",
  host: "dbagenddevpost.postgresql.dbaas.com.br",
  database: "dbagenddevpost",
  password: "Sge@4@5",
  port: 5432,
});

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
