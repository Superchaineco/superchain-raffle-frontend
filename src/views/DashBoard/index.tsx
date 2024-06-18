"use client";
import React from "react";
import styles from "./styles.module.css";
import { TopInfo } from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardCards from "@/components/RewardCard";

function DashBoard() {
  return (
    <main className={styles["container--all"]}>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <RaffleCards />
      <div className={styles["container--profile-rewards"]}>
        <ProfileCard
          rank={3}
          userHash="0xD0be...051e"
          eth={0.12}
          srp={150}
          entries={12}
        />
        <RewardCards
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
