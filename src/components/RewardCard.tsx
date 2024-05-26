"use client";

import { Button, SvgIcon } from "@mui/material";
import styles from "../styles/components/reward-card.module.css";

type RewardCardProps = {
  icon: any;
  eth: number;
  srp: number;
  color: "red" | "blue" | "dark";
  opaque: boolean;
};

function RewardCard({ icon, eth, srp, color, opaque }: RewardCardProps) {
  return (
    <div
      className={`${styles["container--all"]} ${
        styles[`container--all--color--${color}`]
      } ${opaque ? styles["container--all--opaque"] : ""}`}
    >
      <div
        className={`${styles["container--icon"]} ${
          styles[`container--icon--color--${color}`]
        }`}
      >
        <SvgIcon
          component={icon}
          inheritViewBox
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </div>
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
