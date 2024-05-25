"use client";

import { Card, CardContent, CardHeader, CardMedia, Chip, Typography } from "@mui/material";
import styles from "../styles/components/raffle-card.module.css";
import { RaffleCardInfo } from "./RaffleCardInfo";

type RaffleCardProps = {
  raffleCardText: string;
  raffleCardChipsText: { left: number; right: string };
  chipColor: "yellow" | "red" | "blue";
  entriesColor?: "blue" | "opaque";
  endsIn: string;
  prizePot: string;
  totalEntries: string;
  entries: string;
};

function RaffleCard({
  raffleCardText,
  raffleCardChipsText,
  chipColor,
  entriesColor,
  endsIn,
  prizePot,
  totalEntries,

  entries,
}: RaffleCardProps) {
  return (
    <Card   className={styles["container--all"]}>
      <div className={styles["container--header"]}>
        <Typography fontSize={24} fontWeight={600}>{raffleCardText}</Typography>
        <div className={styles["container--header--chips"]}>
          <Chip
            className={styles["chip"]}
            label={`${raffleCardChipsText.left} ETH`}
          />
          <Chip
            className={`${styles["chip"]} ${styles[`chip--${chipColor}`]}`}
            label={raffleCardChipsText.right}
          />
        </div>
      </div>
      <CardContent className={styles["container--body"]}>
        <div className={styles["container--body--left"]}>
          <RaffleCardInfo
            icon="🎉"
            primary="Ends in"
            secondary={endsIn}
          />
          <RaffleCardInfo
            icon="🎉"
            primary="Total entries"
            secondary={totalEntries}
          />
        </div>
        <div className={styles["container--body--right"]}>
          <RaffleCardInfo
            icon="🎉"
            primary="Prize pot"
            secondary={prizePot}
          />
          <RaffleCardInfo
            icon="🎉"
            primary="My entries"
            secondary={entries}
            color={entriesColor}
          />
        </div>
      </CardContent>
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
