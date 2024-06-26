import { Card, Skeleton} from "@mui/material";
import styles from "./styles.module.css";

function ProfileInfoSkeleton() {
  return (
    <Card className={styles["container--all"]}>
      <Skeleton variant="text" width={100} height={30} />
      <div className={styles["container--primary"]}>
        <Skeleton variant="text" width={40} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
      </div>
    </Card>
  );
}

export default ProfileInfoSkeleton;
