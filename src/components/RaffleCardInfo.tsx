"use client";

import { SvgIcon } from "@mui/material";
import styles from "../styles/components/raffle-card-info.module.css";

type RaffleCardInfoProps = {
  icon: any;
  primary: string;
  secondary1: string;
  secondary2?: string;
  iconS1?: any;
  iconS2?: any;
  color?: "blue" | "opaque";
};

function RaffleCardInfo({
  icon,
  primary,
  secondary1,
  secondary2,
  iconS1,
  iconS2,
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
        <div className={styles["container--secondary--group"]}>
          <p>{secondary1}</p>
          {iconS1 && (
            <SvgIcon
              component={iconS1}
              inheritViewBox
              style={{
                width: "16px",
                height: "12px",
                boxShadow: "0px 4px 4px 0px #00000024",
              }}
            />
          )}
        </div>
        <div className={styles["container--secondary--group"]}>
          {secondary2 && <p>+</p>}
          {secondary2 && <p>{secondary2}</p>}
          {iconS2 && (
            <SvgIcon
              component={iconS2}
              inheritViewBox
              style={{
                width: "16px",
                height: "12px",
                boxShadow: "0px 4px 4px 0px #00000024",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { RaffleCardInfo };
