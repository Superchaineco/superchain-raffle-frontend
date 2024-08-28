import React, { useContext, useState } from "react";
import {
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpIcon from "@/public/images/arrow-up-icon.svg";
import ArrowDownIcon from "@/public/images/arrow-down-icon.svg";
import styles from "./styles.module.css";
import ActionModalContentTicketsInfo from "@/components/ActionModal/Content/Tickets";
import { ActionModalContext } from "@/views/DashBoard";
import { TicketsContext } from "../../Raffle";

export default function PurchaseTicketsInput() {
  const [cuantity, setCuantity] = useState(0);
  const actionModalContext = useContext(ActionModalContext);

  const ticketsContext = useContext(TicketsContext);

  const onBuyTickets = () => {
    const purchasedTickets = [
      ...Array.from(
        { length: cuantity },
        () => Math.floor(Math.random() * (100 - 1 + 1)) + 1
      ),
    ];
    if (cuantity > 0 && cuantity <= ticketsContext.state.max) {
      ticketsContext.setState({
        max: ticketsContext.state.max - cuantity,
        tickets: [...ticketsContext.state.tickets, ...purchasedTickets],
      });
      actionModalContext.setActionModalContextState({
        open: true,
        title: "Confirm to Claim Your Rewards",
        loadComponent: <></>,
        contentComponent: (
          <ActionModalContentTicketsInfo
            data={{
              eth: 0.1,
              srPoints: 10,
              tickets: purchasedTickets,
            }}
          />
        ),
      });
    }
  };

  const increaseCuantity = () => {
    if (cuantity != ticketsContext.state.max) {
      setCuantity(cuantity + 1);
    }
  };
  const decreaseCuantity = () => {
    if (cuantity != 0) {
      setCuantity(cuantity - 1);
    }
  };
  return (
    <Stack
      style={{
        opacity: cuantity > 0 && cuantity <= ticketsContext.state.max ? 1 : 0.5,
      }}
      direction={"row"}
      alignItems="stretch"
      justifyContent={"center"}
    >
      <TextField
        className={styles["input--buy"]}
        value={cuantity}
        size="small"
        inputProps={{ inputMode: "numeric" }}
        placeholder="0"
        style={{ borderRadius: "0px 6px 6px 0px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography
                  className={styles["decorator--max"]}
                  onClick={() => setCuantity(ticketsContext.state.max)}
                  style={{
                    cursor:
                      cuantity == ticketsContext.state.max
                        ? "default"
                        : "pointer",
                  }}
                >
                  Max
                </Typography>
                <Stack direction={"column"} spacing={1}>
                  <SvgIcon
                    onClick={increaseCuantity}
                    component={ArrowUpIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                      cursor:
                        cuantity != ticketsContext.state.max
                          ? "pointer"
                          : "auto",
                    }}
                  />
                  <SvgIcon
                    onClick={decreaseCuantity}
                    component={ArrowDownIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                      cursor: cuantity != 0 ? "pointer" : "auto",
                    }}
                  />
                </Stack>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          cursor:
            cuantity > 0 && cuantity <= ticketsContext.state.max
              ? "pointer"
              : "default",
          opacity:
            cuantity > 0 && cuantity <= ticketsContext.state.max ? 1 : 0.5,
        }}
        onClick={onBuyTickets}
        className={styles["button--buy"]}
      >
        Buy
      </div>
    </Stack>
  );
}
