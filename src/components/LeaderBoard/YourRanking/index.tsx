import React from "react";
import LeaderBoardProfileCard from "../ProfileCard";
import type { LeaderBoardAccountType } from "@/types/commons";
import type { QueryStatus } from "react-query";
import LeaderBoardProfileCardSkeleton from "../CardSkeleton";

function YourRanking({
  account,
  status,
}: {
  account: LeaderBoardAccountType;
  status: QueryStatus;
}) {
  if (status === "loading") return <LeaderBoardProfileCardSkeleton />;
  return <LeaderBoardProfileCard account={account} isMyProfileCard={true} />;
}

export default YourRanking;
