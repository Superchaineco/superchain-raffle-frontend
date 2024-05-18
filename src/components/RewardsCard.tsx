"use client";

import { Card } from "@mui/material";
import styles from "../styles/components/rewards-card.module.css";
import { RewardCard } from "./RewardCard";

type RewardsCardProps = {
  optimisimEth: number;
  optimisimSrp: number;
  baseEth: number;
  baseSrp: number;
  modeEth: number;
  modeSrp: number;
};

function RewardsCard({
  optimisimEth,
  optimisimSrp,
  baseEth,
  baseSrp,
  modeEth,
  modeSrp,
}: RewardsCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h2>My Rewards</h2>
      <section className={styles["container--rewards"]}>
        <RewardCard icon="OP" eth={optimisimEth} srp={optimisimSrp} color="red"/>
        <RewardCard icon="O" eth={baseEth} srp={baseSrp} color="blue"/>
        <RewardCard icon="M" eth={modeEth} srp={modeSrp} color="dark"/>
      </section>
    </Card>
  );
}

export { RewardsCard };
