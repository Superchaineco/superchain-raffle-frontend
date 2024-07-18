"use client";
import { Card, CardContent, Skeleton } from "@mui/material";
import RaffleInfoSkeleton from "../../RaffleInfo/Skeleton";
import styles from "./styles.module.css";

function RaffleCardSkeleton() {
  return (
    <Card className={styles["container--principal"]}>
      <div className={styles["container--header"]}>
        <div style={{ marginTop: 0, width: "60%" }}>
          <Skeleton variant="text" width="60%" height={40} />
        </div>
        <div className={styles["container--header--chips"]}>
          <Skeleton variant="text" width={120} height={50} />
          <Skeleton variant="text" width={120} height={50} />
        </div>
      </div>
      <div className={styles["container--info"]}>
        <RaffleInfoSkeleton />
        <RaffleInfoSkeleton />
        <RaffleInfoSkeleton />
        <RaffleInfoSkeleton />
      </div>
    </Card>
  );
}
export default RaffleCardSkeleton;
