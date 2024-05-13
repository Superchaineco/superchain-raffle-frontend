"use client";

import { Card } from "@mui/material";
import styles from "../styles/components/rewards-card.module.css";
import { RewardCard } from "./RewardCard";

type RewardsCardProps = {
  optimisim: number;
  basee: number;
  mode: number;
};

function RewardsCard({ optimisim, basee, mode }: RewardsCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h2>My Rewards</h2>
      <section className={styles["container--rewards"]}>
        <RewardCard icon="OP" eth={0.002} srp={0.12} />
        <RewardCard icon="O" eth={0.002} srp={0.12} />
        <RewardCard icon="M" eth={0.002} srp={0.12} />
      </section>
    </Card>
  );
}

export { RewardsCard };
