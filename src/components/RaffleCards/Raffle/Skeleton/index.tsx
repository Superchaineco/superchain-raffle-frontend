"use client";
import { Card, CardContent, Skeleton } from "@mui/material";
import PurchaseTickets from "../../PurchaseTickets";
import MyTickets from "../../MyTickets";
import RaffleInfoSkeleton from "../../RaffleInfo/Skeleton";
import styles from "./styles.module.css";

function RaffleCardSkeleton() {
  return (
    <div
      style={{
        height: "238px",
        opacity: 1,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Card className={styles["container--all"]}>
        <div className={styles["container--principal"]}>
          <div className={styles["container--header"]}>
            <div style={{ marginTop: 0, width: "60%" }}>
              <Skeleton variant="text" width="60%" height={40} />
            </div>
            <div className={styles["container--header--chips"]}>
              <Skeleton variant="text" width={120} height={50} />
              <Skeleton variant="text" width={120} height={50} />
            </div>
          </div>
          <CardContent className={styles["container--body"]}>
            <div
              style={{
                width: "64%",
                display: "grid",
                gap: "12px",
                gridTemplateRows: "1fr 1fr",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <RaffleInfoSkeleton />
              <RaffleInfoSkeleton />
              <RaffleInfoSkeleton />
              <RaffleInfoSkeleton />
            </div>
          </CardContent>
          <div className={styles["container--detail"]}>
            <PurchaseTickets tickets={8} />
            <MyTickets tickets={0} />
          </div>
        </div>
      </Card>
    </div>
  );
}
export default RaffleCardSkeleton;
