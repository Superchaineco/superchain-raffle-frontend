"use client";

import { SvgIcon, Typography } from "@mui/material";
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
        <Typography variant="h5" fontSize={16} fontWeight={400} color='GrayText'>
          {primary}:
        </Typography>
      </div>
      <div className={styles["container--secondary"]}>
        <div className={styles["container--secondary--group"]}>
          <Typography fontSize={18} fontWeight={600}>
            {secondary1}
          </Typography>
          {iconS1 && <SvgIcon component={iconS1} inheritViewBox />}
        </div>
        {(secondary2 || secondary2 === 0) && (
          <>
            <strong> + </strong>
            <div className={styles["container--secondary--group"]}>
              <Typography fontSize={18} fontWeight={600}>
                {secondary2}
              </Typography>
              {iconS2 && <SvgIcon component={iconS2} inheritViewBox />}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default RaffleInfo;
