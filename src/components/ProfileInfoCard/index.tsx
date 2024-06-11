import { Card, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";

type ProfileInfoCardProps = {
  primary: number;
  secondary: string;
  icon: any;
};

function ProfileInfoCard({ primary, secondary, icon }: ProfileInfoCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h4 className={styles["secondary--text"]}>{secondary}</h4>
      <div className={styles["container--primary"]}>
        <span className={styles["primary--text"]}>{primary}</span>
        <SvgIcon
          component={icon}
          inheritViewBox
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      </div>
    </Card>
  );
}

export default ProfileInfoCard;
