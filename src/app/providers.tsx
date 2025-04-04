"use client";
import React from "react";
import { type Theme, ThemeProvider } from "@mui/material";
import SafeThemeProvider from "../components/theme/SafeThemeProvider";
import PageLayout from "../components/common/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import SafeProvider from "@safe-global/safe-apps-react-sdk";

function Providers({ children }: { children: React.ReactNode }) {
  //   const themeMode = isDarkMode ? 'dark' : 'light';
  const themeMode = "light";

  const queryClient = new QueryClient();
  const client = new ApolloClient({
    uri: "https://gateway.thegraph.com/api/00ebf42f37ee2faa3f02f5ca587b1717/subgraphs/id/2EEqdCXk2wRAQsxmU3E8hftc6S6M8RAAgSoNfNoth6ky",
    cache: new InMemoryCache(),
  });

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ApolloProvider client={client}>
          <ThemeProvider theme={safeTheme}>
            <SafeProvider>
              <QueryClientProvider client={queryClient}>
                <PageLayout>{children}</PageLayout>
              </QueryClientProvider>
            </SafeProvider>
          </ThemeProvider>
        </ApolloProvider>
      )}
    </SafeThemeProvider>
  );
}

export { Providers };
