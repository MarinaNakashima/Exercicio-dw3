const express = require("express");
const routerApp = express.Router();

const appSalasDeAula = require("../apps/controller/ctlSalasDeAula");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/getAllSalasDeAula", appSalasDeAula.getAllSalasDeAula);
routerApp.post("/getSalasDeAulaByID", appSalasDeAula.getSalasDeAulaByID);
routerApp.post("/insertSalasDeAula", appSalasDeAula.insertSalasDeAula);
routerApp.put("/updateSalasDeAula/:id", appSalasDeAula.updateSalasDeAula);
routerApp.delete("/deleteSalasDeAula/:id", appSalasDeAula.deleteSalasDeAula);

module.exports = routerApp;

