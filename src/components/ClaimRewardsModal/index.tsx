import { Box, Modal, SvgIcon, Typography } from "@mui/material";
import CloseIcon from "@/public/images/close-icon.svg";
import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import ClaimRewardsModalContent from "./Content";
import ClaimRewardsModalContentInfo from "./Content/Rewards";
import { ClaimRewardsModalContext } from "@/views/DashBoard";

export default function ClaimRewardsModal({open}: {open: boolean}) {
  const claimRewardsContext = useContext(ClaimRewardsModalContext);
  const handleClose = () => {
    claimRewardsContext.setClaimRewards(false);
  }
  return (
    <Modal
      open={open}
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
        <ClaimRewardsModalContent
          state="success"
          text="Proceed in your wallet."
          title="Confirm to Claim Your Rewards"
          content={
            <>
              {false && (
                <Typography className={styles["text"]}>
                  {"Proceed in your wallet."}
                </Typography>
              )}
              {true && (
                <ClaimRewardsModalContentInfo
                  data={{
                    eth: 0.1,
                    srPoints: 100,
                  }}
                />
              )}
            </>
          }
        />
      </Box>
    </Modal>
  );
}
