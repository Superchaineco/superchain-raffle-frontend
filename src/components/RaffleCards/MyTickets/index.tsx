import React from "react";
import styles from "./styles.module.css";

type Props = {
  tickets: number;
};

function MyTickets({ tickets }: Props) {
  return (
    <div
      className={`${styles["container--all"]} ${tickets > 0 ? styles["container--all--blue"] : styles["container--all--dark"]}`}
    >
      <h2 style={{ margin: "0px" }}>My Tickets</h2>
      <p className={styles["text"]}>You have not bought any tickets yet 0.</p>
    </div>
  );
}

export default MyTickets;
