const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

db.sequelize.sync();

app.use(cors(corsOptions));

// parsea el request de content-type - application/json
app.use(bodyParser.json());

// parsea el request de content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ titulo: "Bienvenidos al detector de mutantes." });
});

require("./app/routes/dna.routes")(app);

// setea puerto y escucha los request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});