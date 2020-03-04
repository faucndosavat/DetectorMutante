module.exports = app => {
    const dna = require("../controllers/dna.controller.js");
  
    var router = require("express").Router();
  
    // Ruta para analizar la secuencia de and
    router.post("/mutant/", dna.analizar);
  
    // Ruta para obtener estadíticas
    router.get("/stats", dna.estadistica);
  
    app.use('/', router);
  };