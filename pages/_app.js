import { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AlurakutCommons';
import dark from '../src/styles/themes/dark';
import light from '../src/styles/themes/light';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: ${props => props.theme.colors.backgroundDefault};
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`;

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title == 'light' ? dark : light);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component toggleTheme={toggleTheme} {...pageProps} />
      </ThemeProvider>
    </>
  );
}
