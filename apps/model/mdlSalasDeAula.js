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

// Função para atualizar uma sala de aula por ID
const updateSalasDeAula = async (salasdeaulaID, descricao, localizacao, capacidade) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 AND removido = false",
        [descricao, localizacao, capacidade, salasdeaulaID]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlSalasDeAula|updateSalasDeAula] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteSalasDeAula = async (salasdeaulaID) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = $1 AND removido = false",
        [salasdeaulaID]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlSalasDeAula|deleteSalasDeAula] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  getAllSalasDeAula,
  getSalasDeAulaByID,
  insertSalasDeAula,
  updateSalasDeAula,
  deleteSalasDeAula
};