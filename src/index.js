require("dotenv").config();
const express = require("express");
const rotas = require("./rotas");

const app = express();

app.use(express.json());

app.use(rotas);
app.get("/", async (req, res) => {
  return res.json("API está OK!");
});

const port = process.env.PORT || 3000;
app.listen(port);
