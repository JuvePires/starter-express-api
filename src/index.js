require("dotenv").config();
const express = require("express");
const rotas = require("./rotas");

const app = express();

app.use(express.json());

// Middleware global para todas as requisições
app.use((req, res, next) => {
  // Imprime informações sobre a requisição
  console.log('Nova requisição:');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Corpo da Requisição:', req.body);

  // Continue para a próxima função de middleware na cadeia
  next();
});

app.use(rotas);
app.get("/", async (req, res) => {
  return res.json("API está OK!");
});

const port = process.env.PORT || 3000;
app.listen(port);
