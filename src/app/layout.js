'use client'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global.js'; 
import { theme_orange } from './styles/theme.js'; 
import StyledComponentsRegistry from './lib/registry.js';


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme_orange}> 
            <GlobalStyle /> 
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
