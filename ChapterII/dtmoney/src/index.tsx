import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { v4 as uuidv4 } from 'uuid';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela webpage',
          type: 'deposit',
          category: 'Dev',
          amount: 4500,
          createdAt: new Date('2021-03-15 08:00:00')
        },

        {
          id: 2,
          title: 'Supermercados',
          type: 'withdraw',
          category: 'Compras',
          amount: 1200,
          createdAt: new Date('2021-03-15 13:00:00')
        }
      ]
    });
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const newTransactionModal = { ...data, id: uuidv4(), createdAt: new Date('2021-03-15 13:00:00') };
      schema.create('transaction', newTransactionModal);
      return newTransactionModal;
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
