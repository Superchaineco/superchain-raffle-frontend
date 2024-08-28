import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';

type Raffle = {
    superchainRaffleCreateds: {
        id: string;
        superchainRaffle: string;
        uri: string;
        content: any;
    }[]
}

function useGetRaffles() {
    const [rafflesWithContent, setRafflesWithContent] = useState<Raffle | null>(null);
    const GET_RAFFLES = gql`
    query GetRaffles {
        superchainRaffleCreateds {
            id
            superchainRaffle
            uri
            }
            }
            `;

    const { data, loading, error } = useQuery<Raffle>(GET_RAFFLES);

    useEffect(() => {
        if (data && data.superchainRaffleCreateds) {
            (async () => {
                const raffles = await Promise.all(
                    data.superchainRaffleCreateds.map(async (raffle) => {
                        try {
                            const { data: raffleData } = await axios.get(raffle.uri);
                            return { ...raffle, content: raffleData };
                        } catch (error) {
                            console.error(`Error fetching data from ${raffle.uri}:`, error);
                            return { ...raffle, content: null };
                        }
                    })
                );
                setRafflesWithContent({ superchainRaffleCreateds: raffles });
            })()


        }
    }, [data]);

    return { data: rafflesWithContent, loading, error };

}

export default useGetRaffles;