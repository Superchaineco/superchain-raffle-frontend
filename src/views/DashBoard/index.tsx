"use client";
import React, { createContext, useState } from "react";
import styles from "./styles.module.css";
import TopInfo from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardsCard from "@/components/RewardsCard";
import WellcomeBackModal from "@/components/common/WellcomeBackModal";
import ClaimRewardsModal from "@/components/ClaimRewardsModal";

export const ClaimRewardsModalContext = createContext({claimRewards: false, setClaimRewards: (value: boolean) => {}});
function DashBoard() {
  const [claimRewards, setClaimRewards] = useState(false);
  return (
    <ClaimRewardsModalContext.Provider value={{claimRewards, setClaimRewards}}>
      <main className={styles["container--all"]}>
        <TopInfo eth="0.01" ethBonus="0.004" />
        <RaffleCards />
        <div className={styles["container--profile-rewards"]}>
          <ProfileCard />
          <RewardsCard />
        </div>
        <WellcomeBackModal />
        <ClaimRewardsModal open={claimRewards} />
      </main>
    </ClaimRewardsModalContext.Provider>
  );
}
export default DashBoard;
