import { Card } from "@mui/material";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Base from "@/public/images/base-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Reward from "./Reward";
import { getMyRewardsData } from "@/functions/fetchFunctions";
import { useQuery } from "react-query";
import type { MyRewardsData } from "@/types/rewardsCard";
import RewardsCardSkeleton from "./Skeleton";
import { type ElementType } from "react";
import styles from "./styles.module.css";
import { useAccount } from "wagmi";

function AssetsParser(asset: string): ElementType {
  switch (asset) {
    case "OptimisimIcon":
      return Optimisim as ElementType;
    case "BaseIcon":
      return Base as ElementType;
    case "ModeIcon":
      return Mode as ElementType;
    default:
      return Optimisim as ElementType;
  }
}

function RewardsCard() {
  const { isConnected: _isConnected } = useAccount();

  const { data, status } = useQuery<MyRewardsData[]>(
    "myRewardsData",
    getMyRewardsData
  );

  if (status == "loading") {
    return <RewardsCardSkeleton />;
  }

  return (
    <Card className={styles["container--all"]}>
      <h2 className={styles["title"]}>My Rewards</h2>
      {data && (
        <section className={styles["container--rewards"]}>
          {data.map((rewardCardData) => (
            <Reward
              key={rewardCardData.id}
              icon={AssetsParser(rewardCardData.icon)}
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
          <Reward icon={Optimisim} eth={0} srp={0} color="dark" opaque={true} />
          <Reward icon={Base} eth={0} srp={0} color="dark" opaque={true} />
          <Reward icon={Mode} eth={0} srp={0} color="dark" opaque={true} />
        </section>
      )}
    </Card>
  );
}

export default RewardsCard;
