import React from "react";
import { Stack, SvgIcon } from "@mui/material";
import { LeaderBoardAccountType } from "@/types/commons";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import styles from "./styles.module.css";

type Props = {
  account: LeaderBoardAccountType;
};

function LeaderBoardProfileCard({ account }: Props) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <div className={styles["container--rank"]}>
        <p>{account.position}</p>
      </div>
      <div className={styles["container--user"]}>
        <span></span>
        <p>{account.address}</p>
      </div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-center"}
        spacing={3}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <p>{account.tickets}</p>
          <SvgIcon
            component={EthIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
        >
          <p>{account.eth}</p>
          <SvgIcon
            component={EthIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
        >
          <p>{account.sr}</p>
          <SvgIcon
            component={SrIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LeaderBoardProfileCard;
