import { Box, Modal, SvgIcon } from "@mui/material";
import CloseIcon from "@/public/images/close-icon.svg";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import ActionModalContent from "./Content";
import { ActionModalContext } from "@/views/DashBoard";
import { ClaimRewardsModalData } from "@/types/rewardsCard";
import { useQuery } from "react-query";
import { getClaimRewardsModalData } from "@/functions/fetchFunctions";

export default function ActionModal() {
  const claimRewardsContext = useContext(ActionModalContext);
  const { data, status } = useQuery<ClaimRewardsModalData>(
    "claimRewardsModalData",
    getClaimRewardsModalData,
    {
      enabled: claimRewardsContext.actionModalContextState.open,
    }
  );

  const handleClose = () => {
    claimRewardsContext.setActionModalContextState({
      open: false,
      title: "",
      loadComponent: <></>,
      contentComponent: <></>,
    });
  };

  return (
    <Modal
      open={claimRewardsContext.actionModalContextState.open}
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
        <ActionModalContent
          status={"error"}
          title={claimRewardsContext.actionModalContextState.title}
          content={
            <>
              {status == "loading" &&
                claimRewardsContext.actionModalContextState.loadComponent}
              {status == "success" &&
                data &&
                claimRewardsContext.actionModalContextState.contentComponent}
            </>
          }
        />
      </Box>
    </Modal>
  );
}
