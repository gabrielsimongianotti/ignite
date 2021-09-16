import { useState } from "react";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransationsProvider } from "./hooks/useTransactionsContext";

import { GlobalStyle } from "./styles/global";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function hanbleOpenTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function hanbleCloseTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransationsProvider>
      <NewTransactionModal isOpen={isNewTransactionModalOpen}  onRequestClose={hanbleCloseTransactionModal} />
      <Header onOpenNewTransactionModa={hanbleOpenTransactionModal} />
      <Dashboard />
      <GlobalStyle />
    </TransationsProvider>
  );
}