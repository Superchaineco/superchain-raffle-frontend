"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  SvgIcon,
} from "@mui/material";
import styles from "../styles/components/raffle-card.module.css";
import { RaffleCardInfo } from "./RaffleCardInfo";
import ethIcon from "@/public/images/raffle-card-eth-icon.svg";
import srIcon from "@/public/images/profile-info-sr-icon.svg";
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
  prizePotEth: string;
  prizePotSr: string;
  totalEntries: string;
  entries: string;
  networkIcon: any;
  bgImg: any;
};

function RaffleCard({
  raffleCardText,
  raffleCardChipsText,
  chipColor,
  entriesColor,
  endsIn,
  prizePotEth,
  prizePotSr,
  totalEntries,
  entries,
  networkIcon,
  bgImg,
}: RaffleCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["container--header"]}>
        <Typography fontSize={24} fontWeight={600}>
          {raffleCardText}
        </Typography>
        <div className={styles["container--header--chips"]}>
          <Chip
            className={`${styles["chip"]} ${styles[`chip--white`]}`}
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
      <CardContent className={styles["container--body"]}>
        <div className={styles["container--body--left"]}>
          <RaffleCardInfo
            icon={endsInIcon}
            primary="Ends in"
            secondary1={endsIn}
          />
          <RaffleCardInfo
            icon={totalEntriesIcon}
            primary="Total entries"
            secondary1={totalEntries}
          />
        </div>
        <div className={styles["container--body--right"]}>
          <RaffleCardInfo
            icon={prizePotIcon}
            primary="Prize pot"
            secondary1={prizePotEth}
            secondary2={prizePotSr}
            iconS1={ethIcon}
            iconS2={srIcon}
          />
          <RaffleCardInfo
            icon={
              entriesColor === "blue" ? myEntriesBlueIcon : myEntriesOpaqueIcon
            }
            primary="My entries"
            secondary1={entries}
            color={entriesColor}
          />
        </div>
      </CardContent>
      <CardMedia
        className={styles["card--media"]}
        component={bgImg}
        style={{ position: "absolute", top: 0, right: "-32%", width: "100%", height: "100%" }}
      />
    </Card>
  );
}
export { RaffleCard };
