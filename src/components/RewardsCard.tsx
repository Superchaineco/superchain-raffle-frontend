"use client";

import { Card } from "@mui/material";
import styles from "../styles/components/rewards-card.module.css";

type RewardsCardProps = {
  optimisim: number;
  basee: number;
  mode: number;
};

function RewardsCard({ optimisim, basee, mode }: RewardsCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h2>My Rewards</h2>
    </Card>
  );
}

export { RewardsCard };
