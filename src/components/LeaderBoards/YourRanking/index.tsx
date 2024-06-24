import React from "react";
import LeaderBoardProfileCard from "../ProfileCard";
import { LeaderBoardAccountType } from "@/types/commons";
import { QueryStatus } from "react-query";
import LeaderBoardProfileCardSkeleton from "../CardSkeleton";
import styles from "./styles.module.css";

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
