import { Avatar, Button, Card, Stack, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfo from "./ProfileInfo";
import RankIcon from "@/public/images/rank-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/sr-icon.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import Link from "next/link";
import ProfileCardSkeleton from "./Skeleton";
import { useQuery } from "react-query";
import { getProfileData } from "@/functions/fetchFunctions";
import { useState } from "react";

function ProfileCard() {
  const [getWallet, setGetWallet] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { data, status: _status } = useQuery("profileData", getProfileData, {
    enabled: getWallet,
  });

  function handleConnectWallet() {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setGetWallet(true);
    return () => clearTimeout(timer);
  }

  if (loading) {
    return <ProfileCardSkeleton />;
  }
  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <h2>Profile</h2>
        <div className={styles["container--header--rigth"]}>
          {data && (
            <Button className={styles["button--rank"]}>
              Rank: {data.rank}
            </Button>
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
      {!data && (
        <Stack alignItems={"center"} justifyContent={"center"}>
          <p className={styles["connect-wallet-text"]}>
            Connect your wallet to view your Profile.
          </p>
        </Stack>
      )}
      {data && (
        <div className={styles["container--profile"]}>
          <Avatar sx={{ bgcolor: "black" }}>N</Avatar>
          <p>{data.userHash}</p>
        </div>
      )}
      {data && (
        <div className={styles["container--profile--info-cards"]}>
          <ProfileInfo
            secondary="ETH earned"
            primary={data.eth}
            icon={EthIcon}
          />
          <ProfileInfo
            secondary="SRP earned"
            primary={data.srp}
            icon={SrIcon}
          />
          <ProfileInfo
            secondary="Entries"
            primary={data.entries}
            icon={TicketsIcon}
          />
        </div>
      )}
    </Card>
  );
}

export default ProfileCard;
