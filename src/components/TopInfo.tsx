'use client';

import React from "react";
import styles from '../styles/components/top-info.module.css'
import { Chip, Paper } from "@mui/material";

type TopInfoProps = {
  eth: string;
  ethBonus: string;
}

function TopInfo ({eth, ethBonus }: TopInfoProps){
  return (
    <Paper elevation={24} className={styles["container--top-info"]}>
      <p className={styles["main-text"]}>Op Collective contribution</p>
      <Chip label={`${eth} ETH`} className={styles["eth-chip"]} color="default"></Chip>
      <p className={styles["eth-bonus"]}>{`+${ethBonus} ETH/24h`}</p>
    </Paper>
  )
}

export { TopInfo };