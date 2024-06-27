import React from "react";
import styles from "./styles.module.css";

function MyTickets({ tickets }: { tickets: number }) {
  return (
    <div
      className={`${styles["container--all"]} ${styles["container--all--dark"]}`}
    >
      <h2 style={{ margin: "0px" }}>My Tickets</h2>
      <p>You have not bought any tickets yet {tickets}.</p>
    </div>
  );
}

export default MyTickets;
