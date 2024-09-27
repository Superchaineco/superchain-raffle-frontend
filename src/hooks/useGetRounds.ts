import { gql, useQuery } from "@apollo/client";
import { Address } from "viem";

export type Round = {
    round: {
        roundNumber: string;
        prizeEth: string;
        prizeOp: string;
        ticketsSold: string;
        winners: {
            user: string;
            ticketNumber: string;
            ethAmount: string;
            opAmount: string;
        }[];
    };
};

const GET_ROUND = gql`
  query GetRound($roundId: String!) {
    round(id:$roundId){
  roundNumber
  prizeEth
  prizeEth
  prizeOp
  ticketsSold
  winners{
    user
    ticketNumber
    ethAmount
    opAmount
  }
}
  }
`;

export function useGetRounds(roundId: string) {
    return useQuery<Round>(GET_ROUND, {
        variables: {
            roundId,
        },
    });
}
