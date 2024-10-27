import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import darkTheme from '../themes/darkTheme';
import lightTheme from '../themes/lightTheme';

function CustomThemeProvider({ children }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    document.body.style.backgroundColor =
      currentTheme === 'light'
        ? lightTheme.colors.bg.main
        : darkTheme.colors.bg.main;

    document.body.style.color =
      currentTheme === 'light'
        ? lightTheme.colors.text.main
        : darkTheme.colors.text.main;
  }, [currentTheme]);
  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
