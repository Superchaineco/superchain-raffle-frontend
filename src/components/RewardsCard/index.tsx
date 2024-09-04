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
import useGetRaffles from "@/hooks/useGetRaffles";

function RewardsCard() {
  const { isConnected: _isConnected } = useAccount();
  const { data, loading } = useGetRaffles()

  if (loading) {
    return <RewardsCardSkeleton />;
  }

  return (
    <Card className={styles["container--all"]}>
      <h2 className={styles["title"]}>My Rewards</h2>
      {data && (
        <section className={styles["container--rewards"]}>
          {data.raffles.map((rewardCardData) => (
            <Reward
              key={rewardCardData.id}
              icon={Optimisim}
              color={'red'}
              raffleAddress={rewardCardData.id}
            />
          ))}
        </section>
      )}
      {!data && (
        <section className={styles["container--rewards"]}>
          <Reward icon={Optimisim} color="red" />
        </section>
      )}
    </Card>
  );
}

export default RewardsCard;
