'use client';
import React from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import SafeThemeProvider from '@/components/theme/SafeThemeProvider';
import PageLayout from '@/components/common/Layout';

function Providers({ children }: { children: React.ReactNode }) {
  //   const themeMode = isDarkMode ? 'dark' : 'light';
  const themeMode = 'light';

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <PageLayout>{children}</PageLayout>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}

export { Providers };
