"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  SvgIcon,
  Alert,
  Stack,
} from "@mui/material";
import ethIcon from "@/public/images/eth-chip-icon.svg";
import srIcon from "@/public/images/sr-icon.svg";
import myEntriesBlueIcon from "@/public/images/tickets-icon-blue.svg";
import myEntriesOpaqueIcon from "@/public/images/tickets-icon-opaque.svg";
import prizePotIcon from "@/public/images/trophy-icon.svg";
import totalEntriesIcon from "@/public/images/tickets-icon-gray-dotted.svg";
import endsInIcon from "@/public/images/clock-icon.svg";
import PurchaseTickets from "../PurchaseTickets";
import HistoryIcon from "@/public/images/history-icon.svg";
import { AnimatePresence, motion } from "framer-motion";
import BackIcon from "@/public/images/back-icon.svg";
import { type ElementType, useContext, useMemo } from "react";
import RaffleInfo from "../RaffleInfo";
import MyTickets from "../MyTickets";
import styles from "./styles.module.css";
import { formatTime } from "@/functions/auxiliarFunctions";
import { RaffleHistoryModalContext } from "@/views/DashBoard";

enum ColorParser {
  "#FF0420" = "red",
  "#354FFC" = "blue",
  "#DEFE2A" = "yellow",
}

type RaffleProps = {
  id: string;
  offset: number;
  raffleCardText: string;
  raffleCardChipsText: { value: number; network: string };
  chipColor: string;
  endsIn: number;
  prizePotEth: number;
  prizePotSr: number;
  totalEntries: number;
  currentEntries: number;
  entries: number;
  networkIcon: ElementType;
  bgImg: ElementType;
  expandedCard: string | null;
  round: number;
  onClick: (id: string | null) => void;
};

function Raffle({
  id,
  offset,
  raffleCardText,
  raffleCardChipsText,
  chipColor,
  endsIn,
  prizePotEth,
  prizePotSr,
  totalEntries,
  currentEntries,
  entries,
  networkIcon,
  bgImg,
  expandedCard,
  round,
  onClick,
}: RaffleProps) {
  const isMainCard = useMemo(() => expandedCard === id, [expandedCard, id]);
  const noMainCard = useMemo(() => !expandedCard, [expandedCard]);

  const raffleHistoryModalContext = useContext(RaffleHistoryModalContext);

  const onShowRaffleHistory = () => {
    raffleHistoryModalContext.setRaffleHistoryModalState({ open: true });
  };
  return (
    <AnimatePresence>
      <motion.div
        onClick={() => (isMainCard ? {} : onClick(id))}
        initial={{ height: "238px", opacity: 1 }}
        animate={
          isMainCard
            ? { height: offset, opacity: 1 }
            : expandedCard
              ? {
                  height: "0px",
                  opacity: 0,

                  display: "none",
                }
              : { height: "238px", opacity: 1 }
        }
        exit={{ height: "0px", opacity: 0 }}
        style={{
          overflow: "hidden",
          cursor: isMainCard ? "auto" : "pointer",
        }}
      >
        <Card className={styles["container--all"]}>
          <div className={styles["container--principal"]}>
            <div className={styles["container--header"]}>
              {isMainCard && (
                <div className={styles["container--back"]}>
                  <SvgIcon
                    onClick={() => onClick(null)}
                    component={BackIcon}
                    inheritViewBox
                    style={{
                      zIndex: 120,
                      width: "20px",
                      height: "16px",
                      cursor: "pointer",
                    }}
                  />
                  <span>All Raffles</span>
                </div>
              )}
              <motion.div
                initial={{ marginTop: 0, width: "60%" }}
                animate={{ marginTop: isMainCard ? 64 : 0 }}
              >
                <Typography fontSize={24} fontWeight={600}>
                  {raffleCardText}
                </Typography>
                {!noMainCard && (
                  <p>
                    Take part in this raffle for a chance to receive rewards
                    lorem ipsum established fact that a reader.
                  </p>
                )}
              </motion.div>
              <div className={styles["container--header--chips"]}>
                {noMainCard && (
                  <Chip
                    className={`${styles["chip"]} ${styles[`chip--white`]}`}
                    label={`${raffleCardChipsText.value} ETH`}
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
                    styles[
                      `chip--${ColorParser[chipColor as keyof typeof ColorParser]}`
                    ]
                  }`}
                  label={raffleCardChipsText.network}
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
                    initial={{ opacity: 0, maxWidth: "60%" }}
                    animate={{
                      opacity: isMainCard ? 1 : 0,
                    }}
                    exit={{ opacity: 0 }}
                  >
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
                        <h4 onClick={onShowRaffleHistory}>Raffle history</h4>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                key={`container-info-${id}`}
                initial={{
                  display: "grid",
                  gap: "12px",
                  gridTemplateRows: "1fr 1fr",
                  gridTemplateColumns: "1fr 1fr",
                  width: "60%",
                }}
                animate={{
                  gridTemplateRows: isMainCard ? "1fr" : "1fr 1fr",
                  gridTemplateColumns: isMainCard ? "1fr 1fr 1fr" : "1fr 1fr",
                  width: isMainCard ? "80%" : "60%",
                  opacity: isMainCard
                    ? [1, 0, 0, 0, 0, 0, 1]
                    : [1, 0, 0, 0, 0, 0, 0, 1],
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.2,
                  opacity: { duration: 0.5 },
                }}
                exit={{ opacity: 0 }}
              >
                <RaffleInfo
                  icon={endsInIcon}
                  primary="Ends in"
                  secondary1={formatTime(endsIn)}
                  secondaryColor={endsIn < 60 ? "#FF0420" : "#0B0B0B"}
                  noMainCard={noMainCard}
                />
                <RaffleInfo
                  icon={prizePotIcon}
                  primary="Prize pot"
                  secondary1={prizePotEth}
                  secondary2={prizePotSr}
                  iconS1={ethIcon}
                  iconS2={srIcon}
                  noMainCard={noMainCard}
                />
                <RaffleInfo
                  icon={totalEntriesIcon}
                  primary="Total entries"
                  secondary1={totalEntries + "/" + currentEntries}
                  secondaryColor={
                    totalEntries / currentEntries == 1 ? "#FF0420" : "#0B0B0B"
                  }
                  noMainCard={noMainCard}
                />
                {!isMainCard && (
                  <RaffleInfo
                    icon={entries > 0 ? myEntriesBlueIcon : myEntriesOpaqueIcon}
                    primary="My entries"
                    secondary1={entries}
                    color={entries > 0 ? "#00C2FF" : "#000000"}
                    noMainCard={noMainCard}
                  />
                )}
              </motion.div>
            </CardContent>
            <motion.div
              initial={{
                position: "absolute",
                height: "120%",
                top: 0,
                right: 0,
              }}
              animate={{ height: isMainCard ? "140%" : "120%" }}
            >
              <motion.div
                animate={{
                  height: isMainCard ? "260px" : "320px",
                  width: isMainCard ? "300px" : "320px",
                }}
              >
                <CardMedia
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  component={bgImg}
                />
              </motion.div>
            </motion.div>
            <Stack marginTop={4} spacing={2}>
              {isMainCard && (
                <Alert severity="warning">
                  This raffle has reached the maximum amount of raffle entries.
                  You can try your luck again when this round is over.
                </Alert>
              )}
              <div className={styles["container--detail"]}>
                <PurchaseTickets wallet={true} maxCuantity={9} />
                <MyTickets tickets={10} />
              </div>
            </Stack>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
export default Raffle;
