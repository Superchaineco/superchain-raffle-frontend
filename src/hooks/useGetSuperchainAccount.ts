import { Address, createPublicClient, http } from "viem";
import { useQuery } from "react-query";
import { optimism } from "viem/chains";
import { SUPER_CHAIN_ACCOUNT_MODULE_ADDRESS } from "@/constants";

export type SuperChainAccount = {
  smartAccount: Address;
  superChainID: string;
  points: bigint;
  level: number;
  noun: {
    background: number;
    body: number;
    accessory: number;
    head: number;
    glasses: number;
  };
};

function useGetSuperchainAccount(address?: Address) {
  return useQuery<SuperChainAccount | null>({
    queryKey: ["superChainAccount", address],
    queryFn: async () => {
      if (!address) return null;
      const publicClient = createPublicClient({
        chain: optimism,
        transport: http(),
      });

      const response = await publicClient.readContract({
        address: SUPER_CHAIN_ACCOUNT_MODULE_ADDRESS,
        abi: [
          {
            type: "function",
            name: "getSuperChainAccount",
            inputs: [
              { name: "_safe", type: "address", internalType: "address" },
            ],
            outputs: [
              {
                name: "",
                type: "tuple",
                internalType: "struct ISuperChainModule.Account",
                components: [
                  {
                    name: "smartAccount",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "superChainID",
                    type: "string",
                    internalType: "string",
                  },
                  { name: "points", type: "uint256", internalType: "uint256" },
                  { name: "level", type: "uint16", internalType: "uint16" },
                  {
                    name: "noun",
                    type: "tuple",
                    internalType: "struct NounMetadata",
                    components: [
                      {
                        name: "background",
                        type: "uint48",
                        internalType: "uint48",
                      },
                      { name: "body", type: "uint48", internalType: "uint48" },
                      {
                        name: "accessory",
                        type: "uint48",
                        internalType: "uint48",
                      },
                      { name: "head", type: "uint48", internalType: "uint48" },
                      {
                        name: "glasses",
                        type: "uint48",
                        internalType: "uint48",
                      },
                    ],
                  },
                ],
              },
            ],
            stateMutability: "view",
          },
        ] as const,
        functionName: "getSuperChainAccount",
        args: [address],
      });
      return {
        smartAccount: response.smartAccount,
        superChainID: response.superChainID,
        points: response.points,
        level: response.level,
        noun: response.noun,
      };
    },
  });
}

export default useGetSuperchainAccount;
