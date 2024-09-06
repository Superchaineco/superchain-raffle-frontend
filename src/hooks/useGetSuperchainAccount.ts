import { Address, createPublicClient, http } from "viem";
import { useQuery } from "@tanstack/react-query";
import { optimism } from "viem/chains";
import { SUPER_CHAIN_ACCOUNT_MODULE_ADDRESS } from "@/constants";

export type SuperChainAccount = {
  smartAccount: Address;
  superChainID: string;
  points: number;
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
        args: ["0xAAAbC1b0745f1481FF04826A1828BBb5025cDD52" as Address],
      });
      return {
        smartAccount: response.smartAccount,
        superChainID: response.superChainID,
        points: Number(response.points),
        level: Number(response.level),
        noun: response.noun,
      };
    },
    enabled: !!address,
  });
}

export default useGetSuperchainAccount;
