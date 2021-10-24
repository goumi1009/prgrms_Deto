import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: #0A2F32;
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
