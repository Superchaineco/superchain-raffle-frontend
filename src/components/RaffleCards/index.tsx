import React, {
  type ElementType,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Base from "@/public/images/base-icon.svg";
import OptimisimBgImg from "@/public/images/optimisim-bg-img.svg";
import BaseBgImg from "@/public/images/base-bg-img.svg";
import ModeBgImg from "@/public/images/mode-bg-img.svg";
import Raffle from "./Raffle";
import styles from "./styles.module.css";
import RaffleCardSkeleton from "./Raffle/Skeleton";
import useGetRaffles from "@/hooks/useGetRaffles";
import useGetRoundDetails from "@/hooks/useGetRoundDetails";
import { Address, formatEther, formatUnits, zeroAddress } from "viem";
import useGetSuperchainAccount from "@/hooks/useGetSuperchainAccount";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";

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
    case "OptimisimBg":
      return OptimisimBgImg as ElementType;
    case "BaseBg":
      return BaseBgImg as ElementType;
    case "ModeBg":
      return ModeBgImg as ElementType;
    case "OptimisimIcon":
      return Optimisim as ElementType;
    case "BaseIcon":
      return Base as ElementType;
    case "ModeIcon":
      return Mode as ElementType;
    default:
      return Optimisim as ElementType;
  }
}

function RaffleCards({ captchaToken }: { captchaToken: string | null }) {
  const { data: raffleCardsData, loading, error } = useGetRaffles();
  console.debug({ raffleCardsData, loading, error });
  const { safe } = useSafeAppsSDK();

  const { data } = useGetSuperchainAccount(safe.safeAddress as Address);
  const [expandedCard, setExpandedCard] = useState<string | null>("");
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular la ronda actual para cada rifa
  const currentRounds = useMemo(() => {
    if (!raffleCardsData?.raffles) return {};

    return raffleCardsData.raffles.reduce((acc, raffle) => {
      const initTimestamp = parseInt(raffle.initTimestamp);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const secondsPerRound = 604800; // 7 días en segundos
      const round =
        Math.floor((currentTimestamp - initTimestamp) / secondsPerRound) + 1;
      acc[raffle.id] = round;
      return acc;
    }, {} as Record<string, number>);
  }, [raffleCardsData]);

  // Obtener los detalles de la ronda actual para la rifa expandida
  const { data: currentRoundDetails } = useGetRoundDetails(
    expandedCard || "",
    expandedCard ? currentRounds[expandedCard]?.toString() || "" : ""
  );

  const handleCardClick = (id: string | null) => {
    setExpandedCard(id);
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  };

  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (raffleCardsData) {
      setExpandedCard(raffleCardsData.raffles[0].id);
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerClassName = `${styles["container--raffle-cards"]} ${
    expandedCard ? "expanded" : ""
  }`;

  if (raffleCardsData) {
    return (
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        {raffleCardsData?.raffles.map((item) => {
          const bgImg = item.content.image;
          const round = currentRounds[item.id];
          const isExpanded = expandedCard === item.id;

          // Encontrar la ronda más cercana al timestamp actual
          const currentRound: Round =
            isExpanded && currentRoundDetails?.round
              ? currentRoundDetails.round
              : item.rounds.find((r) => parseInt(r.roundNumber) === round) ||
                item.rounds[0] || {
                  roundNumber: round.toString(),
                  prizeEth: "0",
                  ticketsSold: "0",
                  roundTickets: [],
                  prizeOp: "0",
                };

          let currentUser = currentRound.roundTickets.find(
            (roundTickets) =>
              roundTickets.user.id.toLowerCase() === data?.smartAccount.toLowerCase()
          );
          if (!currentUser) {
            currentUser = {
              user: {
                id: data?.smartAccount.toLowerCase() || zeroAddress,
              },
              numberOfTickets: "0",
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
                value: "FREE",
                network: item.content.chain,
              }}
              chipColor={"#FF0420"}
              startTimestamp={parseInt(item.initTimestamp)}
              prizePotEth={formatEther(BigInt(currentRound.prizeEth))}
              prizePotOp={formatUnits(BigInt(currentRound.prizeOp), 18)}
              totalEntries={250}
              currentEntries={parseInt(currentRound.ticketsSold)}
              entries={`${currentUser.numberOfTickets} / ${
                data ? data.level : 0
              }`}
              networkIcon={AssetsParser("OptimisimIcon")}
              bgImg={bgImg}
              expandedCard={expandedCard}
              round={round}
              ticketNumbers={currentUser.ticketNumbers}
              captchaToken={captchaToken}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        <RaffleCardSkeleton />
        <RaffleCardSkeleton />
      </div>
    );
  }
}

export default RaffleCards;
