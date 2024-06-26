import { Avatar, Button, Card, Stack, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfo from "./ProfileInfo";
import RankIcon from "@/public/images/rank-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import Link from "next/link";
import { useState } from "react";

type ProfileCardProps = {
  rank: number;
  userHash: string;
  eth: number;
  srp: number;
  entries: number;
};

function ProfileCard({ rank, userHash, eth, srp, entries }: ProfileCardProps) {
  const [walletState, setWalletState] = useState<
    "disconnected" | "connected" | "loading"
  >("connected");
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <h2>Profile</h2>
        <div className={styles["container--header--rigth"]}>
          {walletState == "connected" && (
            <Button className={styles["button--rank"]}>Rank: {rank}</Button>
          )}
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
      {walletState == "disconnected" && (
        <Stack alignItems={'center'} justifyContent={'center'}>
          <p className={styles["connect-wallet-text"]}>Connect your wallet to view your Profile.</p>
          <Button
            className={styles["button--connect-wallet"]}
            onClick={() => setWalletState("loading")}
          >
            Connect Wallet
          </Button>
        </Stack>
      )}
      {walletState == "connected" && (
        <div className={styles["container--profile"]}>
          <Avatar sx={{ bgcolor: "black" }}>N</Avatar>
          <p>{userHash}</p>
        </div>
      )}
      {walletState == "connected" && (
        <div className={styles["container--profile--info-cards"]}>
          <ProfileInfo secondary="ETH earned" primary={eth} icon={EthIcon} />
          <ProfileInfo secondary="SRP earned" primary={srp} icon={SrIcon} />
          <ProfileInfo
            secondary="Entries"
            primary={entries}
            icon={TicketsIcon}
          />
        </div>
      )}
    </Card>
  );
}

export default ProfileCard;