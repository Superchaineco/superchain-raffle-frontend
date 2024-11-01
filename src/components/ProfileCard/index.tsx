import { Box, Card, Stack, SvgIcon } from "@mui/material";
import styles from "./styles.module.css";
import ProfileInfo from "./ProfileInfo";
import RankIcon from "@/public/images/rank-icon.svg";
import EthIcon from "@/public/images/eth-icon.svg";
import SrIcon from "@/public/images/optimism.svg";
import TicketsIcon from "@/public/images/tickets-icon-blue-filled.svg";
import CopyIcon from "@/public/images/copy-icon.svg";
import RedirectIcon from "@/public/images/redirect-icon-opaque.svg";
import Link from "next/link";
import ProfileCardSkeleton from "./Skeleton";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useGetUserPrizes } from "@/hooks/useGetUserPrizes";
import { Address, formatEther, formatUnits } from "viem";
import useGetSuperchainAccount from "@/hooks/useGetSuperchainAccount";
import NounsAvatar from "../common/NounsAvatar";
import ExplorerButton from "../common/ExplorerButton";
import CopyAddressButton from "../common/CopyAddressButton";

function ProfileCard() {
  const { safe } = useSafeAppsSDK();
  const { data: superchainAccount, isLoading: isLoadingSuperchainAccount } =
    useGetSuperchainAccount(safe.safeAddress as Address);
  // const { data, status } = useQuery("profileData", getProfileData, {
  //   enabled: isConnected,
  // });
  const { data, loading } = useGetUserPrizes(safe.safeAddress as Address);
  if (loading || isLoadingSuperchainAccount || !superchainAccount) {
    return <ProfileCardSkeleton />;
  }

  return (
    <Card className={styles["container--all"]}>
      <div className={styles["contianer--header"]}>
        <h2>Profile</h2>
        <div className={styles["container--header--rigth"]}>
          {/* {data && (
            <Button className={styles["button--rank"]}>
              Rank: {data.rank}
            </Button>
          )} */}
          <Link
            href={`https://account.superchain.eco/leaderboard?safe=${safe.safeAddress}`}
            target="_blank"
            className={styles["container--rank-icon"]}
          >
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
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Box padding={2}>
            <p className={styles["connect-wallet-text"]}>
              Connect your wallet to view your Profile.
            </p>
          </Box>
        </Stack>
      )}
      {data && (
        <div className={styles["container--profile"]}>
          <Box width={"46px"} height={"46px"} borderRadius={"25%"}>
            <NounsAvatar
              seed={{
                accessory: Number(superchainAccount?.noun?.accessory || 0),
                background: Number(superchainAccount?.noun?.background || 0),
                body: Number(superchainAccount?.noun?.body || 0),
                glasses: Number(superchainAccount?.noun?.glasses || 0),
                head: Number(superchainAccount?.noun?.head || 0),
              }}
            />
          </Box>
          <strong>{superchainAccount?.superChainID}</strong>

          <CopyAddressButton address={safe.safeAddress} />
          <ExplorerButton
            href={`https://optimistic.etherscan.io/address/${safe.safeAddress}`}
            title={"View on optimistic.etherscan.io"}
          />
        </div>
      )}
      {data && (
        <div className={styles["container--profile--info-cards"]}>
          <ProfileInfo
            secondary="ETH earned"
            primary={formatEther(BigInt(data.user.ethPrizes)) || "0"}
            icon={EthIcon}
          />
          <ProfileInfo
            secondary="OP earned"
            primary={formatUnits(BigInt(data.user.opPrizes), 18) || "0"}
            icon={SrIcon}
          />
          <ProfileInfo
            secondary="Entries"
            isFixed={false}
            primary={data.user.rounds.reduce(
              (acc, curr) => acc + curr.numberOfTickets,
              0
            )}
            icon={TicketsIcon}
          />
        </div>
      )}
    </Card>
  );
}

export default ProfileCard;
