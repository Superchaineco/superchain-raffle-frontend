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
import useGetRaffles from "@/hooks/useGetRaffles";

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
  // const { data: raffleCardsData, status: _status } = useQuery<
  //   RaffleCardsData[]
  // >("raffleCardsData", getRaffleCardsData);
  const { data: raffleCardsData } = useGetRaffles();
  const [expandedCard, setExpandedCard] = useState<string | null>("");
  console.debug(raffleCardsData);
  const handleCardClick = (id: string | null) => {
    setExpandedCard(id);
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  };

  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (raffleCardsData){

       setExpandedCard(raffleCardsData.superchainRaffleCreateds[0].id);
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    }
  }, [raffleCardsData]);

  if (raffleCardsData) {
    return (
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        {raffleCardsData?.superchainRaffleCreateds.map((item) => {
          const bgImg = item.content.image;
          return (
            <Raffle
              offset={containerHeight}
              key={item.id}
              onClick={handleCardClick}
              id={item.id}
              name={item.content.name}
              description={item.content.description}
              chipsText={{
                value: 10,
                network: "Optimism",
              }}
              chipColor={"#FF0420"}
              endsIn={10}
              prizePotEth={10}
              prizePotSr={10}
              totalEntries={250}
              currentEntries={20}
              entries={10}
              networkIcon={AssetsParser("OptimisimIcon")}
              bgImg={bgImg}
              expandedCard={expandedCard}
              round={1}
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
