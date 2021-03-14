const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "cpf already exists!" });
  }
  request.customer = customer;
  return next();
};

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const cpfExistes = customers.some((customer) => customer.cpf === cpf);
  if (cpfExistes) {
    return response.status(400).json({ error: "cpf already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { statement } = request.customer;

  return response.json(statement);
});
app.listen(3333);
