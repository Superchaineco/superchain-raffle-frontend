"use client";

import React from "react";
import styles from "./styles.module.css";
import BackIcon from "@/public/images/back-icon.svg";
import { Stack, SvgIcon } from "@mui/material";
import Link from "next/link";
import YourRanking from "@/components/YourRanking";
import LeaderBoards from "@/components/LeaderBoards";

function LeaderBoard() {
  return (
    <Stack direction={'column'} alignContent={'start'} width={'100vw'} spacing={4} className={styles["container--all"]}>
      <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'start'}>
        <Link href="/">
          <SvgIcon
            component={BackIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </Link>
        <p className={styles["back--text"]}>Back to dashboard </p>
      </Stack>
      <Stack direction={'column'} spacing={2} alignItems={'start'} justifyContent={'center'}>
        <h1 className={styles["title"]}>Leaderboard</h1>
        <p>Join the raffles and watch your name climb the leaderboard</p>
      </Stack>
      <YourRanking />
      <LeaderBoards />
    </Stack>
  );
}

export default LeaderBoard;
