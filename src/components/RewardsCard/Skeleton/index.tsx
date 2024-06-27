import { Card, Skeleton } from "@mui/material";
import styles from "./styles.module.css";
import RewardSkeleton from "../Reward/Skeleton";

function RewardsCardSkeleton() {
  return (
    <Card className={styles["container--all"]}>
      <Skeleton variant="text" width={140} height={50} />
      <RewardSkeleton />
      <RewardSkeleton />
      <RewardSkeleton />
    </Card>
  );
}

export default RewardsCardSkeleton;
