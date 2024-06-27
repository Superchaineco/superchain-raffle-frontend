import { Card, Skeleton} from "@mui/material";
import styles from "./styles.module.css";

function ProfileInfoSkeleton() {
  return (
    <Card className={styles["container--all"]}>
      <Skeleton variant="text" width={100} height={20} />
      <div className={styles["container--primary"]}>
        <Skeleton variant="text" width={40} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
      </div>
    </Card>
  );
}

export default ProfileInfoSkeleton;
