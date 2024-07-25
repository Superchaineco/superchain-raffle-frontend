import { Stack, SvgIcon } from "@mui/material";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import React from "react";
import styles from "./styles.module.css";
import raffleHistoryRecords from "@/raffleHistoryRecods.json";

export default function RaffleHistoryTable() {
  const records = raffleHistoryRecords;
  return (
    <Stack className={styles["container--all"]} spacing={2} paddingY={1}>
      {records.map((record, index) => (
        <Stack
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
              className={`${styles["container--rank"]} ${styles[`rank--${record.position <= 3 ? record.position : "off-podium"}`]}`}
            >
              <p>{record.position}</p>
            </div>
            <p>{record.address.substring(0, 10)}</p>
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
              <p>{record.tickets}</p>
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
              spacing={.2}
            >
              <p>{record.eth}</p>
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
              <p>{record.sr}</p>
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
