"use client";
import type { ReactNode } from "react";
import React, { createContext, useState } from "react";
import styles from "./styles.module.css";
import TopInfo from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardsCard from "@/components/RewardsCard";
import WellcomeBackModal from "@/components/common/WellcomeBackModal";
import ActionModal from "@/components/ActionModal";
import type { ActionModalContextStateType } from "@/types/commons";
import RaffleHistoryModal from "@/components/RaffleHistoryModal";

export const ActionModalContext = createContext({
  actionModalContextState: {
    open: false,
    title: "",
    loadComponent: (<></>) as ReactNode,
    contentComponent: (<></>) as ReactNode,
  },
  setActionModalContextState: (_value: ActionModalContextStateType) => {},
});

export const RaffleHistoryModalContext = createContext({
  raffleHistoryModalState: {
    open: false,
  },
  setRaffleHistoryModalState: (_value: { open: boolean }) => {},
});
function DashBoard() {
  const [actionModalState, setActionModalState] =
    useState<ActionModalContextStateType>({
      open: false,
      title: "",
      loadComponent: <></>,
      contentComponent: <></>,
    });
  const [raffleHistoryModalState, setRaffleHistoryModalState] = useState<{
    open: boolean;
  }>({
    open: false,
  });

  return (
    <ActionModalContext.Provider
      value={{
        actionModalContextState: actionModalState,
        setActionModalContextState: setActionModalState,
      }}
    >
      <main className={styles["container--all"]}>
        <TopInfo eth="0.01" ethBonus="0.004" />
        <RaffleHistoryModalContext.Provider
          value={{
            raffleHistoryModalState,
            setRaffleHistoryModalState,
          }}
        >
          <RaffleHistoryModal />
          <RaffleCards />
        </RaffleHistoryModalContext.Provider>
        <div className={styles["container--profile-rewards"]}>
          <ProfileCard />
          <RewardsCard />
        </div>
        <WellcomeBackModal />
        <ActionModal />
      </main>
    </ActionModalContext.Provider>
  );
}
export default DashBoard;
