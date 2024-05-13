'use client'

import React from "react";
import styles from "../../styles/views/dashBoard.module.css"
import { RaffleCard, TopInfo } from "@/components";

function DashBoard() {
  return ( 
    <>
      <TopInfo eth="0.01" ethBonus="0.004" />
      <div className={styles["container--cards"]}>
        <RaffleCard />
      </div>
    </>
  )
}
export { DashBoard };
