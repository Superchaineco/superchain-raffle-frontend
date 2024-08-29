import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

type Raffle = {
  raffles: {
    id: string;
    initTimestamp: number;
    superchainRaffle: string;
    uri: string;
    content: {
      name: string;
      chain: string;
      image: string;
      description: string;
    };
    rounds: {
      roundNumber: number;
      prizeEth: number;
      prizeOp: number;
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

