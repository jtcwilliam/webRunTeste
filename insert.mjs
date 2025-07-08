import mysql2 from "mysql2";

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
 