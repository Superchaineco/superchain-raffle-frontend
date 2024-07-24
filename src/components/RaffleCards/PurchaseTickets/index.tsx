import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpIcon from "@/public/images/arrow-up-icon.svg";
import ArrowDownIcon from "@/public/images/arrow-down-icon.svg";
import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { ActionModalContext } from "@/views/DashBoard";
import ActionModalContentTicketsInfo from "@/components/ActionModal/Content/Tickets";

type Props = {
  wallet: any;
  maxCuantity: number;
};

function PurchaseTickets({ wallet, maxCuantity }: Props) {
  const [cuantity, setCuantity] = useState(0);
  const actionModalContext = useContext(ActionModalContext);

  const onBuyTickets = () => {
    actionModalContext.setActionModalContextState({
      open: true,
      title: "Confirm to Claim Your Rewards",
      loadComponent: (<></>),
      contentComponent: (
        <ActionModalContentTicketsInfo
          data={{
            eth: 0.1,
            srPoints: 10,
            tickets: [1, 2, 3, 4, 15, 16, 17, 18, 249, 250],
          }}
        />
      ),
    });
  };

  const increaseCuantity = () => {
    if (cuantity != maxCuantity) {
      setCuantity(cuantity + 1);
    }
  };
  const decreaseCuantity = () => {
    if (cuantity != 0) {
      setCuantity(cuantity - 1);
    }
  };

  return (
    <div
      className={`${styles["container--all"]} ${styles[`${wallet ? "container--all--blue" : "container--all--dark"}`]}`}
    >
      <h3 style={{ margin: "0px" }}>Purchase tickets</h3>
      <p className={styles["text"]}>
        You can purchase up to <strong> {maxCuantity} </strong> more tickets
        this round.
      </p>
      {!wallet && (
        <>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {wallet && (
        <Stack direction={"row"} alignItems="center" justifyContent={"center"}>
          <TextField
            className={styles["input--cuantity"]}
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
                      onClick={() => setCuantity(maxCuantity)}
                      style={{
                        cursor: cuantity == maxCuantity ? "default" : "pointer",
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
                          cursor: cuantity != maxCuantity ? "pointer" : "auto",
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
          <div onClick={onBuyTickets} className={styles["button--buy"]}>
            Buy
          </div>
        </Stack>
      )}
    </div>
  );
}

export default PurchaseTickets;
