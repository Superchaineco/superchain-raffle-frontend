import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Web3ModalProvider from "@/context";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuperChainRaffle",
  description: "SuperChain product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>
          <Providers>{children}</Providers>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
