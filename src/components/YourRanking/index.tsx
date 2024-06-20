import React from "react";
import styles from "./styles.module.css";
import UserLeaderBoardCard from "../UserLeaderBoardCard";
import { getMyLeaderBoardInfo } from "@/functions/fetchFunctions";
import { useQuery } from "react-query";

function YourRanking() {
  const { data, status } = useQuery("account", getMyLeaderBoardInfo);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;
  return (
    <div className={styles["container--all"]}>
      <p>Your Ranking</p>
      <UserLeaderBoardCard account={data} />
    </div>
  );
}

export default YourRanking;
