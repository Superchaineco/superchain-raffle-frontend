import { SvgIcon, Typography } from "@mui/material";
import HexagonSuccessIcon from "@/public/images/hexagon-success.svg";
import styles from "./styles.module.css";
import React, { ReactNode } from "react";
import { QueryStatus } from "react-query";

type Props = {
  title: string;
  text: string;
  status: QueryStatus;
  content: ReactNode
};

export default function ClaimRewardsModalContent({
  title,
  text,
  status: state,
  content,
}: Props) {
  return (
    <div className={styles["container--content"]}>
      <Typography className={styles["title"]}>{title}</Typography>
      {state == "loading" && (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-loading.gif"
          alt="loading hexagon"
        />
      )}
      {state == "success" && (
        <SvgIcon
          component={HexagonSuccessIcon}
          inheritViewBox
          className={styles["icon-hexagon"]}
        />
      )}
      {content}
    </div>
  );
}
