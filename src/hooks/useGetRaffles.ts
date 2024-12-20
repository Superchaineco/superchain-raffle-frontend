import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

export type Raffle = {
  raffles: {
    id: string;
    initTimestamp: string;
    uri: string;
    content: {
      name: string;
      chain: string;
      image: string;
      description: string;
    };
    rounds: {
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
    }[];
  }[];
};
function useGetRaffles() {
  const [rafflesWithContent, setRafflesWithContent] = useState<Raffle | null>(
    null
  );
  const GET_RAFFLES = gql`
    query GetRaffles {
      raffles {
        initTimestamp
        id
        uri
        rounds {
          roundNumber
          prizeEth
          prizeOp
          ticketsSold
          roundTickets (first: 250) {
            user {
              id
            }
            ticketNumbers
            numberOfTickets
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery<Raffle>(GET_RAFFLES);

  useEffect(() => {
    if (data && data.raffles) {
      (async () => {
        const raffles = await Promise.all(
          data.raffles.map(async (raffle) => {
            try {
              const { data: raffleData } = await axios.get(raffle.uri);
              return { ...raffle, content: raffleData };
            } catch (error) {
              console.error(`Error fetching data from ${raffle.uri}:`, error);
              return { ...raffle, content: null };
            }
          })
        );
        setRafflesWithContent({ raffles });
      })();
    }
  }, [data]);

  return { data: rafflesWithContent, loading, error };
}

export default useGetRaffles;
