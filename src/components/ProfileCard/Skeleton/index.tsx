import { Card, Skeleton } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfoSkeleton from "../ProfileInfo/Skeleton";

function ProfileCardSkeleton() {
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <Skeleton variant="text" width={100} height={50} />
        <div className={styles["container--header--rigth"]}>
          <Skeleton variant="text" width={90} height={56} />
          <Skeleton variant="rounded" width={36} height={36} />
        </div>
      </div>
      <div className={styles["container--profile"]}>
        <Skeleton variant="circular" width={44} height={44} />
        <Skeleton variant="text" width={100} height={30} />
      </div>
      <div className={styles["container--profile--info-cards"]}>
        <ProfileInfoSkeleton />
        <ProfileInfoSkeleton />
        <ProfileInfoSkeleton />
      </div>
    </Card>
  );
}

export default ProfileCardSkeleton;
