import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --background: #F0F2F5;
    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33CC95;
    --blue-light: #6933FF;

    --test-title: #363F5F;
    --test-body: #969Cb3;

    --snape: #FFFFFF;
  }

  html{
    @media(max-width: 1080px){
      font-size:93.75%
    }

    @media(max-width: 720px){
      font-size:87.5%
    }

    @media(max-width: 1080px){
      font-size:93.75%
    }
 }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    -webkit-font-smmothing: antialiased;
  }

  body, input, textarea, button{
    font-family: 'Poppins', sans-serif;
  }
 
  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed;
  }
 
  .react-modal-overlay{
    background: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display:flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content{
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius:0.24rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;
    
    &:hover {
      filter: brightness(0.9);
    }
  }
`;