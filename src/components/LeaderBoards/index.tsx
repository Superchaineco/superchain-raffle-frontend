import { getLeaderBoardData } from "@/functions/fetchFunctions";
import { LeaderBoardAccountType } from "@/types/commons";
import { Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import LeaderBoardProfileCard from "./ProfileCard";
import styles from "./styles.module.css";

function LeaderBoards({ myInfo }: { myInfo: LeaderBoardAccountType }) {
  const { data, status } = useQuery("leaderBoardData", getLeaderBoardData);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;
  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
      <Stack width={'100%'} alignItems={"start"} justifyContent={"center"}>
        <p className={styles["title"]}>Top users of all-time</p>
      </Stack>
      {data.map((account: LeaderBoardAccountType) => (
        <LeaderBoardProfileCard
          account={account}
          isMyProfileCard={myInfo.address == account.address}
        />
      ))}
    </Stack>
  );
}

export default LeaderBoards;
