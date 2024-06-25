import React, { useEffect, useRef, useState } from "react";
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
import { RaffleCardsData } from "@/types/raffleCards";
import RaffleCardSkeleton from "./Raffle/Skeleton";

enum AssetsParser {
  "OptimisimBg" = OptimisimBgImg,
  "BaseBg" = BaseBgImg,
  "ModeBg" = ModeBgImg,
  "OptimisimIcon" = Optimisim,
  "BaseIcon" = Base,
  "ModeIcon" = Mode,
}

function RaffleCards() {
  const { data: raffleCardsData, status } = useQuery<RaffleCardsData[]>(
    "leaderBoardData",
    getRaffleCardsData
  );
  const [expandedCard, setExpandedCard] = useState<string | null>("");

  const handleCardClick = (id: string | null) => {
    setExpandedCard(id);
  };

  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [expandedCard]);
  if (raffleCardsData) {
    return (
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        {raffleCardsData?.map((item) => {
          const bgImg = item.bgImg as keyof typeof AssetsParser;
          const networdIcon = item.networkIcon as keyof typeof AssetsParser;
          return (
            <Raffle
              offset={containerHeight}
              key={item.id}
              onClick={handleCardClick}
              id={item.id}
              raffleCardText={item.raffleCardText}
              raffleCardChipsText={{
                value: item.raffleCardChip?.value,
                network: item.raffleCardChip?.network,
              }}
              chipColor={item.chipColor}
              entriesColor={item.entriesColor}
              endsIn={item.end}
              prizePotEth={item.prizePotEth}
              prizePotSr={item.prizePotSr}
              totalEntries={item.totalEntries}
              currentEntries={item.currentEntries}
              entries={item.entries}
              networkIcon={AssetsParser[networdIcon]}
              bgImg={AssetsParser[bgImg]}
              expandedCard={expandedCard}
              round={item.round}
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
