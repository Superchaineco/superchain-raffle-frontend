import React, { useMemo } from "react";
import { Typography, Grid, Stack, SvgIcon } from "@mui/material";
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
    <Grid
      container
      rowGap={2}
      className={
        styles[
          `container--all--${isMyProfileCard ? "my-profile" : "another-profile"}`
        ]
      }
    >
      <Grid item xs={12} md={8}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <div
            className={`${styles["container--rank"]} ${styles[`rank--${podiumPositon != "offThePodium" ? podiumPositon : "off-podium"}`]}`}
          >
            <p>{account.position}</p>
          </div>
          <SvgIcon
            component={ProfileImage}
            inheritViewBox
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "100%",
            }}
          />
          <Typography noWrap>{account.address}</Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
          width={"100%"}
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
      </Grid>
    </Grid>
  );
}

export default LeaderBoardProfileCard;
