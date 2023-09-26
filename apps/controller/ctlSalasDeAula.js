const mdlSalasDeAula = require("../model/mdlSalasDeAula");

const getAllSalasDeAula = (req, res) =>
  (async () => {
    let registro = await mdlSalasDeAula.getAllSalasDeAula();
    res.json({ status: "ok", "registro": registro });
  })();

  const getSalasDeAulaByID = (req, res) =>
  (async () => {
    const salasdeaulaID = parseInt(req.body.salasdeaulaid);
    let registro = await mdlSalasDeAula.getSalasDeAulaByID(salasdeaulaID);

    res.json({ status: "ok", "registro": registro });
  })();

  const insertSalasDeAula = (request, res) =>
  (async () => {
    const salasdeaulaREG = request.body; 
    let { msg, linhasAfetadas } = await mdlSalasDeAula.insertSalasDeAula(salasdeaulaREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const updateSalasDeAula = async (req, res) => {
  const id = req.params.id;
  const { descricao, localizacao, capacidade } = req.body;

  try {
    const result = await db.query(
      'UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 AND removido = false',
      [descricao, localizacao, capacidade, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Sala de aula não encontrada ou já removida.' });
    } else {
      res.json({ message: 'Sala de aula atualizada com sucesso.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar sala de aula.' });
  }
};

const deleteSalasDeAula = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      'UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = $1 AND removido = false',
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Sala de aula não encontrada ou já removida.' });
    } else {
      res.json({ message: 'Sala de aula removida com sucesso.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover sala de aula.' });
  }
};

  module.exports = {
    getAllSalasDeAula,
    getSalasDeAulaByID,
    insertSalasDeAula,
    updateSalasDeAula,
    deleteSalasDeAula
};