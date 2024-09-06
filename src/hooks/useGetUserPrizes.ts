import { gql, useQuery } from "@apollo/client";
import { Address } from "viem";

export type UserPrizes = {
  user: {
    opPrizes: number;
    ethPrizes: number;
    rounds: {
      numberOfTickets: number;
    }[];
  };
};

export function useGetUserPrizes(user: Address) {
  const GET_USER_PRIZES = gql`
    query GetUserPrizes($id: String!) {
      user(id: $id) {
        opPrizes
        ethPrizes
        rounds {
          numberOfTickets
        }
      }
    }
  `;

  return useQuery<UserPrizes>(GET_USER_PRIZES, {
    variables: {
      id: user,
    },
  });
}
