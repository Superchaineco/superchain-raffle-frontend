import { gql, useQuery } from "@apollo/client";

export type RoundDetails = {
  round: {
    roundNumber: string;
    prizeEth: string;
    prizeOp: string;
    ticketsSold: string;
    roundTickets: {
      user: {
        id: string;
      };
      numberOfTickets: string;
      ticketNumbers: string[];
    }[];
  };
};

const GET_ROUND_DETAILS = gql`
  query GetRoundDetails($raffleId: String!, $roundNumber: String!) {
    round(id: $raffleId) {
      roundNumber
      prizeEth
      prizeOp
      ticketsSold
      roundTickets(first: 1000) {
        user {
          id
        }
        ticketNumbers
        numberOfTickets
      }
    }
  }
`;

export default function useGetRoundDetails(raffleId: string, roundNumber: string) {
  return useQuery<RoundDetails>(GET_ROUND_DETAILS, {
    variables: {
      raffleId,
      roundNumber,
    },
    skip: !raffleId || !roundNumber,
  });
} 