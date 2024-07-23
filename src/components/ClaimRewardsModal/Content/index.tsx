import { SvgIcon, Typography } from "@mui/material";
import HexagonSuccessIcon from "@/public/images/hexagon-success.svg";
import styles from "./styles.module.css";
import React, { ReactNode } from "react";
import { QueryStatus } from "react-query";

type Props = {
  title: string;
  text: string;
  status: QueryStatus;
  content: ReactNode;
};

export default function ClaimRewardsModalContent({
  title,
  text,
  status,
  content,
}: Props) {
  return (
    <div className={styles["container--content"]}>
      <Typography className={styles["title"]}>
        {status == "loading" ? title : "Success!"}
      </Typography>
      {status == "loading" && (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-loading.gif"
          alt="loading hexagon"
        />
      )}
      {status == "success" && (
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
