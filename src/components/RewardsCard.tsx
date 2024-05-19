"use client";

import { Card } from "@mui/material";
import styles from "../styles/components/rewards-card.module.css";
import { RewardCard } from "./RewardCard";

type RewardsCardProps = {
  optimisimEth: number;
  optimisimSrp: number;
  baseEth: number;
  baseSrp: number;
  modeEth: number;
  modeSrp: number;
};

function RewardsCard({
  optimisimEth,
  optimisimSrp,
  baseEth,
  baseSrp,
  modeEth,
  modeSrp,
}: RewardsCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <h2>My Rewards</h2>
      <section className={styles["container--rewards"]}>
        <RewardCard
          icon="OP"
          eth={optimisimEth}
          srp={optimisimSrp}
          color="red"
          opaque={false}
        />
        <RewardCard
          icon="O"
          eth={baseEth}
          srp={baseSrp}
          color="blue"
          opaque={false}
        />
        <RewardCard
          icon="M"
          eth={modeEth}
          srp={modeSrp}
          color="dark"
          opaque={true}
        />
      </section>
    </Card>
  );
}

export { RewardsCard };
