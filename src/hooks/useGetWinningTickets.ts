import { gql, useQuery } from "@apollo/client";
import { Address } from "viem";

export type WinningTicketsData = {
  user: {
    rounds: {
      ticketNumbers: string[];
    }[];
  };
  round: {
    winningTickets: string[];
  };
};

const GET_WINNING_TICKETS_FOR_USER = gql`
  query GetWinningTicketsForUser($userId: Bytes!, $roundId: String!) {
    user(id: $userId) {
      rounds(where: { round: $roundId }) {
        ticketNumbers
      }
    }
    round(id: $roundId) {
      winningTickets
    }
  }
`;

export function useGetWinningTickets(userId: Address, roundId: string) {
  return useQuery<WinningTicketsData>(GET_WINNING_TICKETS_FOR_USER, {
    variables: {
      userId,
      roundId,
    },
  });
}
