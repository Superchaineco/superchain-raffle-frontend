import { getLeaderBoardData } from "@/functions/fetchFunctions";
import { LeaderBoardAccountType } from "@/types/commons";
import { Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import LeaderBoardProfileCard from "./ProfileCard";
import styles from "./styles.module.css";
import LeaderBoardProfileCardSkeleton from "./CardSkeleton";

function LeaderBoards({ myInfo }: { myInfo: LeaderBoardAccountType }) {
  const { data, status } = useQuery("leaderBoardData", getLeaderBoardData);
  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
      {status === "loading" ? (
        <>
          <LeaderBoardProfileCardSkeleton />
          <LeaderBoardProfileCardSkeleton />
          <LeaderBoardProfileCardSkeleton />
        </>
      ) : myInfo ? (
        <>
          <Stack width={"100%"} alignItems={"start"} justifyContent={"center"}>
            <p className={styles["title"]}>Top users of all-time</p>
          </Stack>
          {data.map((account: LeaderBoardAccountType) => (
            <LeaderBoardProfileCard
              account={account}
              isMyProfileCard={myInfo.address == account.address}
            />
          ))}
        </>
      ) : (
        <div></div>
      )}
    </Stack>
  );
}

export default LeaderBoards;
