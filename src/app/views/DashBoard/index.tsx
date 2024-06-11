"use client";

import { useRef } from "react";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Base from "@/public/images/base-icon.svg";
import React, { useEffect, useState } from "react";
import OptimisimBgImg from "@/public/images/optimisim-bg-img.svg";
import BaseBgImg from "@/public/images/base-bg-img.svg";
import ModeBgImg from "@/public/images/mode-bg-img.svg";
import styles from "./styles.module.css";
import { TopInfo } from "@/app/components/TopInfo";
import RaffleCard from "@/app/components/RaffleCard";
import ProfileCard from "@/app/components/ProfileCard";
import RewardsCard from "@/app/components/RewardsCard";
import data from "@/app/data.json";

enum AssetsParser {
  "OptimisimBg" = OptimisimBgImg,
  "BaseBg" = BaseBgImg,
  "ModeBg" = ModeBgImg,
  "OptimisimIcon" = Optimisim,
  "BaseIcon" = Base,
  "ModeIcon" = Mode,
}

function DashBoard() {
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

  return (
    <div className={styles["container--all"]}>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <div ref={containerRef} className={styles["container--raffle-cards"]}>
        {data.map((item) => {
          const bgImg = item.bgImg as keyof typeof AssetsParser;
          const networdIcon = item.networkIcon as keyof typeof AssetsParser;
          return (
            <RaffleCard
              offset={containerHeight}
              key={item.id}
              onClick={handleCardClick}
              id={item.id}
              raffleCardText={item.raffleCardText}
              raffleCardChipsText={{
                left: item.raffleCardChipsText.left,
                right: item.raffleCardChipsText.right,
              }}
              chipColor={item.chipColor}
              entriesColor={item.entriesColor}
              endsIn={item.endsIn}
              prizePotEth={item.prizePotEth}
              prizePotSr={item.prizePotSr}
              totalEntries={item.totalEntries}
              entries={item.entries}
              networkIcon={AssetsParser[networdIcon]}
              bgImg={AssetsParser[bgImg]}
              expandedCard={expandedCard}
              round={item.round}
            />
          );
        })}
      </div>
      <div className={styles["container--profile-rewards"]}>
        <ProfileCard
          rank={3}
          userHash="0xD0be...051e"
          eth={0.12}
          srp={150}
          entries={12}
        />
        <RewardsCard
          optimisimEth={0.05}
          optimisimSrp={25}
          baseEth={0.05}
          baseSrp={25}
          modeEth={0.0}
          modeSrp={0}
        />
      </div>
    </div>
  );
}
export default DashBoard;
