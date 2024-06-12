"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TopInfo } from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RewardsCard from "@/components/RewardsCard";
import RaffleCardContainer from "@/components/RaffleCardsContainer";


function DashBoard() {

  return (
    <main className={styles["container--all"]}>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <RaffleCardContainer />
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
    </main>
  );
}
export default DashBoard;
