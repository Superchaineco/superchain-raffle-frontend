"use client";

import { Card, CardMedia, Chip, SvgIcon } from "@mui/material";
import styles from "../styles/components/raffle-card.module.css";
import { RaffleCardInfo } from "./RaffleCardInfo";
import ethIcon from "@/public/images/raffle-card-eth-icon.svg";
import myEntriesBlueIcon from "@/public/images/my-entries-icon-blue.svg";
import myEntriesOpaqueIcon from "@/public/images/my-entries-icon-opaque.svg";
import prizePotIcon from "@/public/images/prize-pot-icon.svg";
import totalEntriesIcon from "@/public/images/total-entries-icon.svg";
import endsInIcon from "@/public/images/ends-in-icon.svg";

type RaffleCardProps = {
  raffleCardText: string;
  raffleCardChipsText: { left: number; right: string };
  chipColor: "yellow" | "red" | "blue";
  entriesColor?: "blue" | "opaque";
  endsIn: string;
  prizePot: string;
  totalEntries: string;
  entries: string;
  networkIcon: any;
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
  networkIcon,
}: RaffleCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["container--header"]}>
        <h2 className={styles["card--title"]}>{raffleCardText}</h2>
        <div className={styles["container--header--chips"]}>
          <Chip
            className={styles["chip"]}
            label={`${raffleCardChipsText.left} ETH`}
            onDelete={() => {}}
            deleteIcon={
              <SvgIcon
                component={ethIcon}
                inheritViewBox
                style={{
                  width: "16px",
                  height: "12px",
                  boxShadow: "0px 4px 4px 0px #00000024",
                }}
              />
            }
          />
          <Chip
            className={`${styles["chip"]} ${styles[`chip--${chipColor}`]}`}
            label={raffleCardChipsText.right}
            onDelete={() => {}}
            deleteIcon={
              <SvgIcon
                component={networkIcon}
                inheritViewBox
                style={{
                  width: "20px",
                  height: "20px",
                  boxShadow: "0px 4px 4px 0px #00000024",
                }}
              />
            }
          />
        </div>
      </div>
      <section className={styles["container--body"]}>
        <div className={styles["container--body--left"]}>
          <RaffleCardInfo
            icon={endsInIcon}
            primary="Ends in"
            secondary={endsIn}
          />
          <RaffleCardInfo
            icon={totalEntriesIcon}
            primary="Total entries"
            secondary={totalEntries}
          />
        </div>
        <div className={styles["container--body--right"]}>
          <RaffleCardInfo
            icon={prizePotIcon}
            primary="Prize pot"
            secondary={prizePot}
          />
          <RaffleCardInfo
            icon={entriesColor === "blue" ? myEntriesBlueIcon : myEntriesOpaqueIcon}
            primary="My entries"
            secondary={entries}
            color={entriesColor}
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
