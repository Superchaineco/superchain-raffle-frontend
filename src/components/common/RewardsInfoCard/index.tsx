import { Card, SvgIcon, Typography } from "@mui/material";
import type { ElementType } from "react";
import styles from "./styles.module.css";

type ProfileInfoProps = {
  text: string;
  value: string | number;
  icon: ElementType;
};

function RewardsInfoCard({ text, value, icon }: ProfileInfoProps) {
  return (
    <Card className={styles["container--all"]}>
      <Typography className={styles["text--text"]}>{text}</Typography>
      <div className={styles["container--primary"]}>
        <Typography className={styles["text--value"]}>{value}</Typography>
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

export default RewardsInfoCard;
