"use client";

import React from "react";
import styles from "./styles.module.css";
import BackIcon from "@/public/images/back-icon.svg";
import { Stack, SvgIcon } from "@mui/material";
import Link from "next/link";
import YourRanking from "@/components/YourRanking";

function LeaderBoard() {
  return (
    <div className={styles["container--all"]}>
      <div className={styles["container--back"]}>
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
        <p>Back to dashboard </p>
      </div>
      <div className={styles["container--title"]}>
        <h1 className={styles["title"]}>Leaderboard</h1>
        <p>Join the raffles and watch your name climb the leaderboard</p>
      </div>
      <YourRanking />
    </div>
  );
}

export default LeaderBoard;
