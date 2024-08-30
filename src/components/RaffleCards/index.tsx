import React, { type ElementType, useEffect, useRef, useState } from "react";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Base from "@/public/images/base-icon.svg";
import OptimisimBgImg from "@/public/images/optimisim-bg-img.svg";
import BaseBgImg from "@/public/images/base-bg-img.svg";
import ModeBgImg from "@/public/images/mode-bg-img.svg";
import Raffle from "./Raffle";
import styles from "./styles.module.css";
import { useQuery } from "react-query";
import { getRaffleCardsData } from "@/functions/fetchFunctions";
import type { RaffleCardsData } from "@/types/raffleCards";
import RaffleCardSkeleton from "./Raffle/Skeleton";
import useGetRaffles, {
  type Raffle as RaffleType,
} from "@/hooks/useGetRaffles";
import { Address, formatEther, formatUnits, zeroAddress } from "viem";
import useGetSuperchainAccount from "@/hooks/useGetSuperchainAccount";
import { useAccount } from "wagmi";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";

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

function RaffleCards() {
  const { data: raffleCardsData } = useGetRaffles();
  const { safe } = useSafeAppsSDK();

  const { data } = useGetSuperchainAccount(safe.safeAddress as Address);
  const [expandedCard, setExpandedCard] = useState<string | null>("");
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

  if (raffleCardsData) {
    return (
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        {raffleCardsData?.raffles.map((item) => {
          const bgImg = item.content.image;
          const round =
            Math.floor(
              (Date.now() - parseInt(item.initTimestamp) * 1000) /
                (7 * 24 * 60 * 60 * 1000)
            ) + 1;

          let currentRound = item.rounds.find(
            (currentRound) => currentRound.roundNumber === round.toString()
          );
          console.debug("currentRound", currentRound, item.rounds, round);
          if (!currentRound) {
            currentRound = {
              roundNumber: round.toString(),
              prizeEth: "0",
              ticketsSold: "0",
              users: [],
              prizeOp: "0",
            };
          }

          let currentUser = currentRound.users.find(
            (user) =>
              user.user.id.toLowerCase() === data?.smartAccount.toLowerCase()
          );
          if (!currentUser) {
            currentUser = {
              user: {
                id: data?.smartAccount.toLowerCase() || zeroAddress,
              },
              numberOfTickets: "0",
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
              entries={`${currentUser.numberOfTickets} / ${data ? data.level : 6}`}
              networkIcon={AssetsParser("OptimisimIcon")}
              bgImg={bgImg}
              expandedCard={expandedCard}
              round={round}
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
