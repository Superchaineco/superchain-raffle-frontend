"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  SvgIcon,
} from "@mui/material";
import styles from "./styles.module.css";
import RaffleCardInfo from "../RaffleCardInfo/RaffleCardInfo";
import ethIcon from "@/public/images/raffle-card-eth-icon.svg";
import srIcon from "@/public/images/profile-info-sr-icon.svg";
import myEntriesBlueIcon from "@/public/images/my-entries-icon-blue.svg";
import myEntriesOpaqueIcon from "@/public/images/my-entries-icon-opaque.svg";
import prizePotIcon from "@/public/images/prize-pot-icon.svg";
import totalEntriesIcon from "@/public/images/total-entries-icon.svg";
import endsInIcon from "@/public/images/ends-in-icon.svg";
import PurchaseTickets from "../PurchaseTickets";
import MyTickets from "../MyTickets";
import { AnimatePresence, motion } from "framer-motion";
import BackIcon from "@/public/images/back-icon.svg";
import { cards } from "@/app/types/commons";

type RaffleCardProps = {
  id: cards;
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
  expandedCard: cards;
  onClick: (id: cards) => void;
};

function RaffleCard({
  id,
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
  expandedCard,
  onClick,
}: RaffleCardProps) {
  const handleClick = (argId: cards) => {
    if (expandedCard == id && argId == "") {
      onClick(argId);
    } else if (expandedCard != id) {
      onClick(argId);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        onClick={() => handleClick(id)}
        initial={{ height: "238px", visibility: "visible" }}
        animate={{
          height:
            expandedCard == id ? "100%" : expandedCard == "" ? "238px" : "0px",
          display: expandedCard == id || expandedCard == "" ? "flex" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.3,
        }}
      >
        <Card className={styles["container--all"]}>
          <div className={styles["container--principal"]}>
            <div className={styles["container--header"]}>
              {expandedCard == id && (
                <div className={styles["container--back"]}>
                  <SvgIcon
                    onClick={() => handleClick("")}
                    component={BackIcon}
                    inheritViewBox
                    style={{
                      width: "16px",
                      height: "12px",
                      cursor: "pointer",
                    }}
                  />
                  <h4>All Raffles</h4>
                </div>
              )}
              {expandedCard == "" && (
                <Typography fontSize={24} fontWeight={600}>
                  {raffleCardText}
                </Typography>
              )}
              <div className={styles["container--header--chips"]}>
                {expandedCard == "" && (
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
                          cursor: "default",
                        }}
                      />
                    }
                  />
                )}
                <Chip
                  className={`${styles["chip"]} ${
                    styles[`chip--${chipColor}`]
                  }`}
                  label={raffleCardChipsText.right}
                  onDelete={() => {}}
                  deleteIcon={
                    <SvgIcon
                      component={networkIcon}
                      inheritViewBox
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "default",
                        boxShadow: "0px 4px 4px 0px #00000024",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <CardContent className={styles["container--body"]}>
              <AnimatePresence>
                {expandedCard == id && (
                  <motion.div
                    key={`text-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: expandedCard == id ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.2,
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <Typography fontSize={24} fontWeight={600}>
                      {raffleCardText}
                    </Typography>
                    <p>
                      Take part in this raffle for a chance to receive rewards
                      lorem ipsum established fact that a reader.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                key={`container-info-${id}`}
                initial={{ display: "grid", gap: "12px"}}
                animate={{
                  gridTemplateRows: expandedCard == id ? "1fr" : "1fr 1fr",
                  gridTemplateColumns: expandedCard == id ? "1fr 1fr 1fr" : "1fr 1fr",
                  width: expandedCard == id ? "100%" : "44%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.2,
                }}
                exit={{ opacity: 0 }}
                className={styles["container--info"]}
              >
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
                <RaffleCardInfo
                  icon={prizePotIcon}
                  primary="Prize pot"
                  secondary1={prizePotEth}
                  secondary2={prizePotSr}
                  iconS1={ethIcon}
                  iconS2={srIcon}
                />
                {expandedCard == "" && (
                  <RaffleCardInfo
                    icon={
                      entriesColor === "blue"
                        ? myEntriesBlueIcon
                        : myEntriesOpaqueIcon
                    }
                    primary="My entries"
                    secondary1={entries}
                    color={entriesColor}
                  />
                )}
              </motion.div>
            </CardContent>
            <CardMedia
              className={styles["card--media"]}
              component={bgImg}
              style={{
                position: "absolute",
                top: 0,
                right: "-32%",
                width: "100%",
                height: "120%",
              }}
            />
          </div>
          <div className={styles["container--detail"]}>
            <PurchaseTickets />
            <MyTickets tickets={0} />
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
export default RaffleCard;
