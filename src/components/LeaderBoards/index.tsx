import { getLeaderBoardData } from "@/functions/fetchFunctions";
import { LeaderBoardAccountType } from "@/types/commons";
import { Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import LeaderBoardProfileCard from "./ProfileCard";

function LeaderBoards() {
  const { data, status } = useQuery("leaderBoardData", getLeaderBoardData);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;
  return (
    <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
      {data.map((account: LeaderBoardAccountType) => (
        <LeaderBoardProfileCard account={account}/>
      ))}
    </Stack>
  );
}

export default LeaderBoards;
