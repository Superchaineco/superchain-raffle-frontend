import React from "react";
import styles from "./styles.module.css";
import LeaderBoardProfileCard from "../LeaderBoards/ProfileCard";
import { LeaderBoardAccountType } from "@/types/commons";
import { QueryStatus } from "react-query";
import LeaderBoardProfileCardSkeleton from "../LeaderBoards/CardSkeleton";

function YourRanking({account, status}: {account: LeaderBoardAccountType, status: QueryStatus}) {
  if (status === "loading") return <LeaderBoardProfileCardSkeleton />;
  return (
    <div className={styles["container--all"]}>
      <p className={styles["title"]}>Your Ranking</p>
      <LeaderBoardProfileCard account={account} isMyProfileCard={true} />
    </div>
  );
}

export default YourRanking;
