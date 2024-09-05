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
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Interface } from "ethers";
import {
  SUPER_CHAIN_RAFFLE,
} from "@/constants";
import { ActionModalStatus } from "@/types/commons";

export default function PurchaseTicketsInput() {
  const { sdk, safe } = useSafeAppsSDK();
  const [quantity, setQuantity] = useState(0);
  const { actionModalContextState, setActionModalContextState } = useContext(ActionModalContext);

  const ticketsContext = useContext(TicketsContext);

  const onBuyTickets = async () => {
    setActionModalContextState({
      open: true,
      title: "Confirm to Claim Your Rewards",
      loadComponent: <></>,
      contentComponent: (
        <></>
      ),
      status: ActionModalStatus.LOADING,
    });
    try {

      const iface = new Interface([
        {
          "type": "function",
          "name": "enterRaffle",
          "inputs": [
            {
              "name": "_numberOfTickets",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "user",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
      ])
      const calldata = iface.encodeFunctionData("enterRaffle", [BigInt(quantity), safe.safeAddress])

      const txs = [
        {
          to: SUPER_CHAIN_RAFFLE,
          value: "0",
          data: calldata,
        },
      ];
      const transaction = await sdk.txs.send({ txs });
      let transactionConfirmed = false;
      while (!transactionConfirmed) {
        const status = await sdk.txs.getBySafeTxHash(transaction.safeTxHash);
        if (status.txStatus == 'SUCCESS') {
          transactionConfirmed = true;
        } else {
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }

      if (transactionConfirmed) {
        setActionModalContextState({
          ...actionModalContextState,
          status: ActionModalStatus.SUCCESS,
          contentComponent: (
            <ActionModalContentTicketsInfo />
          ),
        })
      }

      if (quantity > 0 && quantity <= ticketsContext.state.max) {
        ticketsContext.setState({
          max: ticketsContext.state.max - quantity,
          tickets: [],
        });

      }

    }
    catch (e) {
      setActionModalContextState({
        ...actionModalContextState,
        status: ActionModalStatus.ERROR,
        contentComponent: (
          <></>
        ),
      })
    }
  };

  const increaseQuantity = () => {
    if (quantity != ticketsContext.state.max) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity != 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Stack
      style={{
        opacity: quantity > 0 && quantity <= ticketsContext.state.max ? 1 : 0.5,
      }}
      direction={"row"}
      alignItems="stretch"
      justifyContent={"center"}
    >
      <TextField
        className={styles["input--buy"]}
        value={quantity}
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
                  onClick={() => setQuantity(ticketsContext.state.max)}
                  style={{
                    cursor:
                      quantity == ticketsContext.state.max
                        ? "default"
                        : "pointer",
                  }}
                >
                  Max
                </Typography>
                <Stack direction={"column"} spacing={1}>
                  <SvgIcon
                    onClick={increaseQuantity}
                    component={ArrowUpIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                      cursor:
                        quantity != ticketsContext.state.max
                          ? "pointer"
                          : "auto",
                    }}
                  />
                  <SvgIcon
                    onClick={decreaseQuantity}
                    component={ArrowDownIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                      cursor: quantity != 0 ? "pointer" : "auto",
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
            quantity > 0 && quantity <= ticketsContext.state.max
              ? "pointer"
              : "default",
          opacity:
            quantity > 0 && quantity <= ticketsContext.state.max ? 1 : 0.5,
        }}
        onClick={onBuyTickets}
        className={styles["button--buy"]}
      >
        Buy
      </div>
    </Stack>
  );
}
