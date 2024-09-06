import { SvgIcon, Typography } from "@mui/material";
import HexagonSuccessIcon from "@/public/images/hexagon-success.svg";
import styles from "./styles.module.css";
import type { ReactNode } from "react";
import React, { useContext, useMemo } from "react";
import { ActionModalContext } from "@/views/DashBoard";
import type { QueryStatus } from "react-query";
import { ActionModalStatus } from "@/types/commons";

type Props = {
  title: string;
  status: QueryStatus;
  content: ReactNode;
};

export default function ActionModalContent({ title, status, content }: Props) {
  const titleText = useMemo(() => {
    if (status === ActionModalStatus.LOADING) return title;
    if (status === ActionModalStatus.ERROR) return "Something went wrong";
    if (status === ActionModalStatus.SUCCESS) return "Success!";
    return "";
  }, [status, title, ActionModalStatus]);

  const icon = useMemo(() => {
    if (status === ActionModalStatus.LOADING) {
      return (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-loading.gif"
          alt="loading hexagon"
        />
      );
    }
    if (status === ActionModalStatus.ERROR) {
      return (
        <img
          className={styles["icon-hexagon"]}
          src="/images/hexagon-error.gif"
          alt="error hexagon"
        />
      );
    }
    if (status === ActionModalStatus.SUCCESS) {
      return (
        <SvgIcon
          component={HexagonSuccessIcon}
          inheritViewBox
          className={styles["icon-hexagon"]}
        />
      );
    }
    return null;
  }, [status, ActionModalStatus]);

  return (
    <div className={styles["container--content"]}>
      <Typography className={styles["title"]}>{titleText}</Typography>
      {icon}
      {(status === ActionModalStatus.LOADING ||
        status === ActionModalStatus.SUCCESS) &&
        content}
      {status === ActionModalStatus.LOADING && (
        <Typography className={styles["text"]}>
          Proceed in your wallet.
        </Typography>
      )}
      {status === ActionModalStatus.ERROR && (
        <Typography className={styles["text"]}>
          An error was acquired.
        </Typography>
      )}
    </div>
  );
}
