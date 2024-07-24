import { SvgIcon, Typography } from "@mui/material";
import HexagonSuccessIcon from "@/public/images/hexagon-success.svg";
import styles from "./styles.module.css";
import React, { ReactNode } from "react";
import { QueryStatus } from "react-query";

type Props = {
  title: string;
  status: QueryStatus;
  content: ReactNode;
};

export default function ActionModalContent({ title, status, content }: Props) {
  return (
    <div className={styles["container--content"]}>
      <Typography className={styles["title"]}>
        {status == "loading"
          ? title
          : status == "error"
            ? "Something went wrong"
            : status == "success"
              ? "Success!"
              : ""}
      </Typography>
      {status == "loading" && (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-loading.gif"
          alt="loading hexagon"
        />
      )}
      {status == "error" && (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-error.gif"
          alt="error hexagon"
        />
      )}
      {status == "success" && (
        <SvgIcon
          component={HexagonSuccessIcon}
          inheritViewBox
          className={styles["icon-hexagon"]}
        />
      )}
      {status == "loading" || status == "success" ? content : null}
      {status == "loading" && (
        <Typography className={styles["text"]}>
          Proceed in your wallet.
        </Typography>
      )}
      {status == "error" && (
        <Typography className={styles["text"]}>
          An error was acquired.
        </Typography>
      )}
    </div>
  );
}
