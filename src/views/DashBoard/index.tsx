"use client";
import React, { createContext, useState } from "react";
import styles from "./styles.module.css";
import TopInfo from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardsCard from "@/components/RewardsCard";
import WellcomeBackModal from "@/components/common/WellcomeBackModal";
import ClaimRewardsModal from "@/components/ClaimRewardsModal";

export const ActionModalContext = createContext({
  actionModalState: { open: false, title: "" },
  setActionModalState: (value: { open: boolean; title: string }) => {},
});
function DashBoard() {
  const [actionModalState, setActionModalState] = useState<{
    open: boolean;
    title: string;
  }>({ open: false, title: "" });
  return (
    <ActionModalContext.Provider
      value={{
        actionModalState: actionModalState,
        setActionModalState: setActionModalState,
      }}
    >
      <main className={styles["container--all"]}>
        <TopInfo eth="0.01" ethBonus="0.004" />
        <RaffleCards />
        <div className={styles["container--profile-rewards"]}>
          <ProfileCard />
          <RewardsCard />
        </div>
        <WellcomeBackModal />
        <ClaimRewardsModal />
      </main>
    </ActionModalContext.Provider>
  );
}
export default DashBoard;
