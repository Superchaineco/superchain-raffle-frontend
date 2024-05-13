"use client";

import styles from "../styles/components/raffle-card-info.module.css";

type RaffleCardInfoProps = {
  icon: string;
  primary: string;
  secondary: string;
};

function RaffleCardInfo({ icon, primary, secondary }: RaffleCardInfoProps) {
  return (
    <div className={styles["container--info"]}>
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
