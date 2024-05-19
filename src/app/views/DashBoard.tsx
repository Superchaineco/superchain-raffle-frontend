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
            raffleCardChipsText={{ left: 0.002, right: "Optimisim OP" }}
            chipColor="red"
            entriesColor="blue"
            endsIn="1d: 01h: 22m"
            prizePot="0.05🎉 + 100🎉"
            totalEntries="34/250"
            entries="1"
          />
          <RaffleCard
            raffleCardText="48 Hour OP Raffle"
            raffleCardChipsText={{ left: 0.002, right: "Base O" }}
            chipColor="blue"
            entriesColor="opaque"
            endsIn="1d: 01h: 22m"
            prizePot="0.05🎉 + 100🎉"
            totalEntries="34/250"
            entries="1"
          />
          <RaffleCard
            raffleCardText="48 Hour OP Raffle"
            raffleCardChipsText={{ left: 0.002, right: "Mode M" }}
            chipColor="yellow"
            entriesColor="opaque"
            endsIn="1d: 01h: 22m"
            prizePot="0.05🎉 + 100🎉"
            totalEntries="34/250"
            entries="1"
          />
        </div>
        <div className={styles["container--profile-rewards"]}>
          <ProfileCard rank={3} userHash="0xD0be...051e"/>
          <RewardsCard optimisimEth={0.05} optimisimSrp={25} baseEth={0.05} baseSrp={25} modeEth={0.00} modeSrp={0} />
        </div>
      </div>
    </>
  );
}
export { DashBoard };
