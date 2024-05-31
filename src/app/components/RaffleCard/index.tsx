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
import HistoryIcon from "@/public/images/history-icon.svg";
import { AnimatePresence, motion } from "framer-motion";
import BackIcon from "@/public/images/back-icon.svg";
import { useEffect, useState } from "react";

type RaffleCardProps = {
  id: string;
  raffleCardText: string;
  raffleCardChipsText: { left: number; right: string };
  chipColor: string
  entriesColor?: string
  endsIn: string;
  prizePotEth: string;
  prizePotSr: string;
  totalEntries: string;
  entries: string;
  networkIcon: any;
  bgImg: any;
  expandedCard: string;
  round: number;
  onClick: (id: string) => void;
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
  round,
  onClick,
}: RaffleCardProps) {
  const [isMainCard, setIsMainCard] = useState(false);
  const [noMainCard, setNoMainCard] = useState(true);

  const handleClick = (argId: string) => {
    if (isMainCard && argId == "") {
      onClick("");
    } else if (!isMainCard) {
      onClick(argId);
    }
  };
  useEffect(() => {
    setIsMainCard(expandedCard === id);
    setNoMainCard(!(expandedCard != ""));
  }, [expandedCard, id]);

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => handleClick(id)}
        initial={{ height: "238px", visibility: "visible" }}
        animate={{
          height: isMainCard ? "100%" : noMainCard ? "238px" : "0px",
          display: isMainCard || noMainCard ? "flex" : "none",
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
              {isMainCard && (
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
              {noMainCard && (
                <Typography fontSize={24} fontWeight={600}>
                  {raffleCardText}
                </Typography>
              )}
              <div className={styles["container--header--chips"]}>
                {noMainCard && (
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
                {isMainCard && (
                  <motion.div
                    key={`text-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isMainCard ? 1 : 0,
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
                    <div className={styles["container--raffle--text--buttons"]}>
                      <Chip
                        className={`${styles["chip"]} ${styles[`chip--black`]}`}
                        label={`Round ${round}`}
                      />
                      <div className={styles["container--raffle-history"]}>
                        <SvgIcon
                          component={HistoryIcon}
                          inheritViewBox
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "default",
                          }}
                        />
                        <h4>Raffle history</h4>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                key={`container-info-${id}`}
                initial={{ display: "grid", gap: "12px" }}
                animate={{
                  gridTemplateRows: isMainCard ? "1fr" : "1fr 1fr",
                  gridTemplateColumns: isMainCard ? "1fr 1fr 1fr" : "1fr 1fr",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.2,
                }}
                exit={{ opacity: 0 }}
              >
                <RaffleCardInfo
                  icon={endsInIcon}
                  primary="Ends in"
                  secondary1={endsIn}
                  noMainCard={noMainCard}
                />
                <RaffleCardInfo
                  icon={totalEntriesIcon}
                  primary="Total entries"
                  secondary1={totalEntries}
                  noMainCard={noMainCard}
                />
                <RaffleCardInfo
                  icon={prizePotIcon}
                  primary="Prize pot"
                  secondary1={prizePotEth}
                  secondary2={prizePotSr}
                  iconS1={ethIcon}
                  iconS2={srIcon}
                  noMainCard={noMainCard}
                />
                {!isMainCard && (
                  <RaffleCardInfo
                    icon={
                      entriesColor === "blue"
                        ? myEntriesBlueIcon
                        : myEntriesOpaqueIcon
                    }
                    primary="My entries"
                    secondary1={entries}
                    color={entriesColor}
                    noMainCard={noMainCard}
                  />
                )}
              </motion.div>
            </CardContent>
            <motion.div
              initial={{
                position: "absolute",
                width: "100%",
                right: "-32%",
                top: 0,
              }}
              animate={{height: isMainCard ? "140%" : "120%"}}
            >
              <CardMedia
                className={styles["card--media"]}
                component={bgImg}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </motion.div>
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