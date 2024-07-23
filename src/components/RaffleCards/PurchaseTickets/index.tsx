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
import { useState } from "react";

type Props = {
  wallet: any;
  maxCuantity: number;
};

function PurchaseTickets({ wallet, maxCuantity }: Props) {
  const [cuantity, setCuantity] = useState(0);
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
        <Box display="flex" alignItems="center">
          <TextField
            value={cuantity}
            variant="outlined"
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            placeholder="0"
            style={{ marginRight: 8 }}
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
                        cursor: cuantity == maxCuantity ? "auto" : "pointer",
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
          <Button variant="contained" color="primary">
            Buy
          </Button>
        </Box>
      )}
    </div>
  );
}

export default PurchaseTickets;
