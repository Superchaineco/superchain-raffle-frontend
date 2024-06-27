"use client";

import { Skeleton } from "@mui/material";
import styles from "./styles.module.css";

function RewardSkeleton() {
  return (
    <div
      className={`${styles["container--all"]} ${
        styles[`container--all--color--dark`]
      }`}
    >
      <Skeleton variant="rectangular" width={"80px"} height={"100%"} />
      <div className={styles["container--content"]}>
        <div className={styles["container--content--text"]}>
          <div className={styles["container--content--eth"]}>
            <Skeleton variant="text" width={50} height={20} />
            <Skeleton variant="circular" width={24} height={24} />
          </div>
          <Skeleton variant="circular" width={16} height={16} />
          <div className={styles["container--content--srp"]}>
            <Skeleton variant="text" width={50} height={20} />
            <Skeleton variant="circular" width={24} height={24} />
          </div>
        </div>
        <Skeleton variant="text" width={100} height={70} />
      </div>
    </div>
  );
}

export default RewardSkeleton;
