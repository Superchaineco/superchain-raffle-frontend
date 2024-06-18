import { Avatar, Button, Card, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfo from "./ProfileInfo";
import rankIcon from "@/public/images/profile-rank-icon.svg";
import profileInfoEthIcon from "@/public/images/profile-info-eth-icon.svg";
import profileInfoSrIcon from "@/public/images/profile-info-sr-icon.svg";
import profileInfoEntriesIcon from "@/public/images/profile-info-entries-icon.svg";

type ProfileCardProps = {
  rank: number;
  userHash: string;
  eth: number;
  srp: number;
  entries: number;
};

function ProfileCard({ rank, userHash, eth, srp, entries }: ProfileCardProps) {
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <h2>Profile</h2>
        <div className={styles["container--header--rigth"]}>
          <Button className={styles["button--rank"]}>Rank: {rank}</Button>
          <div className={styles["container--rank-icon"]}>
            <SvgIcon
              component={rankIcon}
              inheritViewBox
              style={{
                width: "16px",
                height: "16px",
                boxShadow: "0px 4px 4px 0px #00000024",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles["container--profile"]}>
        <Avatar sx={{ bgcolor: "black" }}>N</Avatar>
        <p>{userHash}</p>
      </div>
      <div className={styles["container--profile--info-cards"]}>
        <ProfileInfo
          secondary="ETH earned"
          primary={eth}
          icon={profileInfoEthIcon}
        />
        <ProfileInfo
          secondary="SRP earned"
          primary={srp}
          icon={profileInfoSrIcon}
        />
        <ProfileInfo
          secondary="Entries"
          primary={entries}
          icon={profileInfoEntriesIcon}
        />
      </div>
    </Card>
  );
}

export default ProfileCard;