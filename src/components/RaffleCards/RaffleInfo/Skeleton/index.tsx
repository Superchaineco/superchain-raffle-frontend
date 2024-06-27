"use client";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.css";

function RaffleInfoSkeleton() {
  return (
    <div className={`${styles["container--all"]}`}>
      <div className={styles["container--primary"]}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" width={80} height={20} />
      </div>
      <div className={styles["container--secondary"]}>
        <div className={styles["container--secondary--group"]}>
          <Skeleton variant="text" width={120} height={20} />
        </div>
        <div className={styles["container--secondary--group"]}></div>
      </div>
    </div>
  );
}

export default RaffleInfoSkeleton;
