"use client";
import React from "react";
import { type Theme, ThemeProvider } from "@mui/material";
import SafeThemeProvider from "../components/theme/SafeThemeProvider";
import PageLayout from "../components/common/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

function Providers({ children }: { children: React.ReactNode }) {
  //   const themeMode = isDarkMode ? 'dark' : 'light';
  const themeMode = "light";

  const queryClient = new QueryClient()

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <QueryClientProvider client={queryClient}>
            <PageLayout>{children}</PageLayout>
          </QueryClientProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}

export { Providers };
