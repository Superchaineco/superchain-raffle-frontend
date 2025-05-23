import { Card, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import type { ElementType } from "react";

type ProfileInfoProps = {
  primary: string | number;
  secondary: string;
  icon: ElementType;
  isFixed?: boolean;
};

function ProfileInfo({
  primary,
  secondary,
  icon,
  isFixed = true,
}: ProfileInfoProps) {
  return (
    <Card className={styles["container--all"]}>
      <h4 className={styles["secondary--text"]}>{secondary}</h4>
      <div className={styles["container--primary"]}>
        <span className={styles["primary--text"]}>
          {isFixed ? Number(primary).toFixed(2) : Number(primary)}
        </span>
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

export default ProfileInfo;
