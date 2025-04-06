// styles/global.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.background}; 
    color: ${(props) => props.theme.colors.foreground};
    font-family: ${(props) => props.theme.typography.fontFamily}; 
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.center {
  margin: 0 auto;
}

.w-full {
  width: 100%;
}


  ${({ theme }) => Object.entries(theme.spacing).map(
    ([key, value]) => `
    .m-${key} { margin: ${value}; }
    .p-${key} { padding: ${value}; }
    .px-${key} {padding-right: ${value}; padding-left: ${value};}
    .mt-${key} { margin-top: ${value}; }
    .mb-${key} { margin-bottom: ${value}; }
    .ml-${key} { margin-left: ${value}; }
    .mr-${key} { margin-right: ${value}; }
    `
  )}
`;
