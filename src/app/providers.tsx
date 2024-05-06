import React from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import SafeThemeProvider from '@/components/theme/SafeThemeProvider';

function Providers({ children }: { children: React.ReactNode }) {
  //   const themeMode = isDarkMode ? 'dark' : 'light';
  const themeMode = 'light';

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>{children}</ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}

export { Providers };
