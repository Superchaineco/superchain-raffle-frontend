"use client";

import { SvgIcon } from "@mui/material";
import styles from "../styles/components/raffle-card-info.module.css";

type RaffleCardInfoProps = {
  icon: any;
  primary: string;
  secondary: string;
  color?: "blue" | "opaque";
};

function RaffleCardInfo({
  icon,
  primary,
  secondary,
  color,
}: RaffleCardInfoProps) {
  return (
    <div
      className={`${styles["container--all"]} ${
        color ? styles[`container--all--color--${color}`] : ""
      }`}
    >
      <div className={styles["container--primary"]}>
        <SvgIcon
          component={icon}
          inheritViewBox
          style={{
            width: "16px",
            height: "12px",
            boxShadow: "0px 4px 4px 0px #00000024",
          }}
        />
        <h5>{primary}</h5>
      </div>
      <div className={styles["container--secondary"]}>
        <p>{secondary}</p>
      </div>
    </div>
  );
}

export { RaffleCardInfo };
