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
import { SUPER_CHAIN_RAFFLE } from "@/constants";
import { ActionModalStatus } from "@/types/commons";

export default function PurchaseTicketsInput({ max }: { max: number }) {
  const { sdk, safe } = useSafeAppsSDK();
  const [quantity, setQuantity] = useState<number | null>(null);
  const { actionModalContextState, setActionModalContextState } =
    useContext(ActionModalContext);

  const onBuyTickets = async () => {
    setActionModalContextState({
      open: true,
      title: "Confirm to Claim Your Rewards",
      loadComponent: <></>,
      contentComponent: <></>,
      status: ActionModalStatus.LOADING,
    });
    try {
      const iface = new Interface([
        {
          type: "function",
          name: "enterRaffle",
          inputs: [
            {
              name: "_numberOfTickets",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ]);
      const calldata = iface.encodeFunctionData("enterRaffle", [
        BigInt(quantity || 0)
      ]);

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
        if (status.txStatus == "SUCCESS") {
          transactionConfirmed = true;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }

      if (transactionConfirmed) {
        setActionModalContextState({
          ...actionModalContextState,
          status: ActionModalStatus.SUCCESS,
          contentComponent: <ActionModalContentTicketsInfo />,
        });
      }
    } catch (e) {
      setActionModalContextState({
        ...actionModalContextState,
        open: true,
        status: ActionModalStatus.ERROR,
        contentComponent: <></>,
      });
    }
  };

  const increaseQuantity = () => {
    if (quantity && quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || event.target.value === null)
      setQuantity(null);
    const value = Number(event.target.value);
    if (isNaN(value)) return;
    if (value > max) {
      setQuantity(max);
    } else if (value < 0) {
      setQuantity(null);
    } else {
      setQuantity(value);
    }
  };

  return (
    <Stack
      style={{
        opacity: quantity && quantity <= max ? 1 : 0.5,
      }}
      direction={"row"}
      alignItems="stretch"
      justifyContent={"center"}
    >
      <TextField
        className={styles["input--buy"]}
        value={quantity}
        size="small"
        inputProps={{ inputMode: "numeric", min: 0, max: max }}
        placeholder="0"
        style={{ borderRadius: "0px 6px 6px 0px" }}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    opacity: max ? 1 : 0.5,
                  }}
                  onClick={() => setQuantity(max)}
                  disabled={!max}
                >
                  <Typography className={styles["decorator--max"]}>
                    Max
                  </Typography>
                </button>
                <Stack direction={"column"} spacing={1}>
                  <SvgIcon
                    onClick={increaseQuantity}
                    component={ArrowUpIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                    }}
                  />
                  <SvgIcon
                    onClick={decreaseQuantity}
                    component={ArrowDownIcon}
                    inheritViewBox
                    style={{
                      width: "8px",
                      height: "8px",
                    }}
                  />
                </Stack>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
      <button
        style={{
          cursor: "pointer",
          opacity: quantity && quantity <= max ? 1 : 0.5,
        }}
        onClick={onBuyTickets}
        className={styles["button--buy"]}
        disabled={!quantity}
      >
        Claim
      </button>
    </Stack>
  );
}
