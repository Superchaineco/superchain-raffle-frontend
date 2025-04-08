import superchainModuleABI from "./abi/SCSAModule.abi.json";
import superchainRaffleABI from "./abi/SCRaffle.abi.json";
export const SUPER_CHAIN_ACCOUNT_MODULE_ADDRESS =
  "0x1Ee397850c3CA629d965453B3cF102E9A8806Ded";
export const SUPER_CHAIN_RAFFLE = "0x30B6f7C268fa02b96284A7A2b3Af38E006b5e2A2";
export const SUPER_CHAIN_ACCOUNT_MODULE_ABI = superchainModuleABI;
export const SUPER_CHAIN_RAFFLE_ABI = superchainRaffleABI;
export const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL;
