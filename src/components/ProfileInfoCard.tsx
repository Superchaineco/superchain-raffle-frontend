import { Card } from "@mui/material";
import styles from "../styles/components/profile-info-card.module.css";

type ProfileInfoCardProps = {
  primary: number;
  secondary: string;
};

function ProfileInfoCard({primary, secondary}: ProfileInfoCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h4 className={styles["secondary--text"]}>{secondary}</h4>
      <h4 className={styles["primary--text"]}>{primary}</h4>
    </Card>
  );
}

export { ProfileInfoCard };
