import { useQuery } from "@tanstack/react-query";
import { Address, createPublicClient, getContract, http } from "viem";
import { optimism } from "viem/chains";

function useGetClaimablePrizes(raffleAddress: Address, userAddress: Address) {
  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(),
  });

  const result = useQuery({
    queryKey: ["claimablePrizes"],
    queryFn: async () => {
      if (!raffleAddress || !userAddress) return;
      const raffle = getContract({
        address: raffleAddress,
        abi: [
          {
            type: "function",
            name: "getClaimableAmounts",
            inputs: [
              { name: "user", type: "address", internalType: "address" },
            ],
            outputs: [
              { name: "", type: "uint256", internalType: "uint256" },
              { name: "", type: "uint256", internalType: "uint256" },
            ],
            stateMutability: "view",
          },
        ] as const,
        client: publicClient,
      });
      const claimablePrizes = await raffle.read.getClaimableAmounts([
        userAddress,
      ]);
      return claimablePrizes;
    },
    enabled: !!raffleAddress && !!userAddress,
  });
  return result;
}

export default useGetClaimablePrizes;
