import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactionsContext";


export function Summary () {
  const { transactions } = useTransactions()
  const summay = transactions.reduce((acc, transactions) => {
    if (transactions.type === 'deposit') {
       acc.deposits += transactions.amount;
       acc.total += transactions.amount;
    } else{
      acc.withdraws +=transactions.amount;
      acc.total -= transactions.amount;
    }
    return acc
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$ {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summay.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saida</p>
          <img src={outcomeImg} alt="Saida" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summay.withdraws)}</strong>
      </div>
      <div className="highlight-backgrond">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summay.total)}</strong>
      </div>
    </Container>
  );
}