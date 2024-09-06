import { Stack, SvgIcon, Typography } from "@mui/material";
import RedirectIcon from "@/public/images/redirect-icon.svg";
import React from "react";
import styles from "./styles.module.css";

export default function ActionModalContentTicketsInfo() {
  return (
    <>
      <Stack
        style={{ cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Typography className={styles["text"]}>{"View on explorer"}</Typography>
        <SvgIcon
          component={RedirectIcon}
          inheritViewBox
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </Stack>
    </>
  );
}
