"use client";

import { Card, CardMedia, Chip } from "@mui/material";
import styles from "../styles/components/raffle-card.module.css";
import { RaffleCardInfo } from "./RaffleCardInfo";

type RaffleCardProps = {
  raffleCardText: string;
  raffleCardChipsText: { left: number; right: string };
};

function RaffleCard({ raffleCardText, raffleCardChipsText }: RaffleCardProps) {
  return (
    <Card className={styles["container--card"]}>
      <div className={styles["container--header"]}>
        <h2 className={styles["card--title"]}>{raffleCardText}</h2>
        <div className={styles["container--header--chips"]}>
          <Chip
            className={styles["chip"]}
            label={`${raffleCardChipsText.left} ETH`}
          />
          <Chip className={styles["chip"]} label={raffleCardChipsText.right} />
        </div>
      </div>
      <section className={styles["container--body"]}>
        <div className={styles["container--body--left"]}>
          <RaffleCardInfo
            icon="🎉"
            primary="Ends in"
            secondary="1d: 01h: 22m"
          />
          <RaffleCardInfo
            icon="🎉"
            primary="Total entries"
            secondary="34/250"
          />
        </div>
        <div className={styles["container--body--right"]}>
          <RaffleCardInfo
            icon="🎉"
            primary="Prize pot"
            secondary="0.05🎉 + 100🎉"
          />
          <RaffleCardInfo
            icon="🎉"
            primary="My entries"
            secondary="1"
          />
        </div>
      </section>
      <CardMedia
        className={styles["card--media"]}
        component="img"
        image="public\images\penrose.png"
        alt="Live from space album cover"
      />
    </Card>
  );
}
export { RaffleCard };
