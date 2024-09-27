"use client";

import { Button, Stack, SvgIcon } from "@mui/material";
import SrIcon from "@/public/images/optimism.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import styles from "./styles.module.css";
import { useContext, useMemo, type ElementType } from "react";
import { ActionModalContext } from "@/views/DashBoard";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import useGetClaimablePrizes from "@/hooks/useGetClaimablePrizes";
import { Address, formatEther, formatUnits } from "viem";
import { Interface } from "ethers";
import { SUPER_CHAIN_RAFFLE_ABI } from "@/constants";
import { ActionModalStatus } from "@/types/commons";

type RewardProps = {
  icon: ElementType;
  color: string;
  raffleAddress?: string;
};

function Reward({ icon, color, raffleAddress }: RewardProps) {
  const { safe, sdk } = useSafeAppsSDK();
  const { actionModalContextState, setActionModalContextState } =
    useContext(ActionModalContext);
  const { data: claimablePrizes } = useGetClaimablePrizes(
    raffleAddress as Address,
    safe.safeAddress as Address
  );
  const opaque = useMemo(
    () =>
      !(
        claimablePrizes &&
        (BigInt(claimablePrizes[0]) > BigInt(0) ||
          BigInt(claimablePrizes[1]) > BigInt(0))
      ),
    [claimablePrizes]
  );

  const onClaimRewards = async () => {
    setActionModalContextState({
      open: true,
      title: "Reeling in Your Rewards",
      loadComponent: <></>,
      status: ActionModalStatus.LOADING,
      contentComponent: <></>,
    });
    try {
      const iface = new Interface(SUPER_CHAIN_RAFFLE_ABI);
      const calldata = iface.encodeFunctionData("claim");
      const txs = [
        {
          to: raffleAddress!,
          value: "0",
          data: calldata,
        },
      ];
      try {
        const transaction = await sdk.txs.send({ txs });
        let transactionConfirmed = false;
        let maxRetries = 10;
        while (!transactionConfirmed && maxRetries > 0) {
          const status = await sdk.txs.getBySafeTxHash(transaction.safeTxHash);
          if (status.txStatus == "SUCCESS") {
            transactionConfirmed = true;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            maxRetries--;
          }
        }
        if (transactionConfirmed) {
          setActionModalContextState({
            open: true,
            title: "Rewards Claimed!",
            loadComponent: <></>,
            status: ActionModalStatus.SUCCESS,
            contentComponent: <></>,
          });
        }
      } catch (e) {
        setActionModalContextState({
          open: true,
          title: "Something went wrong",
          loadComponent: <></>,
          status: ActionModalStatus.ERROR,
          contentComponent: <></>,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className={`${styles["container--all"]} ${
        styles[`container--all--color--${color}`]
      } ${opaque ? styles["container--all--opaque"] : ""}`}
    >
      <div
        className={`${styles["container--icon"]} ${
          styles[`container--icon--color--${color}`]
        }`}
      >
        <SvgIcon
          component={icon}
          inheritViewBox
          style={{
            width: "36px",
            height: "36px",
          }}
        />
      </div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        className={styles["container--content"]}
      >
        <div className={styles["container--content--text"]}>
          <div className={styles["container--content--eth"]}>
            <p
              className={styles["reward--text"]}
            >{`${claimablePrizes ? formatEther(claimablePrizes[0]) : 0} ETH`}</p>
            <SvgIcon
              component={EthIcon}
              inheritViewBox
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
          <p className={styles["reward--text"]}>+</p>
          <div className={styles["container--content--srp"]}>
            <p
              className={styles["reward--text"]}
            >{`${claimablePrizes ? formatUnits(claimablePrizes[1], 18) : 0} OP`}</p>
            <SvgIcon
              component={SrIcon}
              inheritViewBox
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
        </div>
        <Button   disabled={opaque} onClick={onClaimRewards} className={styles["claim--button"]}>
          Claim
        </Button>
      </Stack>
    </div>
  );
}

export default Reward;
