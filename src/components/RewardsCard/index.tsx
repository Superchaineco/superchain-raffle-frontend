import { Card } from "@mui/material";
import Optimisim from "@/public/images/optimisim-icon.svg";
import Reward from "./Reward";
import RewardsCardSkeleton from "./Skeleton";
import styles from "./styles.module.css";
import useGetRaffles from "@/hooks/useGetRaffles";

function RewardsCard() {
  const { data, loading } = useGetRaffles();

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
              color={"red"}
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
