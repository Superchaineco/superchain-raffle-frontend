"use client";

import { Button } from "@mui/material";
import styles from "../styles/components/reward-card.module.css";

type RewardCardProps = {
  icon: string;
  eth: number;
  srp: number;
};

function RewardCard({ icon, eth, srp }: RewardCardProps) {
  return (
    <div className={styles["container--all"]}>
      <div className={styles["container--icon"]}>{icon}</div>
      <div className={styles["container--content"]}>
        <div className={styles["container--content--text"]}>
          <div className={styles["container--content--eth"]}>
            <p className={styles["reward--text"]}>{`${eth} ETH`}</p>
          </div>
          <p className={styles["reward--text"]}>+</p>
          <div className={styles["container--content--srp"]}>
            <p className={styles["reward--text"]}>{`${srp} SRP`}</p>
          </div>
        </div>
        <Button className={styles["claim--button"]}>Claim</Button>
      </div>
    </div>
  );
}

export { RewardCard };
