import React, { useMemo } from "react";
import { Stack, SvgIcon } from "@mui/material";
import type { LeaderBoardAccountType } from "@/types/commons";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import styles from "./styles.module.css";
import ProfileImage from "@/public/images/profile-icon.svg";
import { getPodiumPosition } from "@/functions/auxiliarFunctions";

type Props = {
  account: LeaderBoardAccountType;
  isMyProfileCard?: boolean;
};

function LeaderBoardProfileCard({ account, isMyProfileCard }: Props) {
  const podiumPositon = useMemo(
    () => getPodiumPosition(account.position),
    [account.position]
  );
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      className={
        styles[
          `container--all--${isMyProfileCard ? "my-profile" : "another-profile"}`
        ]
      }
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-center"}
        spacing={2}
      >
        <div
          className={`${styles["container--rank"]} ${styles[`rank--${podiumPositon != "offThePodium" ? podiumPositon : "off-podium"}`]}`}
        >
          <p>{account.position}</p>
        </div>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
          width={"40%"}
          spacing={1}
        >
          <SvgIcon
            component={ProfileImage}
            inheritViewBox
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "100%",
            }}
          />
          <p>{account.address}</p>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
        width={"30%"}
        spacing={3}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"30%"}
          spacing={1}
        >
          <p>{account.tickets}</p>
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
          spacing={1}
        >
          <p>{account.eth}</p>
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
          <p>{account.sr}</p>
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
  );
}

export default LeaderBoardProfileCard;
