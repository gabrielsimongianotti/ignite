import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Itransaction {
  id: string,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: Date,
};
type transactionInput = Omit<Itransaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Itransaction[]
  createTransaction: (transactions: transactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransationsProvider ({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Itransaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  async function createTransaction (transaction: transactionInput) {
    await api.post('/transactions', transaction).then(({ data }) => {

      setTransactions([
        ...transactions,
        data
      ])

    })
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext(TransactionsContext);

  return context;
}