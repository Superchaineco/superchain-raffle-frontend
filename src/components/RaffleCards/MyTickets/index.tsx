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
      {tickets == 0 && (
        <p className={styles["text"]}>You have not bought any tickets yet 0.</p>
      )}

      {tickets > 0 &&
        Array.from({ length: tickets }, (_, i) => i + 1).map((index) => (
          <p key={index} className={styles["text"]}>
            Ticket number: <strong>{index}</strong>
          </p>
        ))}
    </div>
  );
}

export default MyTickets;
