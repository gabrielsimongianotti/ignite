const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (resquest, response) => {
  const { cpf, name } = resquest.body;
  const id = uuidv4();

  customers.push({
    cpf,
    name,
    id,
    statement:[]
  });

  return response.status(201).send();
});

app.listen(3333);
