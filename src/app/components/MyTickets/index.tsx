import React from "react";
import styles from "./styles.module.css";

export default function index({ tickets }: { tickets: number }) {
  return (
    <div className={styles["container--all"]}>
      <h2>My Tickets</h2>
      <div className={styles["container--ticket"]}>
        <span></span>
        <h5>{tickets}</h5>
      </div>
    </div>
  );
}
