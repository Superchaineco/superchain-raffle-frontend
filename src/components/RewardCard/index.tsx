import { Card } from "@mui/material";
import styles from "./styles.module.css";
import OptimisimIcon from "@/public/images/optimisim-icon.svg";
import BaseIcon from "@/public/images/base-icon.svg";
import ModeIcon from "@/public/images/mode-icon.svg";
import Reward from "./Reward";

type RewardCards = {
  optimisimEth: number;
  optimisimSrp: number;
  baseEth: number;
  baseSrp: number;
  modeEth: number;
  modeSrp: number;
};

function RewardCards({
  optimisimEth,
  optimisimSrp,
  baseEth,
  baseSrp,
  modeEth,
  modeSrp,
}: RewardCards) {
  return (
    <Card className={styles["container--all"]}>
      <h2>My Rewards</h2>
      <section className={styles["container--rewards"]}>
        <Reward
          icon={OptimisimIcon}
          eth={optimisimEth}
          srp={optimisimSrp}
          color="red"
          opaque={false}
        />
        <Reward
          icon={BaseIcon}
          eth={baseEth}
          srp={baseSrp}
          color="blue"
          opaque={false}
        />
        <Reward
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

export default RewardCards;
