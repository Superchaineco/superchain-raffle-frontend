import { Card } from "@mui/material";
import styles from "./styles.module.css";
import OptimisimIcon from "@/public/images/optimisim-icon.svg";
import RewardCard from "../RewardCard";
import BaseIcon from "@/public/images/base-icon.svg";
import ModeIcon from "@/public/images/mode-icon.svg";

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
          icon={OptimisimIcon}
          eth={optimisimEth}
          srp={optimisimSrp}
          color="red"
          opaque={false}
        />
        <RewardCard
          icon={BaseIcon}
          eth={baseEth}
          srp={baseSrp}
          color="blue"
          opaque={false}
        />
        <RewardCard
          icon={ModeIcon}
          eth={modeEth}
          srp={modeSrp}
          color="dark"
          opaque={true}
        />
      </section>
    </Card>
  );
}

export default RewardsCard;
