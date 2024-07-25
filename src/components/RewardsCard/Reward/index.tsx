"use client";

import { Button, SvgIcon, Typography } from "@mui/material";
import SrIcon from "@/public/images/sr-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import styles from "./styles.module.css";
import { useContext, type ElementType } from "react";
import { ActionModalContext } from "@/views/DashBoard";
import ActionModalContentRewardInfo from "@/components/ActionModal/Content/Rewards";

type RewardProps = {
  icon: ElementType;
  eth: number;
  srp: number;
  color: string;
  opaque: boolean;
};

function Reward({ icon, eth, srp, color, opaque }: RewardProps) {
  const actionModalContext = useContext(ActionModalContext);

  const onClaimRewards = () => {
    actionModalContext.setActionModalContextState({
      open: true,
      title: "Confirm to Claim Your Rewards",
      loadComponent: (<></>),
      contentComponent: (
        <ActionModalContentRewardInfo
          data={{
            eth: 0.1,
            srPoints: 100,
          }}
        />
      ),
    });
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
      <div className={styles["container--content"]}>
        <div className={styles["container--content--text"]}>
          <div className={styles["container--content--eth"]}>
            <p className={styles["reward--text"]}>{`${eth} ETH`}</p>
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
            <p className={styles["reward--text"]}>{`${srp} SRP`}</p>
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
        <Button onClick={onClaimRewards} className={styles["claim--button"]}>
          Claim
        </Button>
      </div>
    </div>
  );
}

export default Reward;
