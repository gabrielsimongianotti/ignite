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

const getBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
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

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { decription, amount } = request.body;
  const { customer } = request;

  const statementOptions = {
    decription,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOptions);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" });
  }

  const statementOperation = { amount, created_at: new Date(), type: "debit" };

  customer.statement.push(statementOperation);
  
  return response.status(201).send();
});

app.listen(3333);
