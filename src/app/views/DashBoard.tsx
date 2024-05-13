"use client";

import React from "react";
import styles from "../../styles/views/dashBoard.module.css";
import { RaffleCard, RewardsCard, TopInfo } from "@/components";
import { ProfileCard } from "@/components/ProfileCard";

function DashBoard() {
  return (
    <>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <div className={styles["container--all"]}>
        <div className={styles["container--raffle-cards"]}>
          <RaffleCard
            raffleCardText="48 Hour OP Raffle"
            raffleCardChipsText={{ left: 0.002, right: "Optimisim" }}
          />
          <RaffleCard
            raffleCardText="48 Hour OP Raffle"
            raffleCardChipsText={{ left: 0.002, right: "Optimisim" }}
          />
          <RaffleCard
            raffleCardText="48 Hour OP Raffle"
            raffleCardChipsText={{ left: 0.002, right: "Optimisim" }}
          />
        </div>
        <div className={styles["container--profile-rewards"]}>
          <ProfileCard rank={3} userHash="0xD0be...051e"/>
          <RewardsCard optimisim={0.002} basee={0.002} mode={0.002} />
        </div>
      </div>
    </>
  );
}
export { DashBoard };
