"use client";

import { Box, SvgIcon, Typography } from "@mui/material";
import styles from "./styles.module.css";
import type { ElementType, ReactNode } from "react";

type RaffleInfoProps = {
  icon: ElementType;
  primary: ReactNode;
  secondary1: string | number | ReactNode;
  secondary2?: string | number;
  secondaryColor?: string;
  iconS1?: ElementType;
  iconS2?: ElementType;
  bgColor?: string;
  borderColor?: string;
  noMainCard: boolean;
};

function RaffleInfo({
  icon,
  primary,
  secondary1,
  secondary2,
  //eslint-disable-next-line
  secondaryColor,
  iconS1,
  iconS2,
  bgColor,
  borderColor,
  //eslint-disable-next-line
  noMainCard,
}: RaffleInfoProps) {
  return (
    <Box
      className={`${styles["container--all"]}`}
      bgcolor={bgColor || "transparent"}
      border={borderColor ? 1 : 0}
      borderColor={borderColor || "transparent"}
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
        <Typography
          variant="h5"
          fontSize={16}
          fontWeight={400}
          color="GrayText"
        >
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
    </Box>
  );
}

export default RaffleInfo;
