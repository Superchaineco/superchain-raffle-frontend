import React, { type ElementType, useEffect, useRef, useState, useMemo } from 'react';
import Optimisim from '@/public/images/optimisim-icon.svg';
import Mode from '@/public/images/mode-icon.svg';
import Base from '@/public/images/base-icon.svg';
import OptimisimBgImg from '@/public/images/optimisim-bg-img.svg';
import BaseBgImg from '@/public/images/base-bg-img.svg';
import ModeBgImg from '@/public/images/mode-bg-img.svg';
import Raffle from './Raffle';
import styles from './styles.module.css';
import RaffleCardSkeleton from './Raffle/Skeleton';
import useGetRaffles from '@/hooks/useGetRaffles';
import useGetRoundDetails from '@/hooks/useGetRoundDetails';
import { Address, formatEther, formatUnits, zeroAddress } from 'viem';
import useGetSuperchainAccount from '@/hooks/useGetSuperchainAccount';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';

type RoundTickets = {
  user: {
    id: string;
  };
  numberOfTickets: string;
  ticketNumbers: string[];
};

type Round = {
  roundNumber: string;
  prizeEth: string;
  prizeOp: string;
  ticketsSold: string;
  roundTickets?: RoundTickets[];
};

function AssetsParser(asset: string): ElementType {
  switch (asset) {
    case 'OptimisimBg':
      return OptimisimBgImg as ElementType;
    case 'BaseBg':
      return BaseBgImg as ElementType;
    case 'ModeBg':
      return ModeBgImg as ElementType;
    case 'OptimisimIcon':
      return Optimisim as ElementType;
    case 'BaseIcon':
      return Base as ElementType;
    case 'ModeIcon':
      return Mode as ElementType;
    default:
      return Optimisim as ElementType;
  }
}

function RaffleCards() {
  const { data: raffleCardsData, loading, error } = useGetRaffles();
  const { safe } = useSafeAppsSDK();
  const { data } = useGetSuperchainAccount(safe.safeAddress as Address);
  const [expandedCard, setExpandedCard] = useState<string | null>('');
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calcular la ronda actual para cada rifa
  const currentRounds = useMemo(() => {
    if (!raffleCardsData?.raffles) return {};
    
    return raffleCardsData.raffles.reduce((acc, raffle) => {
      const round = Math.floor(
        (Date.now() - parseInt(raffle.initTimestamp) * 1000) /
          (7 * 24 * 60 * 60 * 1000)
      ) + 1;
      acc[raffle.id] = round;
      return acc;
    }, {} as Record<string, number>);
  }, [raffleCardsData]);

  // Obtener los detalles de la ronda actual para la rifa expandida
  const { data: currentRoundDetails } = useGetRoundDetails(
    expandedCard || '',
    expandedCard ? currentRounds[expandedCard]?.toString() || '' : ''
  );
  
  const handleCardClick = (id: string | null) => {
    setExpandedCard(id);
    if (containerRef.current) {
      const height =
        containerRef.current.offsetHeight +
        (window.innerWidth < 1200
          ? window.innerHeight - containerRef.current.offsetHeight
          : 0);
      setContainerHeight(height < 850 ? 850 : height);
    }
  };

  useEffect(() => {
    if (raffleCardsData) {
      setExpandedCard(raffleCardsData.raffles[0].id);
      if (containerRef.current) {
        const height =
          containerRef.current.offsetHeight +
          (window.innerWidth < 1200
            ? window.innerHeight - containerRef.current.offsetHeight
            : 0);
        setContainerHeight(height < 850 ? 850 : height);
      }
    }
  }, [raffleCardsData]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const height =
          containerRef.current.offsetHeight +
          (window.innerWidth < 1200
            ? window.innerHeight - containerRef.current.offsetHeight
            : 0);
        setContainerHeight(height < 850 ? 850 : height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerClassName = `${styles['container--raffle-cards']} ${expandedCard ? 'expanded' : ''}`;

  if (raffleCardsData) {
    return (
      <div ref={containerRef} className={containerClassName}>
        {raffleCardsData?.raffles.map((item) => {
          const bgImg = item.content.image;
          const round = currentRounds[item.id];
          const isExpanded = expandedCard === item.id;
          
          // Usar los detalles de la ronda actual si la tarjeta está expandida
          const currentRound: Round = isExpanded && currentRoundDetails?.round 
            ? currentRoundDetails.round 
            : item.rounds[0] || {
                roundNumber: round.toString(),
                prizeEth: '0',
                ticketsSold: '0',
                roundTickets: [],
                prizeOp: '0',
              };

          let currentUser = currentRound.roundTickets?.find(
            (roundTickets: RoundTickets) =>
              roundTickets.user.id.toLowerCase() ===
              data?.smartAccount.toLowerCase()
          );
          if (!currentUser) {
            currentUser = {
              user: {
                id: data?.smartAccount.toLowerCase() || zeroAddress,
              },
              numberOfTickets: '0',
              ticketNumbers: [],
            };
          }

          return (
            <Raffle
              offset={containerHeight}
              key={item.id}
              onClick={handleCardClick}
              id={item.id}
              name={item.content.name}
              description={item.content.description}
              chipsText={{
                value: 'FREE',
                network: item.content.chain,
              }}
              chipColor={'#FF0420'}
              startTimestamp={parseInt(item.initTimestamp)}
              prizePotEth={formatEther(BigInt(currentRound.prizeEth))}
              prizePotOp={formatUnits(BigInt(currentRound.prizeOp), 18)}
              totalEntries={250}
              currentEntries={parseInt(currentRound.ticketsSold)}
              entries={`${currentUser.numberOfTickets} / ${data ? data.level : 0}`}
              networkIcon={AssetsParser('OptimisimIcon')}
              bgImg={bgImg}
              expandedCard={expandedCard}
              round={round}
              ticketNumbers={currentUser.ticketNumbers}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div ref={containerRef} className={containerClassName}>
        <RaffleCardSkeleton />
        <RaffleCardSkeleton />
      </div>
    );
  }
}

export default RaffleCards;
