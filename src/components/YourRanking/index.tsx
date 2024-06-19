import React, { useState } from "react";
import styles from "./styles.module.css";
import UserLeaderBoardCard from "../UserLeaderBoardCard";
import { useQuery } from "react-query";

async function getMyLeaderBoardInfo() {
  const res = await fetch("/api/getMyLeaderBoardInfo");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

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
