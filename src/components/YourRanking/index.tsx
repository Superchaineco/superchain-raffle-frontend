import React from "react";
import styles from "./styles.module.css";
import UserLeaderBoardCard from "../UserLeaderBoardCard";

function YourRanking() {
  return (
    <div className={styles["container--all"]}>
      <p>Your Ranking</p>
      <UserLeaderBoardCard
        account={{ address: "mini", eth: 0, position: 2, sr: 3, tickets: 20 }}
      />
    </div>
  );
}

export default YourRanking;
