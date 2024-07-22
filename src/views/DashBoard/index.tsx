"use client";
import React from "react";
import styles from "./styles.module.css";
import TopInfo from "@/components/TopInfo";
import ProfileCard from "@/components/ProfileCard";
import RaffleCards from "@/components/RaffleCards";
import RewardsCard from "@/components/RewardsCard";
import WellcomeBackModal from "@/components/common/WellcomeBackModal";
import ClaimRewardsModal from "@/components/ClaimModal";

function DashBoard() {
  return (
    <main className={styles["container--all"]}>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <RaffleCards />
      <div className={styles["container--profile-rewards"]}>
        <ProfileCard />
        <RewardsCard />
      </div>
      <WellcomeBackModal />
      <ClaimRewardsModal title={'Confirm to Claim Your Rewards'} text={'Proceed in your wallet.'} state="success"/>
    </main>
  );
}
export default DashBoard;
