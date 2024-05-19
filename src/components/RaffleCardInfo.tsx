"use client";

import styles from "../styles/components/raffle-card-info.module.css";

type RaffleCardInfoProps = {
  icon: string;
  primary: string;
  secondary: string;
  color?: "blue" | "opaque";
};

function RaffleCardInfo({ icon, primary, secondary, color}: RaffleCardInfoProps) {
  return (
    <div className={`${styles["container--all"]} ${color ? styles[`container--all--color--${color}`] : ""}`}>
      <div className={styles["container--primary"]}>
        <span>{icon}</span>
        <h5>{primary}</h5>
      </div>
      <div className={styles["container--secondary"]}>
        <p>{secondary}</p>
      </div>
    </div>
  );
}

export { RaffleCardInfo };
