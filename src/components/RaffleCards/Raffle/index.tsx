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
import ethIcon from "@/public/images/ether.svg";
import srIcon from "@/public/images/sr-icon.svg";
import TicketIconRed from "@/public/images/tickets-icon-red.svg";
import prizePotIcon from "@/public/images/trophy-icon.svg";
import totalEntriesIcon from "@/public/images/tickets-icon-gray-dotted.svg";
import endsInIcon from "@/public/images/clock-icon.svg";
import PurchaseTickets from "../PurchaseTickets";
import HistoryIcon from "@/public/images/history-icon.svg";
import { AnimatePresence, motion } from "framer-motion";
import BackIcon from "@/public/images/back-icon.svg";
import TicketIconBlackFilled from "@/public/images/tickets-icon-black-filled.svg";
import {
  createContext,
  type ElementType,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RaffleInfo from "../RaffleInfo";
import MyTickets from "../MyTickets";
import styles from "./styles.module.css";
import { formatTime } from "@/functions/auxiliarFunctions";
import { RaffleHistoryModalContext } from "@/views/DashBoard";
import type { TicketsContextType } from "@/types/commons";
import Image from "next/image";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import useGetSuperchainAccount from "@/hooks/useGetSuperchainAccount";
import { Address } from "viem";

enum ColorParser {
  "#FF0420" = "red",
  "#354FFC" = "blue",
  "#DEFE2A" = "yellow",
}

type RaffleProps = {
  id: string;
  offset: number;
  name: string;
  description: string;
  chipsText: { value: string; network: string };
  chipColor: string;
  startTimestamp: number;
  prizePotEth: string;
  prizePotOp: string;
  totalEntries: number;
  currentEntries: number;
  entries: string;
  networkIcon: ElementType;
  bgImg: string;
  expandedCard: string | null;
  round: number;
  onClick: (id: string | null) => void;
  ticketNumbers: string[];
};

export const TicketsContext = createContext({
  state: {
    max: 0,
    tickets: [] as number[],
  },
  setState: (_value: TicketsContextType) => {},
});

function Raffle({
  id,
  offset,
  name,
  description,
  chipsText,
  chipColor,
  startTimestamp,
  prizePotEth,
  prizePotOp,
  totalEntries,
  currentEntries,
  entries,
  networkIcon,
  bgImg,
  expandedCard,
  round,
  onClick,
  ticketNumbers,
}: RaffleProps) {
  const { connected, safe } = useSafeAppsSDK();
  const { data: superchainSA, isLoading } = useGetSuperchainAccount(
    safe.safeAddress as Address
  );
  const isMainCard = useMemo(() => expandedCard === id, [expandedCard, id]);
  const noMainCard = useMemo(() => !expandedCard, [expandedCard]);

  const [initialSize, setInitialSize] = useState<string>("auto");

  const raffleHistoryModalContext = useContext(RaffleHistoryModalContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const endsIn = Math.floor(
    (7 * 24 * 60 * 60 * 1000 -
      ((Date.now() - startTimestamp * 1000) % (7 * 24 * 60 * 60 * 1000))) /
      (60 * 1000)
  );

  const onShowRaffleHistory = () => {
    raffleHistoryModalContext.setRaffleHistoryModalState({ open: true });
  };

  useEffect(() => {
    if (containerRef.current) {
      setInitialSize(containerRef.current.offsetHeight + "px");
    }
  }, []);

  console.debug({ superchainSA, isLoading });
  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onClick={() => (isMainCard ? {} : onClick(id))}
        initial={{ height: initialSize, opacity: 1 }}
        animate={
          isMainCard
            ? { minHeight: offset, height: offset, opacity: 1 }
            : expandedCard
              ? {
                  height: "0px",
                  opacity: 0,
                  display: "none",
                }
              : { height: initialSize, opacity: 1 }
        }
        exit={{ height: "0px", opacity: 0 }}
        style={{
          overflow: "hidden",
          cursor: isMainCard ? "auto" : "pointer",
        }}
      >
        <Card className={styles["container--all"]}>
          <div className={styles["container--principal"]}>
            <Stack
              justifyContent={"space-between"}
              direction={{ xs: "column", sm: "row" }}
              className={styles["container--header"]}
            >
              <div>
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
                  initial={{ marginTop: 0 }}
                  animate={{ marginTop: isMainCard ? 64 : 0 }}
                >
                  <Typography fontSize={isMainCard ? 32 : 24} fontWeight={600}>
                    {name}
                  </Typography>
                  {!noMainCard && (
                    <Typography
                      maxWidth={"400px"}
                      variant="body1"
                      marginTop={1}
                    >
                      {description}
                    </Typography>
                  )}
                </motion.div>
              </div>
              <div className={styles["container--header--chips"]}>
                {noMainCard && (
                  <Chip
                    className={`${styles["chip"]} ${styles[`chip--white`]}`}
                    label={`${chipsText.value}`}
                    onDelete={() => {}}
                    deleteIcon={
                      <SvgIcon
                        component={TicketIconBlackFilled}
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
                  label={chipsText.network}
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
            </Stack>
            <CardContent
              style={isMainCard ? {} : { maxWidth: "calc(100% - 300px)" }}
              className={styles["container--body"]}
            >
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
                style={{
                  overflowY: "hidden",
                  justifyContent: "start",
                  rowGap: "8px",
                  columnGap: isMainCard ? "24px" : "48px",
                }}
                initial={{
                  display: "grid",

                  gridTemplateRows: "1fr 1fr",
                  gridTemplateColumns: "1fr 1fr",
                }}
                animate={{
                  gridTemplateRows: isMainCard ? "auto" : "auto auto",
                  gridTemplateColumns: isMainCard
                    ? "auto auto auto"
                    : "auto auto",
                  opacity: isMainCard
                    ? [0, 0, 0, 0, 0, 0, 1]
                    : [0, 0, 0, 0, 0, 0, 0, 0, 1],
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
                  bgColor={isMainCard ? "#F2F5F9" : "transparent"}
                  icon={endsInIcon}
                  primary="Ends in"
                  secondary1={formatTime(endsIn)}
                  secondaryColor={endsIn < 60 ? "#FF0420" : "#0B0B0B"}
                  noMainCard={noMainCard}
                />
                <RaffleInfo
                  bgColor={isMainCard ? "#F2F5F9" : "transparent"}
                  icon={prizePotIcon}
                  primary="Prize pot"
                  secondary1={prizePotEth}
                  secondary2={prizePotOp}
                  iconS1={ethIcon}
                  iconS2={srIcon}
                  noMainCard={noMainCard}
                />
                <RaffleInfo
                  bgColor={isMainCard ? "#F2F5F9" : "transparent"}
                  icon={totalEntriesIcon}
                  primary="Total entries"
                  secondary1={currentEntries + " / " + totalEntries}
                  secondaryColor={
                    currentEntries / totalEntries == 1 ? "#FF0420" : "#0B0B0B"
                  }
                  noMainCard={noMainCard}
                />
                {!isMainCard && (
                  <RaffleInfo
                    icon={TicketIconRed}
                    primary={
                      <>
                        My <strong>free</strong> entries
                      </>
                    }
                    secondary1={entries}
                    bgColor={"#FFE6E9"}
                    borderColor={"#FF0420"}
                    noMainCard={noMainCard}
                  />
                )}
              </motion.div>
            </CardContent>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                maxWidth: "320px",
                height: "auto",
                width: "34%",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "auto",
                }}
              >
                <CardMedia>
                  <Image alt={name} src={bgImg} height={320} width={320} />
                </CardMedia>
              </motion.div>
            </div>
            <AnimatePresence>
              {isMainCard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isMainCard ? 1 : 0,
                  }}
                  exit={{ opacity: 0 }}
                >
                  <Stack marginTop={4} spacing={2}>
                    {isMainCard && Number(superchainSA?.level || 0) == 0 && (
                      <Alert severity="warning">
                        This raffle has reached the maximum amount of raffle
                        entries. You can try your luck again when this round is
                        over.
                      </Alert>
                    )}
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2 }}
                    >
                      <PurchaseTickets
                        isConnected={connected}
                        currentEntries={currentEntries}
                        max={Number(superchainSA?.level || 0)}
                      />
                      <MyTickets tickets={ticketNumbers} />
                    </Stack>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
export default Raffle;
