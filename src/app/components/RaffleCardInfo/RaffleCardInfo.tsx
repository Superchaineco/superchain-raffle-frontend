"use client";

import { SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

type RaffleCardInfoProps = {
  icon: any;
  primary: string;
  secondary1: string;
  secondary2?: string;
  iconS1?: any;
  iconS2?: any;
  color?: string;
  noMainCard: boolean
};

function RaffleCardInfo({
  icon,
  primary,
  secondary1,
  secondary2,
  iconS1,
  iconS2,
  color,
  noMainCard
}: RaffleCardInfoProps) {
  return (
    <motion.div
      className={`${styles["container--all"]} ${
        color ? styles[`container--all--color--${color}`] :
        !noMainCard ? styles["container--all--main-card"] : ""
      }`}
    >
      <div className={styles["container--primary"]}>
        <SvgIcon
          component={icon}
          inheritViewBox
          style={{
            width: "16px",
            height: "12px",
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
              }}
            />
          )}
        </div>
        {secondary2 && <p>+</p>}
        <div className={styles["container--secondary--group"]}>
          {secondary2 && <p>{secondary2}</p>}
          {iconS2 && (
            <SvgIcon
              component={iconS2}
              inheritViewBox
              style={{
                width: "16px",
                height: "12px",
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RaffleCardInfo;
