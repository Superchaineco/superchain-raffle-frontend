import { Avatar, Button, Card, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfo from "./ProfileInfo";
import RankIcon from "@/public/images/rank-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import Link from "next/link";

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
          <Link href="/leaderBoard" className={styles["container--rank-icon"]}>
            <SvgIcon
              component={RankIcon}
              inheritViewBox
              style={{
                width: "16px",
                height: "16px",
                boxShadow: "0px 4px 4px 0px #00000024",
              }}
            />
          </Link>
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
          icon={EthIcon}
        />
        <ProfileInfo
          secondary="SRP earned"
          primary={srp}
          icon={SrIcon}
        />
        <ProfileInfo
          secondary="Entries"
          primary={entries}
          icon={TicketsIcon}
        />
      </div>
    </Card>
  );
}

export default ProfileCard;