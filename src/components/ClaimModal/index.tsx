import { Box, Modal, SvgIcon, Typography } from "@mui/material";
import CloseIcon from "@/public/images/close-icon.svg";
import HexagonSuccessIcon from "@/public/images/hexagon-success.svg";
import React from "react";
import styles from "./styles.module.css";

type Props = {
  title: string;
  text: string;
  state: "loading" | "success";
};

export default function ClaimRewardsModal({ title, text, state }: Props) {
  const handleClose = () => {
    console.log("close");
  };
  return (
    <Modal
      open={true}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <Box className={styles["container--modal"]}>
        <SvgIcon
          component={CloseIcon}
          onClick={handleClose}
          inheritViewBox
          style={{
            width: "12px",
            height: "12px",
            position: "absolute",
            top: "12px",
            right: "12px",
            cursor: "pointer",
          }}
        />
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
        <Typography className={styles["text"]}>{text}</Typography>
      </Box>
    </Modal>
  );
}
