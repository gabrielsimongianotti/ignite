import logo from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModa: () => void
}

export function Header({ onOpenNewTransactionModa }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModa} >
          Nava transação
        </button>

      </Content>
    </Container>
  );
}