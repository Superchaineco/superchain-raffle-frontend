"use client";

import { SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import type { ElementType } from "react";

type RaffleInfoProps = {
  icon: ElementType;
  primary: string;
  secondary1: string | number;
  secondary2?: string | number;
  secondaryColor?: string;
  iconS1?: ElementType;
  iconS2?: ElementType;
  color?: string;
  noMainCard: boolean;
};

enum ColorParser {
  "#00C2FF" = "blue",
  "#000000" = "opaque",
}

function RaffleInfo({
  icon,
  primary,
  secondary1,
  secondary2,
  secondaryColor,
  iconS1,
  iconS2,
  color,
  noMainCard,
}: RaffleInfoProps) {
  return (
    <motion.div
      className={`${styles["container--all"]} ${
        color
          ? styles[
              `container--all--color--${ColorParser[color as keyof typeof ColorParser]}`
            ]
          : !noMainCard
            ? styles["container--all--main-card"]
            : ""
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
          <p style={{ color: secondaryColor }}>{secondary1}</p>
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

export default RaffleInfo;
