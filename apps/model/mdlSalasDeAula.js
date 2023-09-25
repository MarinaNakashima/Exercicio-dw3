const db = require("../../database/databaseconfig");

const getAllSalasDeAula = async () => {
  return (
    await db.query(
      "SELECT *" +
        "FROM salasdeaula WHERE removido = false ORDER BY descricao ASC"
    )
  ).rows;
};

const getSalasDeAulaByID = async (salasdeaulaIDPar) => {
    return (
      await db.query(
        "SELECT *" +
          "FROM salasdeaula WHERE salasdeaulaid = $1 and removido = false ORDER BY descricao ASC",
        [salasdeaulaIDPar]
      )
    ).rows;
  };

  const insertSalasDeAula = async (salasdeaulaREGPar) => {
    //@ Atenção: variável de msg para retornar erros do banco de dados.
    console.log("[insertsalasdeaula]",salasdeaulaREGPar)
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO salasdeaula " + 
          "values(default, $1, $2, $3, $4)",
          [
            salasdeaulaREGPar.descricao,
            salasdeaulaREGPar.localizacao,
            salasdeaulaREGPar.capacidade,
            salasdeaulaREGPar.removido,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlSalasDeAula|insertSalasDeAula] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };

module.exports = {
    getAllSalasDeAula,
    getSalasDeAulaByID,
    insertSalasDeAula
  };