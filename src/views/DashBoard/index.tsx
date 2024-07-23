"use client";
import React, { createContext, ReactNode, useState } from "react";
import styles from "./styles.module.css";
import TopInfo from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardsCard from "@/components/RewardsCard";
import WellcomeBackModal from "@/components/common/WellcomeBackModal";
import ActionModal from "@/components/ActionModal";
import { ActionModalContextStateType } from "@/types/commons";

export const ActionModalContext = createContext({
  actionModalContextState: {
    open: false,
    title: "",
    loadComponent: (<></>) as ReactNode,
    contentComponent: (<></>) as ReactNode,
  },
  setActionModalContextState: (value: ActionModalContextStateType) => {},
});
function DashBoard() {
  const [actionModalState, setActionModalState] =
    useState<ActionModalContextStateType>({
      open: false,
      title: "",
      loadComponent: <></>,
      contentComponent: <></>,
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
        <RaffleCards />
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
