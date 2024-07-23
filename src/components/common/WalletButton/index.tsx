import { Button } from "@mui/material";
import React from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

function WalletButton() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  return (
    <Button variant="contained" onClick={() => open()}>
      {isConnected ? "Connected" : "Connect Wallet"}
    </Button>
  );
}

export default WalletButton;
