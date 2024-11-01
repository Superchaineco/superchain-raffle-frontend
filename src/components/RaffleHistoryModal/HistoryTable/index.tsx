import { Stack, SvgIcon, Typography } from "@mui/material";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/optimism.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue.svg";
import React from "react";
import styles from "./styles.module.css";
import raffleHistoryRecords from "@/raffleHistoryRecods.json";
import { checksumAddress, formatUnits, formatEther } from "viem";
type Props = {
  winners: {
    user: {
      id: `0x${string}`;
    };
    ticketNumber: string;
    ethAmount: string;
    opAmount: string;
  }[];
};

export default function RaffleHistoryTable({ winners }: Props) {
  if(winners.length === 0) {
    return (
        <Typography textAlign='center' variant="h6">No winners yet</Typography>
    );
  }
  return (
    <Stack className={styles["container--all"]} spacing={2} paddingY={1}>
      {winners.map((winner, index) => (
        <Stack
          key={index}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingX={2}
          width={"100%"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-center"}
            spacing={2}
          >
            <div
              className={`${styles["container--rank"]} ${styles[`rank--${index <= 2 ? index + 1 : "off-podium"}`]}`}
            >
              <p className={styles["text-rank"]}>{index + 1}</p>
            </div>
            <p className={styles["text-rank"]}>
              {checksumAddress(winner.user.id).substring(0, 6)}...{checksumAddress(winner.user.id).slice(-3)}
            </p>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"end"}
            width={"30%"}
            paddingRight={4}
            spacing={4}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"30%"}
              spacing={1}
            >
              <p className={styles["text-rank"]}>{winner.ticketNumber}</p>
              <SvgIcon
                component={TicketsIcon}
                inheritViewBox
                style={{
                  width: "20px",
                  height: "16px",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-center"}
              width={"30%"}
              spacing={0.2}
            >
              <p className={styles["text-rank"]}>{formatEther(BigInt(winner.ethAmount))}</p>
              <SvgIcon
                component={EthIcon}
                inheritViewBox
                style={{
                  width: "20px",
                  height: "16px",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-center"}
              width={"30%"}
              spacing={1}
            >
              <p className={styles["text-rank"]}>{formatUnits(BigInt(winner.opAmount), 18)}</p>
              <SvgIcon
                component={SrIcon}
                inheritViewBox
                style={{
                  width: "20px",
                  height: "16px",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
