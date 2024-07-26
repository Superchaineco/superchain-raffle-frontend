import {
  Autocomplete,
  Box,
  Modal,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import CloseIcon from "@/public/images/close-icon.svg";
import PrizePotIcon from "@/public/images/trophy-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TotalEntriesIcon from "@/public/images/tickets-icon-gray-dotted.svg";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import { RaffleHistoryModalContext } from "@/views/DashBoard";
import RaffleInfo from "../RaffleCards/RaffleInfo";
import RaffleHistoryTable from "./HistoryTable";

export default function RaffleHistoryModal() {
  const raffleHistoryModalContext = useContext(RaffleHistoryModalContext);

  const handleClose = () => {
    raffleHistoryModalContext.setRaffleHistoryModalState({
      open: false,
    });
  };

  const rounds = [
    { label: "Round 11" },
    { label: "Round 10" },
    { label: "Round 9" },
    { label: "Round 8" },
    { label: "Round 7" },
    { label: "Round 6" },
    { label: "Round 5" },
    { label: "Round 4" },
    { label: "Round 3" },
    { label: "Round 2" },
    { label: "Round 1" },
  ];


  return (
    <Modal
      open={raffleHistoryModalContext.raffleHistoryModalState.open}
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
            top: "20px",
            right: "20px",
            cursor: "pointer",
          }}
        />
        <Stack spacing={2}>
          <h4 className={styles["title"]}>48 Hour OP Raffle Results</h4>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rounds}
            aria-placeholder="Round 0"
            className={styles["dropdown"]}
            size="small"
            sx={{ width: 120}}
            renderInput={(params) => <TextField {...params} />}
          />
          <Stack direction={"row"} spacing={2}>
            <RaffleInfo
              icon={PrizePotIcon}
              primary="Prize pot"
              secondary1={0.005}
              secondary2={100}
              iconS1={EthIcon}
              iconS2={SrIcon}
              noMainCard={false}
            />
            <RaffleInfo
              icon={TotalEntriesIcon}
              primary="Total entries"
              secondary1={34 + "/" + 250}
              noMainCard={false}
            />
          </Stack>
          <RaffleHistoryTable />
        </Stack>
      </Box>
    </Modal>
  );
}
