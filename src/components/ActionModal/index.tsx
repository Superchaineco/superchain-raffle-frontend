import { Box, Fade, Modal, SvgIcon } from "@mui/material";
import CloseIcon from "@/public/images/close-icon.svg";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import ActionModalContent from "./Content";
import { ActionModalContext } from "@/views/DashBoard";

export default function ActionModal() {
  const claimRewardsContext = useContext(ActionModalContext);

  const handleClose = () => {
    claimRewardsContext.setActionModalContextState({
      ...claimRewardsContext.actionModalContextState,
      open: false,
      title: "",
    });
  };

  return (
    <Modal
      open={claimRewardsContext.actionModalContextState.open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      }}
    >
      <Fade in={claimRewardsContext.actionModalContextState.open} timeout={500}>
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
          <ActionModalContent
            status={claimRewardsContext.actionModalContextState.status}
            title={claimRewardsContext.actionModalContextState.title}
            content={
              <>
                {/* {status == "loading" &&
                  claimRewardsContext.actionModalContextState.loadComponent}
                {status == "success" &&
                  claimRewardsContext.actionModalContextState.contentComponent} */}
              </>
            }
          />
        </Box>
      </Fade>
    </Modal>
  );
}
