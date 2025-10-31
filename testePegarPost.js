import { Pool } from "pg";

let dados = [];
const pool = new Pool({
  user: "dbagenddevpost",
  host: "dbagenddevpost.postgresql.dbaas.com.br",
  database: "dbagenddevpost",
  password: "Sge@4@5",
  port: 5432,
});

async function queryDatabase() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * from linkcartaservico");
    //console.log(res.rows);

    dados.push(res.rows);
    
  } finally {
    client.release(); // Release the client back to the pool
  }
  return dados;
}

await console.log(queryDatabase());
