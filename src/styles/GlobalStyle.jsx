import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-dark: #191A20;
    --color-primary: #0A2F32;
    --color-secondary: #8C8D96;
    --color-tertiary: #B2B3B9;
    --color-border: #E3E5E3;
    --color-background: #FDFAF4;
    --color-white: #fff;
    --color-green: #19B786;
    --color-green-light: #7DC456;
    --color-gradient: linear-gradient(#19B786, #7DC456);
    --font-main: 'Noto Sans KR', sans-serif;
    --font-size-micro: 12px;
    --line-height-micro: 16px;
    --letter-spacing-micro: -0.005em;
    --font-size-tiny: 13px;
    --line-height-tiny: 20px;
    --letter-spacing-tiny: -0.01em;
    --font-size-small: 14px;
    --line-height-small: 24px;
    --letter-spacing-small: -0.01em;
    --font-size-base: 16px;
    --line-height-base: 24px;
    --letter-spacing-base: -0.01em;
    --font-size-medium: 18px;
    --line-height-medium: 28px;
    --letter-spacing-medium: -0.02em;
    --font-size-large: 24px;
    --line-height-large: 34px;
    --letter-spacing-large: -0.01em;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: var(--font-main);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: var(--font-main);
    font-size: var(--font-size-base);
  }

  body {
    font-family: var(--font-main);
    color: var(--primary);
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
