import { Avatar, Button, Card } from "@mui/material";
import styles from "../styles/components/profile-card.module.css";
import { ProfileInfoCard } from "./ProfileInfoCard";

type ProfileCardProps = {
  rank: number;
  userHash: string;
  eth: number
  srp: number
  entries: number
};

function ProfileCard({ rank, userHash, eth, srp, entries }: ProfileCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <h2>Profile</h2>
        <div className={styles["container--header--rigth"]}>
          <Button className={styles["button--rank"]}>Rank: {rank}</Button>
          <Button className={styles["button--rank--icon"]}>#</Button>
        </div>
      </div>
      <div className={styles["container--profile"]}>
        <Avatar sx={{ bgcolor: "black" }}>N</Avatar>
        <p>{userHash}</p>
      </div>
      <div className={styles["container--profile--info-cards"]}>
        <ProfileInfoCard secondary="ETH earned" primary={eth} />
        <ProfileInfoCard secondary="SRP earned" primary={srp} />
        <ProfileInfoCard secondary="Entries" primary={entries} />
      </div>
    </Card>
  );
}

export { ProfileCard };
