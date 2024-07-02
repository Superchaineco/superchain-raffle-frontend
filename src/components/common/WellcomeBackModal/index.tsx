import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import WellcomeBackImg from "@/public/images/welcome-back-img.svg";
import React, { useState } from "react";
import WellcomeBackInfoCard from "./InfoCard";
import ETHIcon from "@/public/images/eth-icon.svg";
import SRIcon from "@/public/images/sr-icon.svg";
import MyTicketsIcon from "@/public/images/tickets-icon-opaque.svg";
import CloseIcon from "@/public/images/close-icon.svg";
import styles from "./styles.module.css";
import WellcomeBackModalTicketsToolTip from "./TicketsToolTip";
import { useQuery } from "react-query";
import { getWelcomeBackData } from "@/functions/fetchFunctions";
import { WelcomeBackData } from "@/types/welcomeBack";

function WellcomeBackModal() {
  const { data, status } = useQuery<WelcomeBackData>("welcomeBackData", getWelcomeBackData);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  if (data) return (
    <Modal
      open={open}
      className={styles["modal"]}
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
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          className={styles["container--content"]}
          padding={4}
        >
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Welcome back!
          </Typography>
          <SvgIcon
            component={WellcomeBackImg}
            inheritViewBox
            style={{ width: "120px", height: "120px" }}
          />
          <Stack direction={"row"} spacing={0.5}>
            <Typography className={styles["text--while"]}>
              While you were away,
            </Typography>
            <Typography className={styles["text--while--strong"]}>
              you've won:
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={4}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            paddingX={6}
            paddingY={2}
          >
            <WellcomeBackInfoCard text="ETH" value={data.eth} icon={ETHIcon} />
            <WellcomeBackInfoCard text="SR Points" value={data.srPoints} icon={SRIcon} />
          </Stack>
          <Tooltip
            title={<WellcomeBackModalTicketsToolTip opTickets={data.opTickets} baseTickets={data.baseTickets}/>}
            arrow
            placement="top"
            PopperProps={{
              sx: {
                width: "16%",
              },
            }}
          >
            <IconButton>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Typography className={styles["text--my-tickets"]}>
                  My Winning Tickets
                </Typography>
                <SvgIcon
                  component={MyTicketsIcon}
                  inheritViewBox
                  style={{ width: "20px", height: "20px" }}
                />
              </Stack>
            </IconButton>
          </Tooltip>
        </Stack>
        <Button className={styles["button--claim-rewards"]} variant="text" onClick={handleClose}>
          Claim Rewards
        </Button>
      </Box>
    </Modal>
  );
}

export default WellcomeBackModal;
