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

  module.exports = {
    getAllSalasDeAula,
    getSalasDeAulaByID,
    insertSalasDeAula
  };