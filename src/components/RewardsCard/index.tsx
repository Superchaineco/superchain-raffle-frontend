import { Button, Card, Stack } from "@mui/material";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Base from "@/public/images/base-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Reward from "./Reward";
import styles from "./styles.module.css";
import { getMyRewardsData } from "@/functions/fetchFunctions";
import { useQuery } from "react-query";
import { MyRewardsData } from "@/types/rewardsCard";
import RewardsCardSkeleton from "./Skeleton";
import { useState } from "react";

enum AssetsParser {
  "OptimisimIcon" = Optimisim,
  "BaseIcon" = Base,
  "ModeIcon" = Mode,
}

function RewardsCard() {
  const [getWallet, setGetWallet] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { data, status } = useQuery<MyRewardsData[]>(
    "myRewardsData",
    getMyRewardsData,
    {
      enabled: getWallet,
    }
  );

  function handleConnectWallet() {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setGetWallet(true);
    return () => clearTimeout(timer);
  }

  if (loading) {
    return <RewardsCardSkeleton />;
  }

  return (
    <Card className={styles["container--all"]}>
      <Stack direction={"row"} spacing={2}>
        <h2 className={styles["title"]}>My Rewards</h2>
        {!data && (
          <Button
            className={styles["button--connect-wallet"]}
            onClick={() => handleConnectWallet()}
          >
            Connect Wallet
          </Button>
        )}
      </Stack>
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
          <Reward icon={Optimisim} eth={0} srp={0} color="dark" opaque={true} />
          <Reward icon={Base} eth={0} srp={0} color="dark" opaque={true} />
          <Reward icon={Mode} eth={0} srp={0} color="dark" opaque={true} />
        </section>
      )}
    </Card>
  );
}

export default RewardsCard;
