import { Card } from "@mui/material";
import Optimisim from "@/public/images/optimisim-icon.svg"
import Base from "@/public/images/base-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Reward from "./Reward";
import styles from "./styles.module.css";
import { getMyRewardsData } from "@/functions/fetchFunctions";
import { useQuery } from "react-query";
import { MyRewardsData } from "@/types/rewardsCard";

enum AssetsParser {
  "OptimisimIcon" = Optimisim,
  "BaseIcon" = Base,
  "ModeIcon" = Mode,
}

function RewardsCard() {
  const { data, status } = useQuery<MyRewardsData[]>(
    "myRewardsData",
    getMyRewardsData
  );

  return (
    <Card className={styles["container--all"]}>
      <h2 className={styles["title"]}>My Rewards</h2>
      {data && (
        <section className={styles["container--rewards"]}>
          {data.map((rewardCardData) => (
            <Reward
              icon={
                AssetsParser[rewardCardData.icon as keyof typeof AssetsParser]
              }
              eth={rewardCardData.eth}
              srp={rewardCardData.srp}
              color={rewardCardData.color}
              opaque={rewardCardData.opaque}
            />
          ))}
        </section>
      )}
      {!data && (
        <section className={styles["container--rewards"]}>
          <Reward
            icon={Optimisim}
            eth={0}
            srp={0}
            color="dark"
            opaque={true}
          />
          <Reward
            icon={Base}
            eth={0}
            srp={0}
            color="dark"
            opaque={true}
          />
          <Reward
            icon={Mode}
            eth={0}
            srp={0}
            color="dark"
            opaque={true}
          />
        </section>
      )}
    </Card>
  );
}

export default RewardsCard;
