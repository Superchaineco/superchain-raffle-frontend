"use client";
import React, { cache } from "react";
import { type Theme, ThemeProvider } from "@mui/material";
import SafeThemeProvider from "../components/theme/SafeThemeProvider";
import PageLayout from "../components/common/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function Providers({ children }: { children: React.ReactNode }) {
  //   const themeMode = isDarkMode ? 'dark' : 'light';
  const themeMode = "light";

  const queryClient = new QueryClient();
  const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/72352/superchain-raffle/version/latest",
    cache: new InMemoryCache(),
  });

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ApolloProvider client={client}>
          <ThemeProvider theme={safeTheme}>
            <QueryClientProvider client={queryClient}>
              <PageLayout>{children}</PageLayout>
            </QueryClientProvider>
          </ThemeProvider>
        </ApolloProvider>
      )}
    </SafeThemeProvider>
  );
}

export { Providers };
